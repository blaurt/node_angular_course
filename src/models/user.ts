import * as mongoose from "mongoose";

export interface IUser {
  email: string;
  password: string;
}
const userSchema: mongoose.Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

export const User = mongoose.model<IUser & mongoose.Document>(
  "users",
  userSchema
);
