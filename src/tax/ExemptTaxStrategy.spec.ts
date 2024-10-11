import { ExemptTaxStrategy } from './ExemptTaxStrategy'

describe('ExemptTaxStrategy', () => {
  const taxStrategy = new ExemptTaxStrategy()

  it('should not apply tax if the total sale value is below the exemption limit', () => {
    const tax = taxStrategy.calculateTax(5000, 18000)
    expect(tax).toBe(0)
  })

  it('should apply tax if the total sale value is above the exemption limit', () => {
    const tax = taxStrategy.calculateTax(10000, 25000)
    expect(tax).toBe(2000) // 20% of 10000 is 2000
  })

  it('should not apply tax if there is a negative profit', () => {
    const tax = taxStrategy.calculateTax(-10000, 30000)
    expect(tax).toBe(0)
  })

  it('should not apply tax if the total sale value is exactly at the exemption limit', () => {
    const tax = taxStrategy.calculateTax(4000, 20000)
    expect(tax).toBe(0)
  })

  it('should not apply tax if there is no profit', () => {
    const tax = taxStrategy.calculateTax(0, 25000)
    expect(tax).toBe(0)
  })

  it('should apply tax on large profits with total sale value above exemption limit', () => {
    const tax = taxStrategy.calculateTax(50000, 50000)
    expect(tax).toBe(10000) // 20% of 50000 is 10000
  })

  it('should apply tax if total sale value is far above the exemption limit', () => {
    const tax = taxStrategy.calculateTax(20000, 100000)
    expect(tax).toBe(4000) // 20% of 20000 is 4000
  })
})
