/* eslint-disable no-restricted-globals */
import React, { useEffect, useState,  } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Shared/Loading";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../Firebase/firebase.init";
import Swal from "sweetalert2";
import axiosInstance from "../../../../axios";
import MakePaymentModal from "../../Home/MakePaymentModal";

const FoodBookingPage = () => {
  const { foodId } = useParams();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState({});
  const [user, loading] = useAuthState(auth);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const handleOrder = async () => {
    const orderFood = {
      foodId: orderData?.foodId,
      email: user?.email,
      name: orderData?.name,
      price: orderData?.price,
      imageUrl: orderData?.imageUrl,
    };
    try {
      const response = await axiosInstance.post(`/foods/orders`, orderFood);
      Swal.fire({
        title: "Order Successful",
        text: "Your order is successful. Check email for confirmation!",
        icon: "success",
        button: "Ok",
      }).then(() => {
        // navidate to food bookings
        navigate("/user/my-food-orders");
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axiosInstance.get(`/foods/${foodId}`);
        setOrderData(response.data?.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFood();
  }, [foodId]);

  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return (
    <div className="mt-4 flex justify-center">
      {isPaymentModalOpen && (
        <MakePaymentModal
          totalAmount={orderData?.price}
          orderItems={[
            {
              name: orderData?.name,
              price: orderData?.price,
            },
          ]}
          phone={user?.phoneNumber}
          onSuccess={handleOrder}
          onBack={() => setIsPaymentModalOpen(false)}
          onError={() => {}}
        />
      )}
      {!isPaymentModalOpen && (
        <div className="w-11/12 xl:w-[390px] shadow-xl p-2 flex flex-col items-center pb-4">
          <img
            className="w-full xl:w-11/12 mx-auto rounded"
            src={orderData?.imageUrl}
            alt=""
          />
          <p className="text-xl font-bold my-2">{orderData?.name}</p>
          <p className="my-2 font-bold">
            Price: <span className="text-success">Ksh. {orderData?.price}</span>
            /PCS
          </p>
          <button
            onClick={openPaymentModal}
            className="btn  btn-success text-white"
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodBookingPage;
