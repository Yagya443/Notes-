import React, { useState } from "react";

import NavBar from "../Components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { emailValidator } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [display, setDisplay] = useState(true);
    const navigate = useNavigate();

    function emailChange(e) {
        setEmail(e.target.value);
    }

    function passwordChange(e) {
        setPassword(e.target.value);
    }
    function toggleEye() {
        setDisplay(!display);
    }

    async function handleLogin(e) {
        e.preventDefault();

        if (!emailValidator(email)) {
            setError("Enter a Valid Email");
            return;
        }
        if (!password) {
            setError("Enter A Password");
            return;
        }
        try {
            const response = await axiosInstance.post("/login", {
                email: email,
                password: password,
            });

            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/");
            }
        } catch (error) {
            console.log(error);

            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            } else {
                setError("An Unexpected Error Occure");
            }
        }
    }


    

    return (
        <>
            <NavBar />
            <div className="min-h-[80vh] flex items-center justify-center">
                <form className="border py-4 px-6" onSubmit={handleLogin}>
                    <h2 className=" text-4xl">Login</h2>
                    <div className="w-full flex flex-col gap-4 mt-4">
                        <input
                            className="border rounded w-full py-1 px-2"
                            placeholder="Email"
                            onChange={emailChange}
                        />
                        <div className="border rounded w-full flex items-center justify-between py-1 px-2">
                            <input
                                placeholder="Password"
                                onChange={passwordChange}
                                type={display ? "text" : "password"}
                            />
                            <div className="" onClick={toggleEye}>
                                {display ? (
                                    <FaRegEye size={25} />
                                ) : (
                                    <FaRegEyeSlash size={25} />
                                )}
                            </div>
                        </div>
                    </div>
                    {error && <p className="text-red-500 ">{error}</p>}
                    <button className="w-full bg-blue-500 text-white py-2 font-medium mt-4">
                        Login
                    </button>
                    <div className="flex pt-2">
                        <p>Not Registed yet? </p>
                        <Link className="underline text-blue-500" to="/signup">
                            Create An Account
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
