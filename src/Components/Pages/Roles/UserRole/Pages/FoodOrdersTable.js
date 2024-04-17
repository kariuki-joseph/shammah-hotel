import React, { useEffect } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../../../../axios";

const FoodOrdersTable = ({ order, index, orderData, user, setOrderData }) => {
  const { imageUrl, orderId, name, price } = order;

  const handleDeleteOrder = async (orderId) => {
    // alert(`Clicked on ${roomId}`)
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const response = await axiosInstance.delete(`/foods/orders/${orderId}`);
        console.log(response.data);

        Swal.fire("Your order Deleted", {
          icon: "success",
        });

        //this second fetched is use to refresh delete data
        try {
          const response = await axiosInstance.get(
            `/foods/orders/${user?.email}`
          );
          setOrderData(response.data?.data);
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
        <img className="w-28 xl:h-20 rounded " src={imageUrl} alt="" />
      </td>
      <td>{orderId}</td>
      <td>{name}</td>
      <td>{price}</td>
      <td>
        <button
          onClick={() => {
            handleDeleteOrder(orderId);
          }}
          className="btn btn-error text-base-200 btn-outline btn-sm"
        >
          Delete Order
        </button>
      </td>
    </tr>
  );
};

export default FoodOrdersTable;
