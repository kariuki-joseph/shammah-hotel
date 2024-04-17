import mongoose from "mongoose";
import { TProductRoom } from "./room.interfce";

const roomSchema = new mongoose.Schema<TProductRoom>({
    roomId: {
        type: Number,
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
    },
    videoUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    roomSize: {
        type: Number,
        required: true
    },
    amenities: {
        type: [String],
        required: true
    },
    ratings: {
        type: Number,
        required: false,
        default: 0
    }
});


export const Room = mongoose.model<TProductRoom>('room', roomSchema);