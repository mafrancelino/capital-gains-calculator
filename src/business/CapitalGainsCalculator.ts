import { calculateNewWeightedAverageCost, calculateGrossProfit, applyAccumulatedLosses } from '../utils/tradeCalculations'
import { TaxStrategy } from '../tax/TaxStrategy'
import { TaxResult, TradeOperation } from '../types/Operation'
import { ExemptTaxStrategy } from '../tax/ExemptTaxStrategy'

export class CapitalGainsCalculator {
  private totalShares = 0
  private weightedAverageCostPerShare = 0
  private accumulatedLosses = 0
  private readonly taxStrategy: TaxStrategy

  constructor(taxStrategy: TaxStrategy = new ExemptTaxStrategy()) {
    this.taxStrategy = taxStrategy
  }

  public handleOperations(trades: TradeOperation[]): TaxResult[] {
    const transformedTrades = trades.map(trade => ({
      ...trade,
      unitCost: trade['unit-cost'] || trade.unitCost, 
      quantity: trade.quantity,
      operation: trade.operation,
    }))
  
    return transformedTrades.map(trade => this.handleTrade(trade))
  }
  
  private handleTrade(trade: TradeOperation): TaxResult {
    switch (trade.operation) {
      case 'buy':
        return this.handleBuyTrade(trade)
      case 'sell':
        return this.handleSellTrade(trade)
      default:
        throw new Error('Invalid trade operation')
    }
  }

  private handleBuyTrade(trade: TradeOperation): TaxResult {
    this.weightedAverageCostPerShare = calculateNewWeightedAverageCost(
      this.totalShares,
      this.weightedAverageCostPerShare,
      trade.quantity,
      trade.unitCost
    )
    this.totalShares += trade.quantity
    return { tax: 0 }
  }

  private handleSellTrade(trade: TradeOperation): TaxResult {
    this.verifySufficientShares(trade.quantity);
  
    const grossProfit = calculateGrossProfit(
      trade.unitCost,
      this.weightedAverageCostPerShare,
      trade.quantity
    )

    const { netProfit, remainingLosses } = applyAccumulatedLosses(grossProfit, this.accumulatedLosses);
    this.accumulatedLosses = remainingLosses;
  
    const tax = this.computeTaxIfApplicable(netProfit, trade);
  
    this.reduceSharesAfterSale(trade.quantity);
    return { tax };
  }
  
  private verifySufficientShares(quantity: number): void {
    if (this.totalShares < quantity) {
      throw new Error(`Insufficient shares. Attempt to sell ${quantity}, available: ${this.totalShares}`)
    }
  }

  private reduceSharesAfterSale(quantity: number): void {
    this.totalShares -= quantity
  }

  private computeTaxIfApplicable(netProfit: number, trade: TradeOperation): number {
    const totalSaleValue = trade['unit-cost'] * trade.quantity
    
    if (totalSaleValue <= 20000) {
        return 0
    }

    const tax = netProfit > 0 ? netProfit * 0.20 : 0
    return tax
  }
}
