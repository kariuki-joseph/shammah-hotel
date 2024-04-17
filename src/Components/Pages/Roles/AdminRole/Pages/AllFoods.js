import React, { useEffect, useState } from "react";
import AllFoodsTable from "./AllFoodsTable";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoFastFoodSharp } from "react-icons/io5";
import axiosInstance from "../../../../../axios";

const AllFoods = () => {
  const [allFoods, setAllFoods] = useState([]);
  // console.log(orderData)

  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await axiosInstance.get('/foods');
      setAllFoods(response.data?.data);
      } catch (error) {
      console.error('Failed to fetch foods:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="bg-[#F1F5F9] bg-gradient-to-r from-stone-100 to-blue-50 calc-height">
      <p className=" border pl-12 text-xl text-black mb-8 font-bold bg-[#F8FAFC] h-14 flex items-center">
        <IoFastFoodSharp className="ml-5 mr-3 w-6 h-6" />
        All Foods
      </p>

      <div className="overflow-x-auto">
        <table className="table w-full xl:w-3/4 mx-auto">
          {/* head */}
          <thead className="bg-base-300">
            <tr className="">
              <th></th>
              <th>Cover Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Remaining Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allFoods.map((food, index) => (
              <AllFoodsTable
                key={food?.foodId}
                food={food}
                index={index}
                setAllFoods={setAllFoods}
              ></AllFoodsTable>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllFoods;
