import { calculateNewWeightedAverageCost, calculateGrossProfit, applyAccumulatedLosses } from '../utils/tradeCalculations';
import { TaxStrategy } from '../tax/TaxStrategy';
import { TradeOperation } from '../types/Operation';
import { ExemptTaxStrategy } from '../tax/ExemptTaxStrategy';

interface TaxResult {
  tax: number
}
export class CapitalGainsCalculator {
  private totalShares = 0;
  private weightedAverageCostPerShare = 0;
  private accumulatedLosses = 0;
  private readonly taxStrategy: TaxStrategy;

  constructor(taxStrategy: TaxStrategy = new ExemptTaxStrategy()) {
    this.taxStrategy = taxStrategy;
  }

  // Nova função para processar uma lista de operações
  public handleOperations(operations: TradeOperation[]): TaxResult[] {
    return operations.map(operation => this.handleOperation(operation));
  }

  // Processa uma operação individual
  private handleOperation(operation: TradeOperation): TaxResult {
    if (operation.operation === 'buy') {
      return this.handleBuyOperation(operation);
    } 
    if (operation.operation === 'sell') {
      return this.handleSellOperation(operation);
    }

    throw new Error('Invalid operation');
  }

  private handleBuyOperation(operation: TradeOperation): TaxResult {
    this.weightedAverageCostPerShare = calculateNewWeightedAverageCost(
      this.totalShares,
      this.weightedAverageCostPerShare,
      operation.quantity,
      operation['unit-cost']
    );
    this.totalShares += operation.quantity;

    return { tax: 0 };
  }

  private handleSellOperation(operation: TradeOperation): TaxResult {
    this.verifySufficientShares(operation.quantity);

    const grossProfit = calculateGrossProfit(
      operation['unit-cost'],
      this.weightedAverageCostPerShare,
      operation.quantity
    );

    const { netProfit, remainingLosses } = applyAccumulatedLosses(grossProfit, this.accumulatedLosses);
    this.accumulatedLosses = remainingLosses;

    const tax = this.computeTaxIfApplicable(netProfit, operation);

    this.reduceSharesAfterSale(operation.quantity);

    return { tax };
  }

  private verifySufficientShares(quantity: number): void {
    if (this.totalShares < quantity) {
      console.error(`Error: Insufficient shares. Attempt to sell ${quantity}, available: ${this.totalShares}`);
      throw new Error(`Insufficient shares. Attempt to sell ${quantity}, available: ${this.totalShares}`);
    }
  }

  private reduceSharesAfterSale(quantity: number): void {
    this.totalShares -= quantity;
  }

  private computeTaxIfApplicable(netProfit: number, operation: TradeOperation): number {
    const totalSaleValue = operation['unit-cost'] * operation.quantity;
    if (totalSaleValue <= 20000) {
      return 0;
    }
    return this.taxStrategy.calculateTax(netProfit, totalSaleValue);
  }
}
