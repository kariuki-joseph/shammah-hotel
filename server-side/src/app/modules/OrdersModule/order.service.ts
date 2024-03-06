
import { generateRandomOrderNumber } from "../../../utlis/randomOrderNumber";
import transporter from "../EmailModule/sendMail"
import { TOrderRoom } from "./order.interface"
import { OrderRoom } from "./order.model"

const orderRoomToDB = async(orderRoomData : TOrderRoom) => {
    orderRoomData.orderId = generateRandomOrderNumber();
    
    try {
        const result = await OrderRoom.create(orderRoomData);
        console.log("Room created successfully. Sending email now...");
        // console.log(result.email)
            // Nodemailer setup
        await transporter.sendMail({
            from: '"Shammah Hotel" <kariuki.joseph121@gmail.com>',
            to: `${result?.email}`,
            subject: 'Booking Room Confirmed',
            text: "Your room booking is successful. Thank for ordering. @Team Hotel Redisons"
        });

        return result;

        } catch (error) {
            console.log("Error sending email: ",error)
            return error;
        }
}

const getAllOrdersRoomFromDB = async() => {
    const result = await OrderRoom.find();
    return result;
}

const getOrderRoomByEmailFromDB = async(email: string) => {
    const result = await OrderRoom.find({email: email});
    return result;
}

const deleteOrderRoomFromDB = async(id: string) => {
    const result = await OrderRoom.deleteOne({orderId: id});
    return result;
}

export const OrderServices = {
    orderRoomToDB,
    getAllOrdersRoomFromDB,
    getOrderRoomByEmailFromDB,
    deleteOrderRoomFromDB
}