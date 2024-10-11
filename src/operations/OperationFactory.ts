import { Operation } from '../types/Operation'
import { BuyOperation } from './BuyOperation'
import { SellOperation } from './SellOperation'

export class OperationFactory {
  static create(operation: Operation): Operation {
    if (operation.type === 'buy') {
      return new BuyOperation(operation.quantity, operation.unitCost)
    } else if (operation.type === 'sell') {
      return new SellOperation(operation.quantity, operation.unitCost)
    } else {
      throw new Error('Tipo de operação inválido')
    }
  }
}
