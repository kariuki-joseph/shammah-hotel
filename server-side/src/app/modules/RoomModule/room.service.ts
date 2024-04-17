import { RoomOrder as RoomOrder } from "../RoomOrdersModule/roomOrder.model";
import {  TProductRoom } from "./room.interfce";
import { Room } from "./room.model";

const addRoomToDB = async(roomData : TProductRoom) => {
    const result = await Room.create(roomData);
    return result;
}

const searchAvailableRoomFromDB = async(checkIn : Date, checkOut : Date, persons: Number) => {
  const bookedRoomIds = await RoomOrder.distinct('roomId', {
    $or: [
      { checkIn: { $lte: checkOut }, checkOut: { $gte: checkIn } },
      { checkIn: { $gte: checkIn, $lte: checkOut } },
    ],
  });

console.log("bookingID",bookedRoomIds)

// Fetch the rooms that are not in the list of booked room IDs and have a capacity greater than or equal to the number of persons
const availableRooms = await Room.find({ roomId: { $nin: bookedRoomIds }, capacity: { $gte: persons } });

return availableRooms;
}

const searchAvailableSingleRoomFromDB = async(roomId: string, checkIn: Date, checkOut: Date, persons: number) => {
  // Fetch the room with the given roomId
  const room = await Room.findOne({ roomId: roomId });

  // If the room doesn't exist or its capacity is less than the number of persons, return false
  if (!room || room.capacity < persons) {
    return false;
  }

  // Check if there are any bookings that overlap with the given dates
  const overlappingBookings = await RoomOrder.find({
    roomId: roomId,
    $or: [
      { checkIn: { $lte: checkIn }, checkOut: { $gte: checkOut } },
      { checkIn: { $gte: checkIn, $lte: checkOut } },
    ],
  });

  // If there are overlapping bookings, return false. Otherwise, return true.
  return overlappingBookings.length === 0;
}

const getAllRoomFromDB = async() => {
    const result = await Room.find();
    return result;
}

const getSingleRoomFromDB = async(id: Number) => {
    const result = await Room.findOne({roomId: id});
    return result;
}

const deleteRoomFromDB = async(id: Number) => {
    const result = await Room.deleteOne({roomId: id});
    return result;
}

const updateRoomFromDB = async(id: Number, updatedData : any) => {
    const result = await Room.updateOne({roomId: id}, updatedData);
    return result;
}

export const ProductServices = {
    addRoomToDB,
    getAllRoomFromDB,
    getSingleRoomFromDB,
    deleteRoomFromDB,
    searchAvailableRoomFromDB,
    updateRoomFromDB,
    searchAvailableSingleRoomFromDB
}