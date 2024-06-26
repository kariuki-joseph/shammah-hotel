import React, { useEffect, useState } from "react";
import FoodOrdersTable from "./FoodOrdersTable";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdFastfood } from "react-icons/md";
import axiosInstance from "../../../../../axios";

const FoodOrders = () => {
  const [allOrderData, setAllOrderData] = useState([]);
  // console.log(orderData)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/foods/orders");
      setAllOrderData(response.data?.data);
    };

    fetchData();
  }, []);
  return (
    <div className="bg-[#F1F5F9] bg-gradient-to-r from-stone-100 to-blue-50 calc-height">
      <p className=" border pl-12 text-xl text-black mb-8 font-bold bg-[#F8FAFC] h-14 flex items-center">
        <MdFastfood className="ml-5 mr-3 w-6 h-6" />
        All Food Orders
      </p>
      <div className="overflow-x-auto">
        <table className="table w-full xl:w-11/12 mx-auto">
          {/* head */}
          <thead className="bg-base-300">
            <tr className="">
              <th></th>
              <th>Image</th>
              <th>Food ID</th>
              <th>Order ID</th>
              <th>Email</th>
              <th>name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allOrderData.map((order, index) => (
              <FoodOrdersTable
                key={order?.roomId}
                order={order}
                index={index}
                setAllOrderData={setAllOrderData}
              ></FoodOrdersTable>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodOrders;
