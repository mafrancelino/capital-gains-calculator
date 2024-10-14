import { OperationFactory } from './OperationFactory'
import { TradeOperation } from '../types/Operation'

describe('OperationFactory', () => {
  it('deve criar uma operação igual à entrada', () => {
    const input: TradeOperation = {
      operation: 'buy',
      quantity: 100,
      unitCost: 10
    }

    const result = OperationFactory.create(input)

    expect(result).toEqual(input)
  })
})
