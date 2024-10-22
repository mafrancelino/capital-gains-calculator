import { OperationFactory } from './OperationFactory'
import { BuyOperation } from './BuyOperation'
import { SellOperation } from './SellOperation'
import { TradeOperation } from '../types/Operation'

describe('OperationFactory', () => {
  it('should create a BuyOperation instance correctly', () => {
    const input = {
      operation: 'buy',
      quantity: 100,
      unitCost: 10
    }

    const result = OperationFactory.create(input as TradeOperation)

    expect(result).toBeInstanceOf(BuyOperation)
    expect(result.operation).toBe('buy')
    expect(result.quantity).toBe(100)
    expect(result.unitCost).toBe(10)
  })

  it('should create a SellOperation instance correctly', () => {
    const input = {
      operation: 'sell',
      quantity: 50,
      unitCost: 20
    }

    const result = OperationFactory.create(input as TradeOperation)

    expect(result).toBeInstanceOf(SellOperation)
    expect(result.operation).toBe('sell')
    expect(result.quantity).toBe(50)
    expect(result.unitCost).toBe(20)
  })

  it('should throw an error for unsupported operations', () => {
    const input = {
      operation: 'invalid',
      quantity: 100,
      unitCost: 10
    }

    expect(() => OperationFactory.create(input as TradeOperation)).toThrow('Unsupported operation type: invalid')
  })
})
