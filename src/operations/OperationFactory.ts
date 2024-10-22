import { TradeOperation } from "../types/Operation";
import { BuyOperation } from "./BuyOperation";
import { SellOperation } from "./SellOperation";

export class OperationFactory {
  static create(tradeOperation: TradeOperation): TradeOperation {
    
    const normalizedTrade = {
      ...tradeOperation,
      unitCost: tradeOperation['unit-cost'] || tradeOperation.unitCost 
    };

    switch (normalizedTrade.operation) {
      case 'buy':
        return new BuyOperation(normalizedTrade.quantity, normalizedTrade.unitCost);
      case 'sell':
        return new SellOperation(normalizedTrade.quantity, normalizedTrade.unitCost);
      default:
        throw new Error(`Unsupported operation type: ${normalizedTrade.operation}`);
    }
  }
}
