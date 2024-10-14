import { TradeOperation } from "../types/Operation"
import { calculateNewWeightedAverageCost } from "../utils/tradeCalculations"

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
    const newAverageCost = calculateNewWeightedAverageCost(currentQuantity, currentAverageCost, this.quantity, this.unitCost)
    const roundedAverageCost = Math.round(newAverageCost * 100) / 100  
    const newQuantity = currentQuantity + this.quantity
    return { newQuantity, newAverageCost: roundedAverageCost }
  }
}