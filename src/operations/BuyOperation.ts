import { TradeOperation } from "../types/Operation"

export class BuyOperation implements TradeOperation {
  public readonly operation: 'buy'
  public readonly quantity: number
  public readonly unitCost: number

  constructor(quantity: number, unitCost: number) {
    this.operation = 'buy'
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
