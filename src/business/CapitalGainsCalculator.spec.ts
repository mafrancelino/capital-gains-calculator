import { CapitalGainsCalculator } from './CapitalGainsCalculator'
import { ExemptTaxStrategy } from '../tax/ExemptTaxStrategy'
import { TradeOperation } from '../types/Operation'

describe('CapitalGainsCalculator', () => {
  let calculator: CapitalGainsCalculator

  const buyOperation: TradeOperation = {
    operation: 'buy',
    quantity: 100,
    unitCost: 10
  }

  beforeEach(() => {
    const taxStrategy = new ExemptTaxStrategy()
    calculator = new CapitalGainsCalculator(taxStrategy)
  })

  it('should not calculate tax for buy operations', () => {
    const result = calculator.handleOperations([buyOperation])
    expect(result[0].tax).toBe(0)
  })

  it('should accumulate loss after a sell operation with negative profit', () => {
    const sellOperation: TradeOperation = {
      operation: 'sell',
      quantity: 100,
      unitCost: 5
    }

    const result = calculator.handleOperations([buyOperation, sellOperation])
    expect(result[1].tax).toBe(0)
  })

  it('should throw an error if selling more shares than available', () => {
    const sellOperation: TradeOperation = {
      operation: 'sell',
      quantity: 200,
      unitCost: 15
    }

    expect(() => calculator.handleOperations([buyOperation, sellOperation])).toThrow()
  })
})
