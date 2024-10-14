import { CapitalGainsCalculator } from "../src/business/CapitalGainsCalculator"
import { BuyOperation } from "../src/operations/BuyOperation"
import { SellOperation } from "../src/operations/SellOperation"
import { ExemptTaxStrategy } from "../src/tax/ExemptTaxStrategy"
import { SimpleTaxStrategy } from "../src/tax/SimpleTaxStrategy"

describe('CapitalGainsCalculator Integration Test', () => {
  it('should correctly calculate taxes for multiple buy and sell operations', () => {
    const calculator = new CapitalGainsCalculator(new SimpleTaxStrategy());

    const operations = [
      new BuyOperation(10000, 10),
      new SellOperation(5000, 20),
      new SellOperation(3000, 15),
      new BuyOperation(2000, 25),
      new SellOperation(4000, 30)
    ]

    const result = calculator.handleOperations(operations);
    expect(result).toEqual([
      { tax: 0 },
      { tax: 10000 },
      { tax: 3000 },
      { tax: 0 },
      { tax: 10000 }
    ]);
  });
});

