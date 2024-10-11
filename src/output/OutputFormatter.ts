class OutputFormatter {
    static format(results: any[]): string {
        return JSON.stringify(results, null, 2)
    }
}

export default OutputFormatter
