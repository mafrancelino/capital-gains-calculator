import { InputHandler } from './InputHandler'

describe('InputHandler', () => {
  const mockInput = '[{"operation": "buy", "unit-cost": 10, "quantity": 100}]'

  it('should parse valid JSON input', async () => {
    process.stdin.push(mockInput)
    process.stdin.push(null)

    const result = await InputHandler.readInput()
    expect(result).toEqual([{ operation: 'buy', 'unit-cost': 10, quantity: 100 }])
  })

  it('should throw an error for invalid JSON input', async () => {
    process.stdin.push('invalid json')
    process.stdin.push(null) 

    await expect(InputHandler.readInput()).rejects.toThrow('Invalid input format')
  })
})
