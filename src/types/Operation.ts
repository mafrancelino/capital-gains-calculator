export interface TradeOperation {
  operation: 'buy' | 'sell' | string; // Permite extensibilidade para novas operações
  quantity: number;
  unitCost: number;
  execute(currentQuantity: number, currentAverageCost: number): { newQuantity: number, profit?: number, newAverageCost?: number };
}

export interface TaxResult {
  tax: number
}