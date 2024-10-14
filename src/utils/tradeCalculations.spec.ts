import { calculateNewWeightedAverageCost, calculateGrossProfit, applyAccumulatedLosses } from './tradeCalculations'

describe('calculateNewWeightedAverageCost', () => {
  it('should calculate the new weighted average cost', () => {
    const result = calculateNewWeightedAverageCost(100, 15, 10, 20)
    expect(result).toBeCloseTo(15.45, 2) 
  })
})

describe('calculateGrossProfit', () => {
  it('should calculate the gross profit', () => {
    const result = calculateGrossProfit(20, 15.45, 10)
    expect(result).toBeCloseTo(45.5, 2) 
  })
})

describe('applyAccumulatedLosses', () => {
  it('should apply accumulated losses when the adjusted profit is positive', () => {
    const result = applyAccumulatedLosses(80, 20)
    expect(result).toEqual({ netProfit: 60, remainingLosses: 0 })
  })

  it('should apply accumulated losses when the adjusted profit is negative', () => {
    const result = applyAccumulatedLosses(50, 100)
    expect(result).toEqual({ netProfit: 0, remainingLosses: 50 })
  })
})
