import mongoose from "mongoose";
import { TRoomOrder } from "./roomOrder.interface";


const roomOrderSchema = new mongoose.Schema<TRoomOrder>({
    roomId: {
        type: Number,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    checkIn: {
        type: String,
        required: true
    },
    checkOut: {
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
export const RoomOrder = mongoose.model<TRoomOrder>('room_order', roomOrderSchema);