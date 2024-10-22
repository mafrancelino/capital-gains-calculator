import { CapitalGainsCalculator } from './CapitalGainsCalculator'
import { ExemptTaxStrategy } from '../tax/ExemptTaxStrategy'
import { BuyOperation } from '../operations/BuyOperation'
import { SellOperation } from '../operations/SellOperation'

describe('CapitalGainsCalculator', () => {
  let calculator: CapitalGainsCalculator

  beforeEach(() => {
    const taxStrategy = new ExemptTaxStrategy()
    calculator = new CapitalGainsCalculator(taxStrategy)
  })

  it('should not calculate tax for buy operations', () => {
    const buyOperation = new BuyOperation(100, 10)

    const result = calculator.handleOperations([buyOperation])
    expect(result[0].tax).toBe(0)
  })

  it('should accumulate loss after a sell operation with negative profit', () => {
    const buyOperation = new BuyOperation(100, 10)
    const sellOperation = new SellOperation(100, 5)

    const result = calculator.handleOperations([buyOperation, sellOperation])
    expect(result[1].tax).toBe(0)
  })

  it('should throw an error if selling more shares than available', () => {
    const buyOperation = new BuyOperation(100, 10)
    const sellOperation = new SellOperation(200, 15)

    expect(() => calculator.handleOperations([buyOperation, sellOperation])).toThrow(
      'Insufficient shares. Attempt to sell 200, available: 100'
    )
  })

  it('should not calculate tax if total sale value is less than or equal to R$ 20,000', () => {
    const buyOperation = new BuyOperation(1000, 10) // Total: R$ 10,000
    const sellOperation = new SellOperation(500, 15) // Total: R$ 7,500

    const result = calculator.handleOperations([buyOperation, sellOperation])

    expect(result[1].tax).toBe(0)
  })

  it('should calculate tax for profitable sell operation when total sale value is greater than R$ 20,000', () => {
    const buyOperation = new BuyOperation(2000, 10) // Total: R$ 20,000
    const sellOperation = new SellOperation(1000, 30) // Total: R$ 30,000

    const result = calculator.handleOperations([buyOperation, sellOperation])

    // O imposto deve ser 20% do lucro: (30 - 10) * 1000 * 0.20 = 4,000
    expect(result[1].tax).toBe(4000)
  })
})
