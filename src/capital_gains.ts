import { CapitalGainsCalculator } from "./business/CapitalGainsCalculator"
import { InputHandler } from "./input/InputHandler"

async function main() {
    const calculator = new CapitalGainsCalculator()

    try {
        const operations = await InputHandler.readInput()

        for (const operation of operations) {
            try {
                const result = calculator.handleOperation(operation)
                console.log(result)
            } catch (error) {
                console.error('Erro ao processar operação:', error.message)
            }
        }
    } catch (error) {
        console.error('Erro na leitura de operações:', error.message)
    }
}

main()
