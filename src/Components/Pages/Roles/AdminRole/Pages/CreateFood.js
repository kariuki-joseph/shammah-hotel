import React from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdFoodBank } from "react-icons/md";
import Swal from "sweetalert2";
import { uploadImage } from "../../../../Firebase/firebaseService";
import axios from "../../../../../axios";

const CreateFood = () => {
  const handleAddProduct = async (event) => {
    event.preventDefault();
    const foodId = `${Math.floor(Math.random() * 1000000) + 1}`;
    const name = event.target.name.value;
    const price = event.target.price.value;
    const quantity = event.target.quantity.value;
    const image = document.querySelector("#img"); // taking image from input

    const imageUrl = await uploadImage(image.files[0]);

    const food = {
      foodId: foodId,
      name: name,
      price: price,
      quantity: quantity,
      imageUrl: imageUrl,
    };

    //send docotr info to my database
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER_URL}/foods`,
        food
      );

      const data = response.data;

      if (data?.data?.foodId) {
        Swal.fire(
          "Food Successfully Added!",
          "Food Successfully added to Database",
          "success"
        );
        event.target.reset(); //clear form
      } else {
        Swal.fire(
          "Failed to Add Food!",
          "Failed to add food to Database",
          "error"
        );
      }
    } catch (error) {
      Swal.fire(
        "Failed to Add Food!",
        "Failed to add food to Database",
        "error"
      );
      console.error("Error:", error);
    }
  };
  // console.log(da
  return (
    <div className="bg-[#F1F5F9] bg-gradient-to-r from-stone-100 to-blue-50 calc-height">
      <p className=" border pl-12 text-xl text-black mb-8 font-bold bg-[#F8FAFC] h-14 flex items-center">
        <MdFoodBank className="ml-5 mr-3 w-6 h-6" />
        Add New Food
      </p>

      <div>
        <h2 className="text-center text-3xl font-bold m-8 text-blue-500 underline">
          Add New Food
        </h2>
        <div className="flex justify-center">
          <form
            onSubmit={handleAddProduct}
            className="shadow-2xl pl-12 pr-12 pt-6 pb-6 mt-4 mb-12 w-11/12 xl:w-[600px]"
          >
            <label htmlFor="price">Food Name</label> <br />
            <input
              type="text"
              name="name"
              placeholder="Enter Food Name"
              className="input input-bordered w-full max-w-lg mb-3"
            />
            <br />
            <label htmlFor="minOrder">Price: </label> <br />
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              className="input input-bordered w-full max-w-lg mb-3"
            />
            <label htmlFor="price">Quantity(Units)</label> <br />
            <input
              type="number"
              name="quantity"
              placeholder="Enter food quantity in units e.g. 1,2,3"
              className="input input-bordered w-full max-w-lg mb-3 mt-1"
            />
            <br />
            <label htmlFor="image">Food Cover Image:</label> <br />
            <input
              className="input w-full max-w-xs mb-3 mt-1"
              name="img"
              id="img"
              type="file"
            />
            <br />
            <input
              className="btn btn-primary text-white w-48 block mx-auto"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFood;
