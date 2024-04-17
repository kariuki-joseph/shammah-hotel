import { generateRandomOrderNumber } from "../../../utlis/randomOrderNumber";
import transporter from "../EmailModule/sendMail";
import { TFoodOrder } from "./foodOrder.interface";
import { FoodOrder } from "./foodOrder.model";

const orderFoodToDB = async(orderFoodData : TFoodOrder) => {
    orderFoodData.orderId = generateRandomOrderNumber();
    const result = await FoodOrder.create(orderFoodData);
    if(result){
        // Nodemailer setup
        const info = await transporter.sendMail({
          from: '"Shammah Hotel" <kariuki.joseph121@gmail.com>',
          to: `${result?.email}`,
          subject: 'Food Order Confirmed',
          text: "Your food order is successful. Thank for ordering. @Team Hotel Redisons"
        });
  
        console.log('Message sent: %s', info.messageId);
       
    }
    return result;
}

const getAllOrdersFoodFromDB = async() => {
    const result = await FoodOrder.find();
    return result;
}

const getOrderFoodByEmailFromDB = async(email: string) => {
    const result = await FoodOrder.find({email: email});
    return result;
}

const deleteOrderFoodFromDB = async(id: string) => {
    const result = await FoodOrder.deleteOne({orderId: id});
    return result;
}

export const FoodOrderServices = {
    orderFoodToDB,
    getAllOrdersFoodFromDB,
    getOrderFoodByEmailFromDB,
    deleteOrderFoodFromDB
}