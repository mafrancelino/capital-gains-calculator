export interface TradeOperation {
  operation: 'buy' | 'sell'
  quantity: number
  unitCost: number
} 

export interface TaxResult {
  tax: number
}