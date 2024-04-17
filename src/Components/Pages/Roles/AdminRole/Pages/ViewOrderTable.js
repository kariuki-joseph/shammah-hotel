import React from "react";
import Swal from "sweetalert2";

const ViewOrderTable = ({ order, index, setAllOrderData }) => {
  const { imageUrl, roomId, orderId, email, checkIn, checkOut, price } = order;

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
        const url = `${process.env.REACT_APP_API_SERVER_URL}/rooms/orders/${orderId}`;
        await fetch(url, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
        Swal.fire("The order is Deleted", {
          icon: "success",
        });

        //this second fetched is use to refresh delete data
        await fetch(
          `${process.env.REACT_APP_API_SERVER_URL}/rooms/orders`
        )
          .then((res) => res.json())
          .then((data) => setAllOrderData(data?.data));
      } else {
        Swal.fire("Oder not deleted. You canceled it!");
      }
    });
  };
  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <img className="w-28 h-20 rounded " src={imageUrl} alt="" />
      </td>
      <td>{roomId}</td>
      <td>{orderId}</td>
      <td>{email}</td>
      <td>{checkIn}</td>
      <td>{checkOut}</td>
      <td>Ksh. {price}</td>
      <td>
        <button
          onClick={() => {
            handleDeleteOrder(orderId);
          }}
          className="btn btn-error text-base-200 btn-sm btn-outline"
        >
          Delete Order
        </button>
      </td>
    </tr>
  );
};

export default ViewOrderTable;
