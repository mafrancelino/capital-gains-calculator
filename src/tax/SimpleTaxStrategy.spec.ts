import { SimpleTaxStrategy } from './SimpleTaxStrategy'

describe('SimpleTaxStrategy', () => {
  const taxStrategy = new SimpleTaxStrategy()

  it('should calculate 20% tax on positive profit', () => {
    const tax = taxStrategy.calculateTax(10000, 50000)  // Lucro de 10000
    expect(tax).toBe(2000)  // 20% de 10000 é 2000
  })

  it('should not calculate tax on zero profit', () => {
    const tax = taxStrategy.calculateTax(0, 50000)  // Lucro de 0
    expect(tax).toBe(0)  // Sem imposto se o lucro for 0
  })

  it('should not calculate tax on negative profit', () => {
    const tax = taxStrategy.calculateTax(-5000, 50000)  // Lucro negativo
    expect(tax).toBe(0)  // Sem imposto se o lucro for negativo
  })
})
