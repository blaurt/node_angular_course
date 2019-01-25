import * as mongoose from "mongoose";

interface IListItem {
  name: string;
  quantity: number;
}
export interface IOrder extends mongoose.Document {
  date: number;
  order: number;
  list: [IListItem];
  userId: string;
}

const orderSchema: mongoose.Schema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  order: {
    type: Number,
    required: true
  },
  list: [
    {
      name: {
        type: String
      },
      quantity: {
        type: Number
      },
      cost: {
        type: Number
      }
    }
  ],
  userId: {
    ref: "users",
    type: mongoose.Schema.Types.ObjectId
  }
});

export const Order = mongoose.model<IOrder>("orders", orderSchema);
