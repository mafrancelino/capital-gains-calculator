export function calculateNewWeightedAverageCost(
    currentShares: number,
    currentWeightedCost: number,
    newShares: number,
    newUnitCost: number
): number {
    const totalCurrentCost = currentShares * currentWeightedCost
    const totalNewCost = newShares * newUnitCost
    const totalShares = currentShares + newShares

    const newAverageCost = (totalCurrentCost + totalNewCost) / totalShares
    return Math.round((newAverageCost + Number.EPSILON) * 100) / 100
}

export function calculateGrossProfit(
    unitCost: number,
    weightedAverageCost: number,
    quantity: number
): number {
    const grossProfit = (unitCost - weightedAverageCost) * quantity
    return Math.round((grossProfit + Number.EPSILON) * 100) / 100
}

export function applyAccumulatedLosses(
    grossProfit: number,
    accumulatedLosses: number
): { netProfit: number; remainingLosses: number } {
    const adjustedProfit = grossProfit - accumulatedLosses

    if (adjustedProfit < 0) {
        return { netProfit: 0, remainingLosses: Math.abs(adjustedProfit) }
    }

    return { netProfit: adjustedProfit, remainingLosses: 0 }
}
