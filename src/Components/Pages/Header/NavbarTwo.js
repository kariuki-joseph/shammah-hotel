import React, { useState } from "react";
import { MdOutlinePhoneCallback } from "react-icons/md";
import { MdMarkEmailUnread } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import useAdmin from "../../Hooks/useAdmin";
import {
  BookOpenIcon,
  Bars3BottomRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const NavbarTwo = () => {
  let [open, setOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    signOut(auth);
    navigate("/login");
  };
  return (
    <div className="sticky top-0 shadow-lg z-10">
      <div className="bg-[#ECF0F4] shadow-md">
        {" "}
        {/*className='bg-[#ECF0F4]'*/}
        <div className=" text-white mx-auto xl:rounded-2xl lg:px-28 z-10 sticky top-0 shadow-none py-2">
          <nav className="flex h-[80px] w-full xl:w-[1100px] items-center justify-between custom-container mx-auto ">
            <Link to="/">
              <img
                style={{
                  width: "350px",
                  height: "auto",
                }}
                src="/images/logo.png"
                alt=""
              />
            </Link>
            <div
              onClick={() => setOpen(!open)}
              className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7 text-black"
            >
              {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
            </div>
            <ul
              className={` flex flex-col bg-[#ECF0F4] xl:bg-transparent ml-4 xl:ml-0 mt-16 xl:mt-0 pt-4 xl:pt-0 rounded-xl shadow-xl xl:shadow-none  md:flex md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto z-[-1] left-0 w-11/12  md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
                open ? "top-12" : "top-[-880px]"
              }`}
            >
              <li className="flex items-center gap-4 text-[18px] text-gray-800 flex-col xl:flex-row   lg:gap-8 text-center xl:text-left">
                <Link to="/">Home</Link>
                <Link to="/food">Foods</Link>
                <Link to="/rooms">All Rooms</Link>

                {admin ? (
                  <Link to="/admin">Admin Dashboard</Link>
                ) : (
                  <Link to="/user">Dashboard</Link>
                )}
                {user && (
                  <p className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    {user.displayName}
                  </p>
                )}
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded "
                    to="/login"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded "
                    to="/login"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </nav>
          <df-messenger
            location="us-central1"
            project-id="shammah-hotel"
            agent-id="093196dd-3b73-4ae9-aead-5c932b2a3857"
            language-code="en"
            max-query-length="-1"
          >
            <df-messenger-chat-bubble chat-title=""></df-messenger-chat-bubble>
          </df-messenger>
        </div>
      </div>
    </div>
  );
};

export default NavbarTwo;
