import { NextFunction, Request, Response } from "express";
import {stkPush} from "./mpesa.service";

export const sendStkPush = async (req:Request, res:Response, next: NextFunction) => {
  const { phone, amount } = req.body;
  
  if(phone == undefined){
    res.status(401).json({
        success: false,
        message: "Please enter phone number"
    });
    return;
  }

  if(amount == undefined){
    res.status(401).json({
        succes: false,
        message: "Please enter amount",
    });
    return;
  }
  try {
    await stkPush(phone, amount);

    return res.status(200).json({
      success: true,
      message:
        "Mpesa request sent successfully. Please check on your phone to confirm the payment",
    });
  } catch (error) {
    next(error);
  }
};

const confirmPayment = async (req: Request, res: Response, next:NextFunction) => {};
module.exports = {
  sendStkPush,
  confirmPayment,
};