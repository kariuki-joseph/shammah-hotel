import React, { useEffect, useState } from "react";

const UpdateSingleFood = ({ food, isOpen = false, onClose, onUpdate }) => {
  const { foodId, price, name, quantity } = food;
  const [foodIdUpdate, setFoodIdUpdate] = useState("");
  const [nameUpdate, setNameUpdate] = useState("");
  const [quantityUpdate, setQuantityUpdate] = useState("");
  const [priceUpdate, setPriceUpdate] = useState("");

  useEffect(() => {
    setFoodIdUpdate(foodId);
    setNameUpdate(name);
    setQuantityUpdate(quantity);
    setPriceUpdate(price);
  }, [food]);

  const handleFoodIdUpdate = (event) => setFoodIdUpdate(event.target.value);
  const handleNameUpdate = (event) => setNameUpdate(event.target.value);
  const handlePriceUpdate = (event) => setPriceUpdate(event.target.value);
  const handleQuantityUpdate = (event) => setQuantityUpdate(event.target.value);

  const handleUpdateFood = (event) => {
    event.preventDefault();
    // get image and append to formdata
    const image = document.querySelector("#img"); // taking image from input

    onUpdate({
      foodId: foodIdUpdate,
      name: nameUpdate,
      price: priceUpdate,
      quantiry: quantityUpdate,
      imageFile: image.files[0],
    });
  };

  return (
    <dialog id="my_modal_2" className="modal" open={isOpen}>
      <div className="modal-box w-full mx-auto">
        <p className="text-2xl font-bold text-center">
          Update Food Information
        </p>
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
        >
          X
        </button>
        <form method="dialog" onSubmit={handleUpdateFood}>
          <div className=" flex justify-center mt-4">
            <div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                name="foodId"
                value={foodIdUpdate}
                onChange={handleFoodIdUpdate}
              />
            </div>
          </div>
          <div className=" flex justify-center mt-4">
            <div>
              <p>Food Name: </p>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                name="name"
                value={nameUpdate}
                onChange={handleNameUpdate}
                placeholder="Enter food name"
              />
            </div>
          </div>
          <div className=" flex justify-center mt-4">
            <div>
              <p>Food Price: </p>
              <input
                className="input input-bordered w-full max-w-md"
                type="number"
                name="price"
                value={priceUpdate}
                onChange={handlePriceUpdate}
                placeholder="Enter price"
              />
            </div>
          </div>
          <div className=" flex justify-center mt-4">
            <div>
              <p>New Quantity(Units): </p>
              <input
                className="input input-bordered w-full max-w-md"
                type="number"
                name="quantiry"
                value={quantityUpdate}
                onChange={handleQuantityUpdate}
                placeholder="Enter number of units"
              />
            </div>
          </div>
          <div className=" flex justify-center mt-4 w-[250px] mx-auto">
            <div>
              <p>Update Image (Optional) </p>
              <input
                className="input input-bordered w-full max-w-sm outline-none border-none"
                name="img"
                id="img"
                type="file"
              />
            </div>
          </div>

          <div className="w-full flex justify-center mt-4">
            <input
              className="btn btn-success text-white"
              type="submit"
              value="Update"
            />
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateSingleFood;
