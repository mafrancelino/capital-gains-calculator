import { TaxStrategy } from "./TaxStrategy"

export class ExemptTaxStrategy implements TaxStrategy {
  private readonly EXEMPTION_LIMIT = 20000

  public calculateTax(profit: number, totalSaleValue: number): number {
    if (totalSaleValue <= this.EXEMPTION_LIMIT) {
      return 0
    }
    const TAX_RATE = 0.20
    return profit > 0 ? profit * TAX_RATE : 0
  }
}
