import { ExemptTaxStrategy } from '../tax/ExemptTaxStrategy'
import { TaxStrategy } from '../tax/TaxStrategy'
import { TradeOperation } from '../types/Operation'

interface TaxResult {
  tax: number
}

export class CapitalGainsCalculator {
  private totalShares = 0
  private weightedAverageCostPerShare = 0
  private accumulatedLosses = 0
  private readonly taxStrategy: TaxStrategy

  constructor(taxStrategy: TaxStrategy = new ExemptTaxStrategy()) {
    this.taxStrategy = taxStrategy
  }

  public handleOperation(operation: TradeOperation): TaxResult {
    switch (operation.operation) {
      case 'buy':
        return this.handleBuyOperation(operation)
      case 'sell':
        return this.handleSellOperation(operation)
      default:
        throw new Error('Operação inválida')
    }
  }

  private handleBuyOperation(operation: TradeOperation): TaxResult {
    this.updateWeightedAverageCost(operation)
    this.totalShares += operation.quantity
    return { tax: 0 }
  }

  private updateWeightedAverageCost(operation: TradeOperation): void {
    const totalCostOfCurrentShares = this.weightedAverageCostPerShare * this.totalShares
    const totalCostOfNewShares = operation.unitCost * operation.quantity
    const totalSharesAfterPurchase = this.totalShares + operation.quantity

    this.weightedAverageCostPerShare = (totalCostOfCurrentShares + totalCostOfNewShares) / totalSharesAfterPurchase
  }

  private handleSellOperation(operation: TradeOperation): TaxResult {
    this.verifySufficientShares(operation.quantity)

    const grossProfit = this.calculateGrossProfit(operation)
    const netProfit = this.calculateNetProfitAfterLosses(grossProfit)
    const tax = this.computeTaxIfApplicable(netProfit, operation)

    this.reduceSharesAfterSale(operation.quantity)

    return { tax }
  }

  private verifySufficientShares(quantity: number): void {
    if (this.totalShares < quantity) {
      throw new Error(`Insufficient quantity of shares. Attempted to sell: ${quantity}, available: ${this.totalShares}`)
    }
  }

  private reduceSharesAfterSale(quantity: number): void {
    this.totalShares -= quantity
  }

  private calculateGrossProfit(operation: TradeOperation): number {
    return (operation.unitCost - this.weightedAverageCostPerShare) * operation.quantity
  }

  private calculateNetProfitAfterLosses(grossProfit: number): number {
    if (this.accumulatedLosses > 0) {
      grossProfit = this.applyAccumulatedLosses(grossProfit)
    }

    if (grossProfit < 0) {
      this.accumulateLoss(grossProfit)
      return 0
    }

    return grossProfit
  }

  private applyAccumulatedLosses(grossProfit: number): number {
    const adjustedProfit = grossProfit - this.accumulatedLosses
    this.accumulatedLosses = Math.max(0, -adjustedProfit)
    return adjustedProfit
  }

  private accumulateLoss(loss: number): void {
    this.accumulatedLosses += Math.abs(loss)
  }

  private computeTaxIfApplicable(netProfit: number, operation: TradeOperation): number {
    const totalSaleValue = operation.unitCost * operation.quantity

    if (totalSaleValue <= 20000) {
      return 0
    }

    return this.taxStrategy.calculateTax(netProfit, totalSaleValue)
  }
}