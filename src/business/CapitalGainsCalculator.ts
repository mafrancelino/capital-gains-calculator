import { TaxStrategy } from '../tax/TaxStrategy'
import { TaxResult, TradeOperation } from '../types/Operation'
import { ExemptTaxStrategy } from '../tax/ExemptTaxStrategy'
import { OperationFactory } from '../operations/OperationFactory' 
import { applyAccumulatedLosses } from '../utils/tradeCalculations'

export class CapitalGainsCalculator {
  private totalShares = 0
  private weightedAverageCostPerShare = 0
  private accumulatedLosses = 0
  private readonly taxStrategy: TaxStrategy

  constructor(taxStrategy: TaxStrategy = new ExemptTaxStrategy()) {
    this.taxStrategy = taxStrategy
  }

  public handleOperations(trades: TradeOperation[]): TaxResult[] {
    const transformedTrades = trades.map(trade => OperationFactory.create(trade));
    return transformedTrades.map(trade => this.handleTrade(trade));
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
    const { newQuantity, newAverageCost } = trade.execute(this.totalShares, this.weightedAverageCostPerShare)
    
    this.totalShares = newQuantity
    this.weightedAverageCostPerShare = newAverageCost

    return { tax: 0 }
  }

  private handleSellTrade(trade: TradeOperation): TaxResult {
    this.verifySufficientShares(trade.quantity);
  
    const { newQuantity, profit } = trade.execute(this.totalShares, this.weightedAverageCostPerShare);
  
    const { netProfit, remainingLosses } = applyAccumulatedLosses(profit, this.accumulatedLosses);
    this.accumulatedLosses = remainingLosses;
  
    const totalSaleValue = trade.unitCost * trade.quantity;
    const tax = this.taxStrategy.calculateTax(netProfit, totalSaleValue);
  
    this.totalShares = newQuantity;
  
    return { tax };
  }
  
  private verifySufficientShares(quantity: number): void {
    if (this.totalShares < quantity) {
      throw new Error(`Insufficient shares. Attempt to sell ${quantity}, available: ${this.totalShares}`)
    }
  }
}
