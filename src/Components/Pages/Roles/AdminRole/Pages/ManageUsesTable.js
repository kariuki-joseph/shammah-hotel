import React from "react";
import Swal from "sweetalert2";

const ManageUsersTable = ({ user, index, setUsers }) => {
  const { _id, name, email, role } = user;

  const handleDeleteOrder = async (roomId) => {
    // alert(`Clicked on ${roomId}`)
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `${process.env.REACT_APP_API_SERVER_URL}/orders/delete-room-order/${roomId}`;
        fetch(url, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
        Swal.fire("The order is Deleted", {
          icon: "success",
        });

        //this second fetched is use to refresh delete data
        fetch(
          `${process.env.REACT_APP_API_SERVER_URL}/orders/room-orders`
        )
          .then((res) => res.json())
          .then((data) => setUsers(data?.data));
      } else {
        Swal.fire("Oder not deleted. You canceled it!");
      }
    });
  };
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{_id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
    </tr>
  );
};

export default ManageUsersTable;
