import { Position } from "src/app/shared/interfaces/position";

interface IPositionMenuItem extends Position {
  quantity?: number;
}

export class PositionMenuItem implements IPositionMenuItem {
  public quantity: number;
  public _id: string;
  public name: string;
  public categoryId: string;
  public cost: number;

  constructor(position: Position) {
    this.name = position.name;
    this._id = position._id;
    this.categoryId = position.categoryId;
    this.cost = position.cost;

    this.quantity = 1;
  }
}
