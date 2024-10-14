import { SellOperation } from './SellOperation'

describe('SellOperation', () => {
  it('should calculate new quantity and profit', () => {
    const sellOperation = new SellOperation(10, 20)
    const currentQuantity = 100
    const currentAverageCost = 15

    const result = sellOperation.execute(currentQuantity, currentAverageCost)

    expect(result).toEqual({ newQuantity: 90, profit: 50 })
  })
})
