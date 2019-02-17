import { OrderPosition } from "./orderPosition";

export interface Order {
  date?: number;
  order?: number;
  list: OrderPosition[];
  userId?: string;
  _id?: string;
}
