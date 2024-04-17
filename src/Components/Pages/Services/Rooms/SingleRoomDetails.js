import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { MyContext } from "../../../Context/Context";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../../../axios";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

const SingleRoomDetails = () => {
  const { availableRooms, searchRoomData } = useContext(MyContext);
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState({});
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [numberOfPersons, setNumberOfPersons] = useState(1);

  const handleNumerOfPersons = (e) => {
    setNumberOfPersons(e.target.value);
  };

  const handleRoomBooking = () => {
    const bookingData = {
      checkIn,
      checkOut,
      persons: numberOfPersons,
    };

    navigate(`/book-room/${roomId}`, { state: bookingData });
  };

  const handleCheckAvailableRoom = async () => {
    const checkInFormatted = checkIn.toISOString().split("T")[0];
    const checkOutFormatted = checkOut.toISOString().split("T")[0];

    try {
      const response = await axiosInstance.get(
        `/rooms/${roomId}/available?checkIn=${checkInFormatted}&checkOut=${checkOutFormatted}&persons=${numberOfPersons}`
      );
      const data = response.data;

      if (!data?.success) {
        swalWithBootstrapButtons.fire({
          title: "Opps! Room is Not Available",
          html: `This room is available for the selected date: <strong> ${checkInFormatted}</strong> to <strong>${checkOutFormatted}</strong> for <strong>${numberOfPersons}</strong> person(s). <br/> Please select another date or room.`,
          icon: "error",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: "Okay",
        });
      } else {
        swalWithBootstrapButtons
          .fire({
            title: "Congratulations! Room Available",
            html: `This room is available for the selected date: <strong> ${checkInFormatted}</strong> to <strong>${checkOutFormatted}</strong> for <strong>${numberOfPersons}</strong> person(s).  <br/> Do you want to proceed to booking?`,
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "Yes, Proceed to Booking",
            cancelButtonText: "Cancel",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              // navigate to booking page
              handleRoomBooking();
            }
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axiosInstance.get(`/rooms/${roomId}`);
        const data = response.data;
        setRoomData(data?.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoom();
    // if check-in and check out have been passed as parameters
    if (searchRoomData.checkIn) {
      setCheckIn(new Date(searchRoomData.checkIn));
    }
    if (searchRoomData.checkOut) {
      setCheckOut(new Date(searchRoomData.checkOut));
    }

    if (searchRoomData.persons) {
      setNumberOfPersons(searchRoomData.persons);
    }
  }, [roomId]);
  return (
    <div className="w-full xl:w-[1100px] mx-auto mt-6 flex flex-col xl:flex-row">
      <div className="mx-auto">
        <div className="mb-6">
          <img
            className="w-[300px] h-[200px] xl:w-[710px] xl:h-[430px] rounded-md"
            src={roomData?.imageUrl}
            alt=""
          />
        </div>

        <div className="w-full xl:w-[730px] mb-4">
          <div>
            <p className="text-2xl font-semibold text-gray-900 mb-4 mt-4">
              Why {roomData?.name}?{" "} 
            </p>
          </div>
          <p className="text-lg text-gray-600">{roomData?.description}</p>
        </div>

        <div className="flex gap-4 xl:gap-0 xl:ml-2 flex-col justify-center items-center xl:justify-normal xl:flex-row">
          <div className="w-[235px] h-[140px] bg-[#414159] flex items-center justify-center mr-[1px]">
            <div className="text-center">
              <p className="text-xl font-bold text-white">Size:</p>
              <p className="text-xl text-[#EDDFBA]">
                {roomData?.roomSize} Sq-ft
              </p>
            </div>
          </div>
          <div className="w-[235px] h-[140px] bg-[#414159] flex items-center justify-center mr-[1px]">
            <div className="text-center">
              <p className="text-xl font-bold text-white">Capacity:</p>
              <p className="text-xl text-[#EDDFBA]">
                {roomData?.capacity} Persons
              </p>
            </div>
          </div>
          <div className="w-[235px] h-[140px] bg-[#414159] flex items-center justify-center">
            <div className="text-center">
              <p className="text-xl font-bold text-white">Bed:</p>
              <p className="text-xl text-[#EDDFBA]">Double</p>
            </div>
          </div>
        </div>

        <div className="w-full xl:w-[730px] mb-4">
          <div>
            <p className="text-2xl font-semibold text-gray-900 mb-4 mt-4">
              Room Services
            </p>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {roomData?.amenities?.includes("airCondition") && (
              <div className="flex items-center gap-3">
                <div>
                  <img
                    src="http://www.hotels.gov.bd/forntend/img/core-img/icon1.png"
                    alt=""
                  />
                </div>
                <p> Air Conditioning </p>
              </div>
            )}
            {roomData?.amenities?.includes("hotShower") && (
              <div className="flex items-center gap-3">
                <div>
                  <img
                    height={"35px"}
                    width={"35px"}
                    src="https://cdn-icons-png.flaticon.com/512/900/900685.png"
                    alt=""
                  />
                </div>
                <p> Hot Shower </p>
              </div>
            )}

            {roomData?.amenities?.includes("dstv") && (
              <div className="flex items-center gap-3">
                <div>
                  <img
                    src="http://www.hotels.gov.bd/forntend/img/core-img/icon4.png"
                    alt=""
                  />
                </div>
                <p>DSTV</p>
              </div>
            )}
            {roomData?.amenities?.includes("wifi") && (
              <div className="flex items-center gap-3">
                <div>
                  <img
                    src="http://www.hotels.gov.bd/forntend/img/core-img/icon5.png"
                    alt=""
                  />
                </div>
                <p>Unlimited Wifi</p>
              </div>
            )}
            {roomData?.amenities?.includes("service24") && (
              <div className="flex items-center gap-3">
                <div>
                  <img
                    src="http://www.hotels.gov.bd/forntend/img/core-img/icon6.png"
                    alt=""
                  />
                </div>
                <p>Service 24/7</p>
              </div>
            )}
          </div>
        </div>
        <div className="w-full xl:w-[730px] mx-auto mt-1">
          <span className="text-2xl font-semibold text-gray-900 mb-4 mt-4">Room Preview</span>
          <div className="mb-6">
            <video
              className="w-[300px] h-[200px] xl:w-[710px] xl:h-[430px] rounded-md"
              controls
              src={`${roomData?.videoUrl}`}
            >
              {" "}
            </video>
          </div>
        </div>
      </div>

      <div className="bg-[#E3E3ED] w-11/12  h-[310px] xl:w-1/2 mx-auto flex-col flex justify-center rounded-md">
        <div className="">
          <div className="mb-2">
            <p className="text-2xl mb-6 text-gray-600 font-bold pt-4 text-center">
              {Object.keys(searchRoomData).length == 0
                ? "Check Room Availability"
                : "Confirm Room Availability"}
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
              <div>
                <p className="text-black">Check In</p>
                <DatePicker
                  className="h-10 w-[150px] text-center outline-none rounded"
                  selected={checkIn}
                  minDate={new Date()} // Set minDate to today's date
                  onChange={(date) => setCheckIn(date)}
                />
              </div>
              <div>
                <p className="text-black">Check Out</p>
                <DatePicker
                  className="h-10 text-center outline-none rounded w-[150px]"
                  selected={checkOut}
                  minDate={new Date()} // Set minDate to today's date
                  onChange={(date) => setCheckOut(date)}
                />
              </div>
            </div>
            <div>
              <p className="text-black">Persons</p>
              <select
                name=""
                id=""
                className="h-10 w-[320px] bg-white text-center rounded outline-none"
                onChange={handleNumerOfPersons}
              >
                {[...Array(8).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                onClick={handleCheckAvailableRoom}
                className="bg-[#000080] text-white h-10 w-[200px] mt-2 p-2 rounded-full"
              >
                {Object.keys(searchRoomData).length == 0
                  ? "Check Room Availability"
                  : "Confirm Availability"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {Object.keys(searchRoomData).length > 0 && false && (
        <div className="bg-[#E3E3ED] w-11/12  h-[310px] xl:w-1/2 mx-auto flex-col flex justify-center rounded-md">
          <div className="">
            <div className="mb-2">
              <p className="text-2xl mb-6 text-gray-600 font-bold pt-4 text-center">
                Book Room
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-4">
                <div>
                  <p className="text-black">Check In</p>
                  <DatePicker
                    className="h-10 w-[150px] text-center outline-none rounded"
                    selected={checkIn}
                    minDate={new Date()} // Set minDate to today's date
                    onChange={(date) => setCheckIn(date)}
                  />
                </div>
                <div>
                  <p className="text-black">Check Out</p>
                  <DatePicker
                    className="h-10 text-center outline-none rounded w-[150px]"
                    selected={checkOut}
                    minDate={new Date()} // Set minDate to today's date
                    onChange={(date) => setCheckOut(date)}
                  />
                </div>
              </div>
              <div>
                <p className="text-black">Persons</p>
                <select
                  name=""
                  id=""
                  className="h-10 w-[320px] bg-white text-center rounded outline-none"
                  value={numberOfPersons}
                  onChange={handleNumerOfPersons}
                >
                  {[...Array(8).keys()].map((i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <button
                  onClick={handleRoomBooking}
                  className="bg-[#000080] text-white h-10 w-[200px] mt-2 p-2 rounded-full"
                >
                  Book Room
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleRoomDetails;
