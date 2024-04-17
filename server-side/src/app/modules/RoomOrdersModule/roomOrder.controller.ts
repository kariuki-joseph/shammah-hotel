import { Request, Response } from "express";
import { RoomOrderServices } from "./roomOrder.service";

const orderRoom = async(req : Request, res : Response)=> {
    try {
    const orderRoomData = req.body;
    const result = await RoomOrderServices.orderRoomToDB(orderRoomData);
    res.status(200).json({
        success: true,
        message: "Room Successfully Ordered",
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

const getAllRoomOrders = async(req : Request, res : Response)=> {
    try {
    const result = await RoomOrderServices.getAllOrdersRoomFromDB();
    res.status(200).json({
        success: true,
        message: "Fetched all room order data",
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
const getRoomOrdersByEmail = async(req : Request, res : Response)=> {
    try {
    const {email} = req.params;
    const result = await RoomOrderServices.getOrderRoomByEmailFromDB(email);
    res.status(200).json({
        success: true,
        message: "Fetched users room orders",
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

const deleteRoomOrder = async(req : Request, res : Response)=> {
    try {
    const {id} = req.params;
    const result = await RoomOrderServices.deleteOrderRoomFromDB(id);
    res.status(200).json({
        success: true,
        message: "Room order successfully deleted",
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

export const RoomOrderControllers = {
    orderRoom,
    getAllRoomOrders,
    getRoomOrdersByEmail,
    deleteRoomOrder
}