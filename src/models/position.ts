import * as mongoose from "mongoose";

interface IPosition {
  name: string;
  const: number;
  categoryId: string;
  userId: string;
}

const positionSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  categoryId: {
    ref: "categories",
    type: mongoose.Schema.Types.ObjectId
  },
  userId: {
    ref: "users",
    type: mongoose.Schema.Types.ObjectId
  }
});

export const Position = mongoose.model<IPosition & mongoose.Document>(
  "positions",
  positionSchema
);
