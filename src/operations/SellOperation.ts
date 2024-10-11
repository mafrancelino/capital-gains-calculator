import { Operation } from "../types/Operation"

export class SellOperation implements Operation {
  type: 'sell'
  quantity: number
  unitCost: number

  constructor(quantity: number, unitCost: number) {
    this.type = 'sell'
    this.quantity = quantity
    this.unitCost = unitCost
  }

  execute(currentQuantity: number, currentAverageCost: number): { newQuantity: number, profit: number } {
    const profit = (this.unitCost - currentAverageCost) * this.quantity
    const newQuantity = currentQuantity - this.quantity
    return { newQuantity, profit }
  }
}
