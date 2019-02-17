import { Position } from "../shared/interfaces/position";
import { OrderPosition } from "../shared/interfaces/orderPosition";

export class OrderService {
  list: Position[] = [];
  price: number = 0;

  constructor() {}

  add = (position: Position) => {
    const orderPosition = Object.assign({}, { ...position });
    const candidate = this.list.find(p => p._id === orderPosition._id);
    if (candidate) {
      candidate.quantity = position.quantity;
    } else {
      this.list.push(orderPosition);
    }
    this.recalculatePrice();
  };

  remove(position: Position) {
    const idx = this.list.findIndex(p => p._id === position._id);
    this.list.splice(idx, 1);
    this.recalculatePrice();
  }

  clear() {
    this.list = [];
    this.price = 0;
  }

  private recalculatePrice = () => {
    this.price = this.list.reduce(
      (counter, item) => counter + item.cost * item.quantity,
      0
    );
  };
}
