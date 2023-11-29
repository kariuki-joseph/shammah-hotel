import { TFoodOrder } from "./foodOrder.interface";
import { OrderFood } from "./foodOrder.model";

const orderFoodToDB = async(orderFoodData : TFoodOrder) => {
    const result = await OrderFood.create(orderFoodData);
    // if(result){
    //     // Nodemailer setup
    //     const info = await transporter.sendMail({
    //       from: '"Uttam Kumar Saha" <mail@uttamsaha.com>',
    //       to: `${result.email}`,
    //       subject: 'Booking Room Confirmed',
    //       html: `<p>Hello Sir, This is to inform you that your room booking is successful. Here is your order summary attached below.Thank you for being with us see you soon.. Team Hotel Redisons.
    //        Email: ${result.email}, <br> Room ID: <b>${result.roomId}</b> <br>
    //         Room Name: <b>${result.name}</b> <br>
    //         Start Date: <b>${result.startDate}</b> <br>
    //         End Date: <b>${result.endDate}</b> <br>
    //         Total Price: <b>${result.price}</b> <br> </p>
    //       `,
    //     });
  
    //     console.log('Message sent: %s', info.messageId);
       
    // }
    // console.log("emaiL: ",result.email)
    return result;
}

const getAllOrdersFoodFromDB = async() => {
    const result = await OrderFood.find();
    return result;
}

const getOrderFoodByEmailFromDB = async(email: string) => {
    const result = await OrderFood.find({email: email});
    return result;
}

const deleteOrderFoodFromDB = async(id: number) => {
    const result = await OrderFood.deleteOne({foodId: id});
    return result;
}

export const FoodOrderServices = {
    orderFoodToDB,
    getAllOrdersFoodFromDB,
    getOrderFoodByEmailFromDB,
    deleteOrderFoodFromDB
}