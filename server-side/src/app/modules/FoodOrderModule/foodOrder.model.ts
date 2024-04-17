import mongoose from "mongoose";
import { TFoodOrder } from "./foodOrder.interface";

const foodOrderSchema = new mongoose.Schema<TFoodOrder>({
   foodId: {
      type: Number,
      required: true,
   },
   orderId: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   name: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   imageUrl: {
      type: String,
      required: true
   }
});

export const FoodOrder = mongoose.model<TFoodOrder>('food_order', foodOrderSchema);