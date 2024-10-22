import { TradeOperation } from "../types/Operation";
import { BuyOperation } from "./BuyOperation";
import { SellOperation } from "./SellOperation";

export class OperationFactory {
  static create(operation: TradeOperation): TradeOperation {
    switch (operation.operation) {
      case 'buy':
        return new BuyOperation(operation.quantity, operation['unit-cost']);
      case 'sell':
        return new SellOperation(operation.quantity, operation['unit-cost']);
      default:
        throw new Error(`Unsupported operation type: ${operation.operation}`);
    }
  }
}
