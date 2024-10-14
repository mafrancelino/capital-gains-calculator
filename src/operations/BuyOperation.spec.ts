import { BuyOperation } from './BuyOperation'

describe('BuyOperation', () => {
  it('should calculate new quantity and average cost with rounding', () => {
    const buyOperation = new BuyOperation(10, 20)

    const result = buyOperation.execute(100, 15)

    expect(result).toEqual({ newQuantity: 110, newAverageCost: 15.45 })
  })
})
