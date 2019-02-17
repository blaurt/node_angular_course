import { OrderPosition } from "./orderPosition";

export interface Position extends OrderPosition {
  _id?: string;
  name: string;
  cost: number;
  quantity?: number;
  categoryId: string;
  userId?: string;
}
