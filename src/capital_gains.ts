import { CapitalGainsCalculator } from "./business/CapitalGainsCalculator"
import { InputHandler } from "./input/InputHandler"

async function main() {
  const inputHandler = new InputHandler()
  const operations = await inputHandler.readInput()

  operations.forEach(operations => {
    const calculator = new CapitalGainsCalculator()
    const results = calculator.handleOperations(operations)

    const formattedResults = results.map(result => ({ tax: parseFloat(result.tax.toFixed(2)) }))
    console.log(JSON.stringify(formattedResults))
  })
}

main()
