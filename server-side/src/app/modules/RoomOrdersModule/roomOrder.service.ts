
import { generateRandomOrderNumber } from "../../../utlis/randomOrderNumber";
import transporter from "../EmailModule/sendMail"
import { TRoomOrder } from "./roomOrder.interface"
import { RoomOrder } from "./roomOrder.model"

const orderRoomToDB = async(orderRoomData : TRoomOrder) => {
    orderRoomData.orderId = generateRandomOrderNumber();
    
    try {
        const result = await RoomOrder.create(orderRoomData);
        console.log("Room order created successfully");
        // console.log(result.email)
            // Nodemailer setup
        await transporter.sendMail({
            from: '"Shammah Hotel" <kariuki.joseph121@gmail.com>',
            to: `${result?.email}`,
            subject: 'Booking Room Confirmed',
            text: "Your room booking is successful. Thank for ordering. @Shammah Hotel"
        });

        return result;

        } catch (error) {
            console.log("Error sending email: ",error)
            return error;
        }
}

const getAllOrdersRoomFromDB = async() => {
    const result = await RoomOrder.find();
    return result;
}

const getOrderRoomByEmailFromDB = async(email: string) => {
    const result = await RoomOrder.find({email: email});
    return result;
}

const deleteOrderRoomFromDB = async(id: string) => {
    const result = await RoomOrder.deleteOne({orderId: id});
    return result;
}

export const RoomOrderServices = {
    orderRoomToDB,
    getAllOrdersRoomFromDB,
    getOrderRoomByEmailFromDB,
    deleteOrderRoomFromDB
}