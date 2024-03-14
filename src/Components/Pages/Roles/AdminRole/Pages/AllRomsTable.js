import React, { useState } from "react";
import swal from "sweetalert";
import UpdateSingleRoom from "../Modals/updateSingleRoom";

const AllRoomsTable = ({ room, index, setAllRooms }) => {
  const { img, roomId, price, name } = room;
  const imageStorageKey = "52a7c30a95d000395b196c985adb3c83";
  
  const [isOpen, setIsOpen] = useState(false);

  let imgUp;
  

  // update event from updateSingleRoom.js modal
  const onUpdate = async (room) => {
    const { roomId, name, price, imageFormData } = room;
    // check if imageFormData is not empty
    if (imageFormData.size > 0) {
      const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
      const res = await fetch(url, {
        method: "POST",
        body: imageFormData,
      });
      const data = await res.json();
      if (data.success) {
        imgUp = data.data.url; // hosted image link;
      }
    }

    if (!roomId || !name || !price) {
      alert("You must enter room id, name and price uploading image is optional");
      return;
    }
    const updateData = {
      roomId: roomId,
      name: name,
      price: price,
    };
    if(imgUp != undefined){
      updateData.img = imgUp;
    }

    await fetch(
      `${process.env.REACT_APP_API_SERVER_URL}/products/rooms/${roomId}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
      )
      .then((res) => res.json())
      .then((data) => {
        swal({
          title: "Room Updated Successful!",
          text: "Updated room successfully!",
          icon: "success",
          button: "Ok",
        });
      });

      //this api is called for refresh updated
    fetch(
      `${process.env.REACT_APP_API_SERVER_URL}/products/rooms`
      )
      .then((res) => res.json())
      .then((data) => {
        setAllRooms(data?.data);
        closeUpdateModal();
      })
    };

  // show update room modal
  const showUpdateModal = () => {
    setIsOpen(true);
  };

  const closeUpdateModal = () => {
    setIsOpen(false);
  };
  

  const handleDeleteOrder = async (roomId) => {
    // alert(`Clicked on ${roomId}`)
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const url = `${process.env.REACT_APP_API_SERVER_URL}/products/rooms/${roomId}`;
        await fetch(url, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
        swal("The Room is Deleted", {
          icon: "success",
        });

        //this second fetched is use to refresh delete data
        await fetch(
          `${process.env.REACT_APP_API_SERVER_URL}/products/rooms`
        )
          .then((res) => res.json())
          .then((data) => setAllRooms(data?.data));
      } else {
        swal("Oder not deleted. You canceled it!");
      }
    });
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <img className="w-28 h-20 rounded " src={img} alt="" />
      </td>
      <td>{name}</td>
      <td>{price}TK</td>
      <td>
        <button
          onClick={() => {
            handleDeleteOrder(roomId);
          }}
          className="btn btn-error btn-sm btn-outline hover:text-base-200"
        >
          Delete Room
        </button>
        <button
          onClick={() => showUpdateModal()}
          className="btn btn-success btn-sm btn-outline ml-2"
        >
          Update Room
        </button>
      </td>

      <UpdateSingleRoom isOpen={isOpen} onClose={closeUpdateModal} onUpdate={onUpdate} room={room} />
    </tr>
  );
};

export default AllRoomsTable;
