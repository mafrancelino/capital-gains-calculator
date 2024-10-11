export interface TaxStrategy {
    calculateTax(profit: number, totalSaleValue: number): number
}
  