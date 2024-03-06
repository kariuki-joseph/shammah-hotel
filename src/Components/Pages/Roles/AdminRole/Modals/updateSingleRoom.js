import React, { useEffect, useState } from "react";

const UpdateSingleRoom = ({ room, isOpen=false, onClose, onUpdate}) => {
    const {roomId, name, price} = room;

    const [roomIdUpdate, setRoomIdUpdate] = useState("");
    const [nameUpdate, setNameUpdate]  = useState("");
    const [priceUpdate, setPriceUpdate] = useState("");
    const [imageFormData, setImageFormData] = useState(new FormData());

    useEffect(() => {
        setRoomIdUpdate(roomId);
        setNameUpdate(name);
        setPriceUpdate(price);
    }, [room]);

    const handleNameUpdate = (event) => setNameUpdate(event.target.value);
    const handlePriceUpdate = (event) => setPriceUpdate(event.target.value);
    
    const handleImageUpdate = (event) => {
        // get the image data from the event
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("image", image);
        // set the image data to the state
        setImageFormData(formData);
    }

    const handleUpdateRoom = (event) => { 
        event.preventDefault();
        onUpdate({roomId: roomIdUpdate, name: nameUpdate, price: priceUpdate, imageFormData});
    };

    return (
        <dialog id="my_modal_2" className="modal" open={isOpen}>
        <div className="modal-box w-full mx-auto">
          <p className="text-2xl font-bold text-center">
            Update Room Information
          </p>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">
              X
          </button>
          <form method="dialog" onSubmit={handleUpdateRoom}>
            <div className=" flex justify-center mt-4">
              <div>
                <input
                  type="hidden"
                  className="input input-bordered w-full max-w-xs"
                  placeholder="Enter room id"
                  name="roomId"
                  value={roomIdUpdate}
                  onChange={handlePriceUpdate}
                />
              </div>
            </div>
            <div className=" flex justify-center mt-4">
              <div>
                <p>Room Name: </p>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  placeholder="Enter room name"
                  name="name"
                  value={nameUpdate}
                  onChange={handleNameUpdate}
                />
              </div>
            </div>
            <div className=" flex justify-center mt-4">
              <div>
                <p>Room Price: </p>
                <input
                  className="input input-bordered w-full max-w-xs"
                  type="number"
                  placeholder="Enter room price"
                  value={priceUpdate}
                  onChange={handlePriceUpdate}
                  name="price"
                />
              </div>
            </div>
            <div className=" flex justify-center mt-4 w-[250px] mx-auto">
              <div>
                <p>Update Image </p>
                <input
                  className="input input-bordered w-full max-w-sm outline-none border-none"
                  name="img"
                  id="img"
                  type="file"
                  onChange={handleImageUpdate}
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
    )
}

export default UpdateSingleRoom;