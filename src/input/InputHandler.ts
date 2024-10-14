export class InputHandler {
  async readInput(): Promise<any[]> {
    let inputData = ''

    for await (const chunk of process.stdin) {
      inputData += chunk
    }

    const blocks = inputData.trim().match(/\[.*?\]/gs) || []

    return blocks.map((block: string) => JSON.parse(block))
  }
}
