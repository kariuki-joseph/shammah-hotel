/* eslint-disable no-restricted-globals */
import { useEffect, useState } from "react";
import { ImPriceTags } from "react-icons/im";
import Swal from "sweetalert2";
import UpdateSingleFood from "../Modals/updateSingleFood";
import { uploadImage } from "../../../../Firebase/firebaseService";
import axiosInstance from "../../../../../axios";
import Toast from "../../../../../toast";

const AllFoodsTable = ({ food, index, setAllFoods, key }) => {
  const { foodId, name, price, quantity, imageUrl } = food;
  const [isOpen, setIsOpen] = useState(false);
  // fetch foods from the database
  const fetchFoods = async () => {
    try {
      const response = await axiosInstance.get(`/foods`);
      setAllFoods(response.data?.data);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Could not get all foods. Please try again later",
      });
    }
  };

  const onUpdate = async (food) => {
    const { foodId, name, price, quantity, imageFile } = food;
    let imageUrl;
    // upload image if it has data
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile);
    }

    if (!foodId || !name || !price) {
      Toast.fire({
        icon: "error",
        title: "Please fill all the fields",
      });
      return;
    }

    const data = {
      foodId: foodId,
      name: name,
      price: price,
      quantity: quantity,
    };

    if (imageUrl != undefined) {
      data.imageUrl = imageUrl;
    }

    try {
      const response = await axiosInstance.put(`/foods/${foodId}`, data);
      
      if (response.data) {
        Swal.fire({
          title: "Food Updated Successful!",
          text: "Updated Food successfully!",
          icon: "success",
          button: "Ok",
        });
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Failed to update Food",
      });

      console.error(error);
    }

    //this api is called for refresh updated
    await fetchFoods();
  };

  const showUpdateModal = () => {
    setIsOpen(true);
  };
  const closeUpdateModal = () => {
    setIsOpen(false);
  };

  const handleDeleteOrder = async (foodId) => {
    // alert(`Clicked on ${roomId}`)
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axiosInstance.delete(`/foods/${foodId}`);
          Swal.fire("The Food is Deleted", {
            icon: "success",
          });

          //this second fetched is use to refresh delete data
          await fetchFoods();
        } catch (error) {
          console.error(error);
        }
      } else {
        Swal.fire("Oder not deleted. You canceled it!");
      }
    });
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <img className="w-10 xl:w-32 xl:h-20 rounded " src={imageUrl} alt="" />
      </td>
      <td>{name}</td>
      <td>Ksh. {price}</td>
      <td>{quantity}</td>
      <td className="">
        <button
          onClick={() => {
            handleDeleteOrder(foodId);
          }}
          className="btn btn-error btn-sm btn-outline hover:text-base-200"
        >
          Delete
        </button>
        <button
          onClick={() => showUpdateModal()}
          className="btn btn-success btn-sm btn-outline ml-2"
        >
          Update
        </button>
      </td>

      <UpdateSingleFood
        onUpdate={onUpdate}
        food={food}
        isOpen={isOpen}
        onClose={closeUpdateModal}
      />
    </tr>
  );
};

export default AllFoodsTable;
