import React, { useState } from "react";
import SocialLogin from "./SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase/firebase.init";
import Loading from "../Shared/Loading";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [userFomDB, setUserFromDB] = useState("");

  let errorMessage;

  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  if (error) {
    errorMessage = (
      <p className="font-bold text-red-500">Error: {error?.message}</p>
    );
  }
  if (loading) {
    return <Loading></Loading>;
  }

  ///TODO: Ekhane replace true dewai home e jacche eta conflect kortese nicher navigate er sathe
  if (user) {
    navigate(from, { replace: true }); // jekhan theke login korse se khane niye jabe
    console.log("user login: ", user);
  }
  const handleEmailPasswordLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    fetch(
      `${process.env.REACT_APP_API_SERVER_URL}/users/${email}`
    )
      .then((res) => res.json())
      .then((data) => setUserFromDB(data?.data?.role));
    await signInWithEmailAndPassword(email, password);
    console.log(email, password);
  };
  if (user && (userFomDB === "user" || userFomDB === "admin")) {
    navigate("/");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full pt-32 bg-[#F9FAFB] mx-auto">
        <div className="flex justify-center">
          <form
            onSubmit={handleEmailPasswordLogin}
            className="flex flex-col w-11/12 xl:w-[460px] shadow-xl p-8"
          >
            <img
              className="mx-auto"
              style={{
                width: "150px",
                height: "auto",
              }}
              src="/images/logo.png"
              alt=""
            />
            <p className="text-2xl font-bold text-center mb-2">
              Login Your Account
            </p>
            <div>
              <p className="">Email:</p>
              <input
                className="bg-[#e4e4e4ac] h-10 mb-2  outline-none w-full xl:w-[390px] pl-2 rounded"
                type="email"
                name="email"
                placeholder="Enter email"
              />
            </div>
            <div>
              <p>Password:</p>
              <input
                className="bg-[#e4e4e4ac] h-10 mb-2 w-full xl:w-[390px] pl-2 outline-none rounded"
                type="password"
                name="password"
                placeholder="Enter password"
              />
              <Link to="/reset-password">
                <p className="text-right text-blue-800 underline my-2">
                  Forgot Password?
                </p>
              </Link>
              <p>{errorMessage}</p>
            </div>
            <input
              className="bg-[#2563EB] text-white p-2 cursor-pointer mt-2 rounded"
              type="submit"
              value="Login"
            />
            <div>
              <p className="text-gray-500 my-3">
                New to Shammah Hotel? &nbsp;  
                <Link className="text-blue-800 " to="/register">
                  Create Account
                </Link>
              </p>
            </div>
            <SocialLogin></SocialLogin>
          </form>
        </div>
      </div>
      {/* <SocialLogin></SocialLogin> */}
    </div>
  );
};

export default Login;
