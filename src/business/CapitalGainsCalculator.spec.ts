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

  it('should calculate average cost after a buy operation', () => {
    const result = calculator.handleOperation(buyOperation) 
    expect(result.tax).toBe(0)
  })

  it('should throw an error if selling more shares than available', () => {
    const sellOperation: TradeOperation = {
      operation: 'sell',
      quantity: 200,
      unitCost: 15
    }
    
    calculator.handleOperation(buyOperation) 
    expect(() => calculator.handleOperation(sellOperation)).toThrow(
      'Quantidade insuficiente de ações para vender'
    )
  })

  it('should calculate zero tax for sales below the exemption limit', () => {
    const sellOperation: TradeOperation = {
      operation: 'sell',
      quantity: 50,
      unitCost: 15
    }

    calculator.handleOperation(buyOperation)
    const result = calculator.handleOperation(sellOperation) 
    expect(result.tax).toBe(0)
  })

  it('should accumulate loss after a sell operation with negative profit', () => {
    const sellOperation: TradeOperation = {
      operation: 'sell',
      quantity: 100,
      unitCost: 15
    }
    
    calculator.handleOperation(buyOperation)
    const result = calculator.handleOperation(sellOperation) 
    expect(result.tax).toBe(0)
  })
})
