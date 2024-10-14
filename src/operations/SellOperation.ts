import { TradeOperation } from "../types/Operation"
import { calculateGrossProfit } from "../utils/tradeCalculations"

export class SellOperation implements TradeOperation {
  public readonly operation: 'sell'
  public readonly quantity: number
  public readonly unitCost: number

  constructor(quantity: number, unitCost: number) {
    this.operation = 'sell'
    this.quantity = quantity
    this.unitCost = unitCost
  }

  // Delegar o cálculo para uma função pura
  execute(currentQuantity: number, currentAverageCost: number): { newQuantity: number, profit: number } {
    const profit = calculateGrossProfit(this.unitCost, currentAverageCost, this.quantity)
    const newQuantity = currentQuantity - this.quantity
    return { newQuantity, profit }
  }
}