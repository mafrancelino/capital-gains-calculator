import { CapitalGainsCalculator } from "./business/CapitalGainsCalculator"
import { InputHandler } from "./input/InputHandler"
import OutputFormatter from "./output/OutputFormatter"

async function main() {
  const inputHandler = new InputHandler()
  const operations = await inputHandler.readInput()

  operations.forEach(operations => {
    const calculator = new CapitalGainsCalculator()
    const results = calculator.handleOperations(operations)

    const formattedResults = results.map(result => ({ tax: parseFloat(result.tax.toFixed(2)) }))
    console.log(OutputFormatter.format(formattedResults))  
  })
}

main()
