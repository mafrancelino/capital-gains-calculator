import { TradeOperation } from '../types/Operation'

export class OperationFactory {
  static create(operation: TradeOperation): TradeOperation {
    return {
      operation: operation.operation,
      quantity: operation.quantity,
      unitCost: operation.unitCost
    }
  }
}
