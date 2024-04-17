import { Request, Response } from "express";
import { ProductServices } from "./room.service";

const addRoom = async(req : Request, res : Response)=> {
    try {
    const roomData = req.body;
    const result = await ProductServices.addRoomToDB(roomData);
    res.status(201).json({
        success: true,
        message: "Room Successfully Created",
        data: result
    })
    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong.',
            data: null
        })
    }
}

const searchAvailableRooms = async(req : Request, res : Response) => {
   
    const {checkIn, checkOut, persons } = req.query;

    if(checkIn == null){
        res.status(400).json({
            success: false,
            message: "checkIn date is required",
        });
        return;
    }

    if(checkOut == null){
        // assume checkout date is the same as checkin
        res.status(400).json({
            success: false,
            message: "checkOut date is required"
        });
        return;
    }
    
    if(persons == null){
        // assume checkout date is the same as checkin
        res.status(400).json({
            success: false,
            message: "number of persons is required"
        });
        return;
    }
    

    const result = await ProductServices.searchAvailableRoomFromDB(new Date(checkIn as string), new Date(checkOut as string), Number(persons));
    // console.log("result: ",result)
    res.status(200).json({
        success: result.length > 0,
        message: result.length > 0? "Available Rooms Fetched successfully" : "No available rooms for the given parameters",
        data: result
    })
}

const searchSingleAvailableRooms = async (req : Request, res : Response) => {
   const roomId = req.params.id;

    const {checkIn, checkOut, persons } = req.query;
    // check required parameters
    if(checkIn == null){
        res.status(400).json({
            success: false,
            message: "checkIn date is required",
        });
        return;
    }

    if(checkOut == null){
        // assume checkout date is the same as checkin
        res.status(400).json({
            success: false,
            message: "checkOut date is required"
        });
        return;
    }
    
    if(persons == null){
        // assume checkout date is the same as checkin
        res.status(400).json({
            success: false,
            message: "number of persons is required"
        });
        return;
    }

    const availableRoom = await ProductServices.searchAvailableSingleRoomFromDB(roomId, new Date(checkIn as string), new Date(checkOut as string), Number(persons));

    res.status(200).json({
        success: availableRoom,
        message: availableRoom? "Room Available": "Room unavailable for the given parameters",
        data: availableRoom
    });
}

const getAllRooms = async(req : Request, res : Response)=> {
    try {
    const result = await ProductServices.getAllRoomFromDB();
    res.status(200).json({
        success: true,
        message: "Room Fetched Successfully",
        data: result
    })
    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong.',
            data: null
        })
    }
}
const getSingleRoom = async(req : Request, res : Response)=> {
    try {
    const {id} = req.params;
    const result = await ProductServices.getSingleRoomFromDB(Number(id));
    res.status(200).json({
        success: true,
        message: "Room Fetched Successfully",
        data: result
    })
    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong.',
            data: null
        })
    }
}

const deleteRoom = async(req : Request, res : Response)=> {
    try {
    const {id} = req.params;
    const result = await ProductServices.deleteRoomFromDB(Number(id));
    res.status(200).json({
        success: true,
        message: "Room Successfully Deleted",
        data: result
    })
    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong.',
            data: null
        })
    }
}

const updateRoom = async(req : Request, res : Response)=> {
    try {
    const {id} = req.params;
    const updateData = req.body;
    const result = await ProductServices.updateRoomFromDB(Number(id),updateData);
    res.status(200).json({
        success: true,
        message: "Successfully updated Deleted",
        data: result
    })
    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong.',
            data: null
        })
    }
}


export const ProductControllers = {
    addRoom,
    getAllRooms,
    getSingleRoom,
    deleteRoom,
    searchAvailableRooms,
    updateRoom,
    searchSingleAvailableRooms
}