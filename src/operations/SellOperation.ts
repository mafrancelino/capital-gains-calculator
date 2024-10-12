import { TradeOperation } from "../types/Operation"

export class SellOperation implements TradeOperation {
  operation: 'sell'
  quantity: number
  unitCost: number

  constructor(quantity: number, unitCost: number) {
    this.operation = 'sell'
    this.quantity = quantity
    this.unitCost = unitCost
  }

  execute(currentQuantity: number, currentAverageCost: number): { newQuantity: number, profit: number } {
    const profit = (this.unitCost - currentAverageCost) * this.quantity
    const newQuantity = currentQuantity - this.quantity
    return { newQuantity, profit }
  }
}
