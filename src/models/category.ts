import * as mongoose from "mongoose";

export interface ICategory extends mongoose.Document {
  name: string;
  imageSrc: string;
  userId: string;
}

const categorySchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageSrc: {
    type: String,
    default: null
  },
  userId: {
    ref: "users",
    type: mongoose.Schema.Types.ObjectId
  }
});

export const Category = mongoose.model<ICategory>("categories", categorySchema);
