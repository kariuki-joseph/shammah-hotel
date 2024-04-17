import React, { useEffect, useState } from "react";
import SingleFood from "./SingleFood";
import axiosInstance from "../../../../axios";

const Food = () => {
  const [foods, setFoods] = useState([]);
  console.log("foods: ", foods);

  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await axiosInstance.get('/foods');
      setFoods(response.data?.data);
      } catch (error) {
      console.error('Failed to fetch foods:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-ull xl:w-[1100px] mx-auto h-screen">
      <div>
        <p className="uppercase text-[#000080] text-xl xl:text-2xl mt-8 font-bold mb-2">
          Available Foods
        </p>
      </div>

      <div className="grid grid-cols-1 place-content-center place-items-center xl:grid-cols-3 gap-6">
        {foods?.map((food) => (
          <SingleFood key={food?.foodId} food={food}></SingleFood>
        ))}
      </div>
    </div>
  );
};

export default Food;
