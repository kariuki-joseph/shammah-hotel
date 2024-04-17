import React, { useEffect } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../../../../axios";

const GetOrders = ({ order, index, orderData, user, setOrderData }) => {
  const { imageUrl, roomId, orderId, name, checkIn, checkOut, price } = order;

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
        // const url = `${process.env.REACT_APP_API_SERVER_URL}/orders/delete-room-order/${roomId}`;
        const response = await axiosInstance.delete(`/rooms/orders/${orderId}`);

        if (response.data) {
          Swal.fire("Your order Deleted", {
            icon: "success",
          });
        }

        //this second fetched is use to refresh delete data
        const response2 = await axiosInstance.get(`/rooms/orders/${user?.email}`);
        setOrderData(response2.data?.data);
        
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
      <td>{roomId}</td>
      <td>{orderId}</td>
      <td>{name}</td>
      <td>{checkIn}</td>
      <td>{checkOut}</td>
      <td>Ksh. {price}</td>
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

export default GetOrders;
