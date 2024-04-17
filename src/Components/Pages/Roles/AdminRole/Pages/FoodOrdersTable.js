import React from "react";
import Swal from "sweetalert2";

const FoodOrdersTable = ({ order, index, setAllOrderData }) => {
  const { imageUrl, foodId, orderId, email, name, price } = order;

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
        const url = `${process.env.REACT_APP_API_SERVER_URL}/order-food/${orderId}`;
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
          `${process.env.REACT_APP_API_SERVER_URL}/order-food/all-foods-orders`
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
        <img className="w-10 xl:w-32 xl:h-20 rounded " src={imageUrl} alt="" />
      </td>
      <td>{foodId}</td>
      <td>{orderId}</td>
      <td>{email}</td>
      <td>{name}</td>
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

export default FoodOrdersTable;
