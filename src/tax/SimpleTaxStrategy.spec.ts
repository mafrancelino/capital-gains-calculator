
import { SimpleTaxStrategy } from './SimpleTaxStrategy'

describe('SimpleTaxStrategy', () => {
  const taxStrategy = new SimpleTaxStrategy()

  it('should calculate 20% tax on positive profit', () => {
    const tax = taxStrategy.calculateTax(10000, 50000)
    expect(tax).toBe(2000)
  })

  it('should not calculate tax on zero profit', () => {
    const tax = taxStrategy.calculateTax(0, 50000)
    expect(tax).toBe(0)
  })

  it('should not calculate tax on negative profit', () => {
    const tax = taxStrategy.calculateTax(-5000, 50000)
    expect(tax).toBe(0)
  })
})