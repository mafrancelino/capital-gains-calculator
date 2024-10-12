import { TradeOperation } from '../types/Operation'
import { BuyOperation } from './BuyOperation'
import { SellOperation } from './SellOperation'

export class OperationFactory {
  static create(operation: TradeOperation): TradeOperation {
    if (operation.operation === 'buy') {
      return new BuyOperation(operation.quantity, operation.unitCost)
    } else if (operation.operation === 'sell') {
      return new SellOperation(operation.quantity, operation.unitCost)
    } else {
      throw new Error('Tipo de operação inválido')
    }
  }
}
