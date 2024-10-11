import { Operation } from "../types/Operation"

export class BuyOperation implements Operation {
  type: 'buy'
  quantity: number
  unitCost: number

  constructor(quantity: number, unitCost: number) {
    this.type = 'buy'
    this.quantity = quantity
    this.unitCost = unitCost
  }

  execute(currentQuantity: number, currentAverageCost: number): { newQuantity: number, newAverageCost: number } {
    const totalCost = (currentAverageCost * currentQuantity) + (this.unitCost * this.quantity)
    const newQuantity = currentQuantity + this.quantity
    const newAverageCost = totalCost / newQuantity
    return { newQuantity, newAverageCost }
  }
}
