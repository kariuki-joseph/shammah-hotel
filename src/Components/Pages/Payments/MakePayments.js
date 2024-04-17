import React, { useState } from "react";
import axiosInstance from "../../../axios";
import mPesaLogo from "../../assets/mpesa-logo.jpg";

const MakePayment = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    phoneNumber: "",
    amount: "",
  });

  const handleInputChange = (event) => {
    setPaymentDetails({
      ...paymentDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/mpesa/payment",
        paymentDetails
      );
      console.log(response.data);
    } catch (error) {
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
                  class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                />
                <div class="flex bg-white border-b-2 focus-within:border-[#333] overflow-hidden">
                  <input
                    type="number"
                    placeholder="Amount"
                    class="px-4 py-3.5 bg-white text-[#333] w-full text-sm outline-none"
                  />
                </div>
              </div>
              <div class="flex flex-wrap gap-4 mt-8">
                <button
                  type="button"
                  class="min-w-[150px] px-6 py-3.5 text-sm bg-gray-100 text-[#333] rounded-md hover:bg-gray-200"
                >
                  Back
                </button>
                <button
                  type="button"
                  class="min-w-[150px] px-6 py-3.5 text-sm bg-[#000080] text-white rounded-md hover:bg-[#111]"
                >
                  Confirm payment
                </button>
              </div>
            </form>
          </div>
          <div class="bg-gray-100 px-6 py-8 rounded-md">
            <h4 class="text-2xl font-extrabold text-[#333]">Ksh. 750</h4>
            <ul class="text-[#333] mt-10 space-y-6">
              
              <li class="flex flex-wrap gap-4 text-base">
                VelvetGlide Boots <span class="ml-auto font-bold">$300.00</span>
              </li>
              <li class="flex flex-wrap gap-4 text-base">
                Tax <span class="ml-auto font-bold">$100.00</span>
              </li>
              <li class="flex flex-wrap gap-4 text-base font-bold border-t-2 pt-4">
                Total <span class="ml-auto">Ksh. 750.00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MakePayment;
