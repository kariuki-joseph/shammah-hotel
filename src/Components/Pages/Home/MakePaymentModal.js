import React, { useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../../axios";
import mPesaLogo from "../../assets/mpesa-logo.jpg";

const MakePaymentModal = ({phone = "", totalAmount="", orderItems, onSuccess, onError, onBack }) => {
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [amount, setAmount] = useState(totalAmount);

  const handlePayment = async () => {
    const apiUrl = "/mpesa/stkpush";
    const apiPayload = {
      phone: phoneNumber,
      amount,
    };

    try {
      const response = await axiosInstance.post(apiUrl, apiPayload);
      Swal.fire({
        title: "Payment Successful",
        text: "Your payment is successful. Check phone for confirmation!",
        icon: "success",
        button: "Ok",
      }).then(() => {
        onSuccess();
      });
    } catch (error) {
      Swal.fire({
        title: "Payment Failed",
        text: "Your payment is not successful. Try again!",
        icon: "error",
        button: "Ok",
      }).then(() => {
        onError();
      });
      console.error(error);
    }
  };

  return (
    <div class="font-[sans-serif] bg-white p-4 w-1/2 m-auto">
      <div class="lg:max-w-7xl max-w-xl mx-auto">
        <div class="grid lg:grid-cols-3 gap-10">
          <div class="lg:col-span-2 max-lg:order-1">
            <form class="mt-16 max-w-lg">
              <h2 class="text-3xl font-extrabold text-[#333] text-center">
                M-Pesa Checkout
              </h2>
              <div class="grid gap-4 sm:grid-cols-3 mt-2">
                <div></div>
                <div class="flex items-centebg-slate-500">
                  <img src={mPesaLogo} class="w-25" alt="M-Pesa Logo" />
                </div>
                <div></div>
              </div>
              <div class="grid gap-6 mt-8">
                <input
                  type="text"
                  placeholder="M-Pesa Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                />
                <div class="flex bg-white border-b-2 focus-within:border-[#333] overflow-hidden">
                  <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    class="px-4 py-3.5 bg-white text-[#333] w-full text-sm outline-none"
                  />
                </div>
              </div>
              <div class="flex flex-wrap gap-4 mt-8">
                <button
                  type="button"
                  onClick={onBack}
                  class="min-w-[150px] px-6 py-3.5 text-sm bg-gray-100 text-[#333] rounded-md hover:bg-gray-200"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handlePayment}
                  class="min-w-[150px] px-6 py-3.5 text-sm bg-[#000080] text-white rounded-md hover:bg-[#111]"
                >
                  Confirm payment
                </button>
              </div>
            </form>
          </div>
          <div class="bg-gray-100 px-6 py-8 rounded-md">
            <h4 class="text-2xl font-extrabold text-[#333]">Ksh. {totalAmount}</h4>
            <ul class="text-[#333] mt-10 space-y-6">
              {orderItems.map((item) => (
                <li class="flex flex-wrap gap-4 text-sm">
                  {item.name}{" "} <span class="ml-auto font-bold">Ksh. {item.price}</span>
                </li>
              ))}
              <li class="flex flex-wrap gap-4 text-base font-bold border-t-2 pt-4">
                Total <span class="ml-auto">Ksh. {totalAmount}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePaymentModal;
