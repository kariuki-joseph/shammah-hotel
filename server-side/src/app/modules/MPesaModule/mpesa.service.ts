import axios from "axios";

const getTimestamp = () => {
    const dateString = new Date().toLocaleDateString("en-us", {
      timeZone: "Africa/Nairobi",
    });
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const timestamp = `${year}${month}${day}${hour}${minutes}${seconds}`;
    return timestamp;
  };

const  generateMpesaAccessToken = async () => {
    const url =
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    const token = Buffer.from(
      `${process.env.DARAJA_CONSUMER_KEY}:${process.env.DARAJA_CONSUMER_SECRET}`
    ).toString("base64");
  
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
  
    if (!response.data || !response.data.access_token) {
      throw new Error("Could not get access token");
    }
  
    return response.data.access_token;
  };

export const stkPush = async (phone:String, amount:Number) => {
  phone = `254${phone.substring(phone.length - 9)}`;
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  const accessToken = await generateMpesaAccessToken();
  const auth = `Bearer ${accessToken}`;
  const timestamp = getTimestamp();
  const password = Buffer.from(
    `${process.env.DARAJA_BUSINESS_SHORTCODE}${process.env.DARAJA_PASS_KEY}${timestamp}`
  ).toString("base64");
  const callBackURL = "https://example.com";

  const response = await axios.post(
    url,
    {
      BusinessShortCode: process.env.DARAJA_BUSINESS_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.DARAJA_BUSINESS_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: callBackURL,
      AccountReference: "Shammah Hotel",
      TransactionDesc: "Shammah Hotel Payments",
    },
    {
      headers: {
        Authorization: auth,
      },
    }
  );

  const data = response.data;
  return data;
};

module.exports = {
stkPush,
};