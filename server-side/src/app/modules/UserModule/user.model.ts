import mongoose from "mongoose";
import { TUser, UserModel } from "./user.interface";

const userSchema = new mongoose.Schema<TUser>({
    name: {type: String},
    email: {type: String},
    role: {type: String, default: "user"}
});
userSchema.statics.isUserExists = async function (email: string) {
    const existingUser = await User.findOne({ email: email });
    return existingUser;
  };
export const User = mongoose.model<TUser, UserModel>('user', userSchema);
