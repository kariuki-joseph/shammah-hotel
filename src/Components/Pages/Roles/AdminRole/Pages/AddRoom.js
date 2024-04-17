import React, { useState } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import Swal from "sweetalert2";
import { BiSolidHomeSmile } from "react-icons/bi";
import Select from "react-select";
import { uploadImage, uploadVideo } from "../../../../Firebase/firebaseService";
import axiosInstance from "../../../../../axios";

const amenitiesOptions = [
  { value: "wifi", label: "WiFi" },
  { value: "hotShower", label: "Hot Shower" },
  { value: "airCondition", label: "Air Condition" },
  { value: "intercom", label: "Intercom" },
  { value: "dstv", label: "DSTV" },
  {value: "service24", label: "24/7 Service"},
];

const roomSizes = [
  { value: "250", label: "Standard Room: 250 Sq-ft" },
  { value: "350", label: "Deluxe Room: 350-500 Sq-ft" },
  { value: "400", label: "Junior Suite: 400-600 Sq-ft" },
  { value: "500", label: "Suite: 500-700 Sq-ft" },
  { value: "700", label: "Executive Room: 350-500 Sq-ft" },
  { value: "600", label: "Family Room: 400-600 Sq-ft" },
  { value: "1000", label: "Penthouse Suite: Several thousand Sq-ft" },
];

const AddRoom = () => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedRoomSize, setSelectedRoomSize] = useState(null);
  const handleAmenitiesChange = (selectedAmenities) => {
    setSelectedAmenities(selectedAmenities);
  };
  const handleRoomSizeChange = (selectedRoomSize) => {
    setSelectedRoomSize(selectedRoomSize);
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    const roomId = `${Math.floor(Math.random() * 1000000) + 1}`;
    const name = event.target.name.value;
    const price = event.target.price.value;
    const capacity = event.target.capacity.value;
    const roomSize = selectedRoomSize.value;
    const description = event.target.description.value;
    const image = document.querySelector("#img"); // taking image from input
    const video = document.querySelector("#video"); // taking video from input

    // get amenity values
    const amenities = selectedAmenities.map((amenity) => amenity.value);
    // upload image to firebase
    const imageUrl = await uploadImage(image.files[0]);
    console.log("imageUrl", imageUrl);
    const videoUrl = await uploadVideo(video.files[0]);
    console.log("videoUrl", videoUrl);

    const product = {
      roomId: roomId,
      name: name,
      price: price,
      capacity: capacity,
      roomSize: roomSize,
      amenities: amenities,
      description: description,
      imageUrl: imageUrl,
      videoUrl: videoUrl,
    };

    //send docotr info to my database
    try {
      const response = await axiosInstance.post(`/rooms`, product);
      const data = response.data;
      if (data?.data?.roomId) {
      Swal.fire(
        "Room Successfully Added!",
        "Room Successfully added to Database",
        "success"
      );
      event.target.reset(); //clear form
      // clear select
      setSelectedAmenities([]);
      setSelectedRoomSize(null);
      } else {
      alert("Failed to add");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-[#F1F5F9] bg-gradient-to-r from-stone-100 to-blue-50 calc-height">
      <p className=" border pl-12 text-xl text-black mb-8 font-bold bg-[#F8FAFC] h-14 flex items-center">
        <BiSolidHomeSmile className="ml-5 mr-3 w-6 h-6" />
        Add New Room
      </p>
      <div>
        <h2 className="text-center text-3xl font-bold m-8 text-blue-500 underline">
          Add New Room
        </h2>
        <div className="flex justify-center">
          <form
            onSubmit={handleAddProduct}
            className="shadow-2xl pl-12 pr-12 pt-6 pb-6 mt-4 mb-12 w-11/12 xl:w-[600px]"
          >
            <label htmlFor="price">Name</label> <br />
            <input
              type="text"
              name="name"
              placeholder="Enter Room Name"
              className="input input-bordered w-full max-w-lg mb-3"
            />
            <label htmlFor="minOrder">Price Per Day: </label> <br />
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              className="input input-bordered w-full max-w-lg mb-3 mt-1"
            />
            <div className="flex justify-between">
            <div className="flex flex-col w-2/3">
                <label htmlFor="roomSize">Room Size:</label>
                <Select
                  className="input input-bordered w-full max-w-lg mb-3 mt-1"
                  options={roomSizes}
                  value={selectedRoomSize}
                  onChange={handleRoomSizeChange}
                  isSearchable={true}
                  placeholder="Select Room Size..."
                />
              </div>
              <div className="flex flex-col w-1/3 gap-x-3">
                <label htmlFor="capacity">Capacity</label>
                <select
                  name="capacity"
                  className="input input-bordered w-full max-w-lg mb-3 mt-1"
                >
                  {[...Array(8).keys()].map((i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              
            </div>
            <label htmlFor="description">Description: </label> <br />
            <textarea
              name="description"
              placeholder="Brief Description of the room"
              className="input input-bordered w-full max-w-lg mb-3 mt-1 p-2"
              rows="5" // added rows
              cols="50" // added cols
            />
            <label htmlFor="Amenities">Amenities</label>
            <Select
              value={selectedAmenities}
              onChange={handleAmenitiesChange}
              options={amenitiesOptions}
              isSearchable={true}
              isMulti={true}
              placeholder="Select amenities..."
            />
            <br />
            <label htmlFor="image">Upload Image:</label> <br />
            <input
              className="input w-full max-w-xs mb-3 mt-1"
              name="img"
              id="img"
              type="file"
            />{" "}
            {/* room video select */}
            <br/>
            <label htmlFor="video">Upload Video:</label>
            <br/>
            <input
              className="input w-full max-w-xs mb-3 mt-1"
              name="video"
              id="video"
              type="file"
            />{" "}
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

export default AddRoom;
