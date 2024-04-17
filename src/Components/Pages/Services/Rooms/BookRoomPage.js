import React, { useContext, useEffect, useState } from "react";
import {
  useNavigate,
  uselocatoin,
  useParams,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import { MyContext } from "../../../Context/Context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../Firebase/firebase.init";
import Swal from "sweetalert2";
import axiosInstance from "../../../../axios";
import MakePaymentModal from "../../Home/MakePaymentModal";

const BookRoomPage = () => {
  const [user] = useAuthState(auth);
  const [roomData, setRoomData] = useState({});
  const { searchRoomData } = useContext(MyContext);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const bookingInfo = location.state;
  // const [loading, setLoading] = useState(false);
  console.log("bookinginfo: ", bookingInfo);

  const checkInFormatted = bookingInfo.checkIn.toISOString().split("T")[0];
  const checkOutFormatted = bookingInfo.checkOut.toISOString().split("T")[0];

  const getDaysDiff = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Calculate the difference in milliseconds
    const timeDifference = endDate - startDate;

    // Calculate the number of days
    let daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference + 1;
  };

  const handleOpenBookingModal = () => {
    setIsPaymentModalOpen(true);
  };
  const handleBookRoom = async () => {
    const numDays = getDaysDiff(bookingInfo.checkIn, bookingInfo.checkOut);
    const order = {
      roomId: roomId,
      email: user?.email,
      name: roomData?.name,
      checkIn: checkInFormatted,
      checkOut: checkOutFormatted,
      price: numDays * roomData?.price,
      imageUrl: roomData?.imageUrl,
    };

    try {
      const response = await axiosInstance.post(`/rooms/orders`, order);
      const data = response.data;
      if (data.success) {
        Swal.fire({
          title: "Room Booking Successful",
          text: "Check your email for confirmation!",
          icon: "success",
          button: "Ok",
        });
      } else {
        Swal.fire({
          title: "Room Booking Failed",
          text: "Please try again!",
          icon: "error",
          button: "Ok",
        });
      }

      navigate("/user/my-orders");
    } catch (error) {
      Swal.fire({
        title: "Room Booking Failed",
        text: "Error: " + error,
        icon: "error",
        button: "Ok",
      });

      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axiosInstance.get(`/rooms/${roomId}`);
        setRoomData(response.data?.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchRoomData();
  }, [roomId]);
  return (
    <div>
      {isPaymentModalOpen && (
        <MakePaymentModal
          totalAmount={
            roomData?.price *
            getDaysDiff(bookingInfo.checkIn, bookingInfo.checkOut)
          }
          orderItems={[
            {
              name: roomData?.name,
              price:
                roomData?.price *
                getDaysDiff(bookingInfo.checkIn, bookingInfo.checkOut),
            },
          ]}
          phone={user?.phoneNumber}
          onSuccess={handleBookRoom}
          onBack={() => setIsPaymentModalOpen(false)}
          onError={() => {}}
        />
      )}
      {!isPaymentModalOpen && (
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
                  About Room
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
          </div>
          {/* another div */}

          <div className="w-11/12 mx-auto xl:w-[350px] h-1/2 bg-[#E3E3ED] p-4 rounded-md">
            <div className="mt-4">
              <p className="text-2xl font-bold text-center mb-2 text-blue-500">
                Order Summary
              </p>
              <p className="text-xl mb-2">
                Room:{" "}
                <span className="text-black italic">{roomData?.name}</span>
              </p>
              <p className="text-xl mb-2 text">
                RoomID:{" "}
                <span className="text-black italic ">{roomData?.roomId}</span>
              </p>
              <p className="text-xl mb-2">
                Check In Date:{" "}
                <span className="text-black italic ">{checkInFormatted}</span>
              </p>
              <p className="text-xl mb-2">
                Check Out Date:{" "}
                <span className="text-black italic">{checkOutFormatted}</span>
              </p>
              <p className="text-xl mb-2">
                Number of Days:{" "}
                <span className="text-black italic">
                  {getDaysDiff(bookingInfo.checkIn, bookingInfo.checkOut)}{" "}
                  day(s)
                </span>
              </p>

              <p className="text-xl mb-2">
                Price Per Day:{" "}
                <span className="text-black italic">{roomData?.price}/day</span>
              </p>
              <p className="text-xl mb-2">
                Total Persons:{" "}
                <span className="text-black italic">
                  {bookingInfo.persons || 1}
                </span>
              </p>
              <div className="divider"></div>
              <p className="text-xl mb-2">
                SubTotal:{" "}
                <span className="text-black italic ">
                  Ksh.{" "}
                  {roomData?.price *
                    getDaysDiff(bookingInfo.checkIn, bookingInfo.checkOut)}
                </span>
              </p>
            </div>
            <div>
              <button
                onClick={handleOpenBookingModal}
                className="w-full h-10 rounded font-bold bg-blue-600 text-white mt-4"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookRoomPage;
