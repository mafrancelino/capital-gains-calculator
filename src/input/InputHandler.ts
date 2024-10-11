export class InputHandler {
  static async readInput(): Promise<any[]> {
    let inputData = ''
    
    for await (const chunk of process.stdin) {
      inputData += chunk
    }

    try {
      const operations = JSON.parse(inputData.trim())
      return operations
    } catch (error) {
      throw new Error('Invalid input format')
    }
  }
}
