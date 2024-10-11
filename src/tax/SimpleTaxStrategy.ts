import { TaxStrategy } from "./TaxStrategy"

export class SimpleTaxStrategy implements TaxStrategy {
    private readonly TAX_RATE = 0.20
  
    public calculateTax(profit: number, totalSaleValue: number) {
      return profit > 0 ? profit * this.TAX_RATE : 0
    }
}
  