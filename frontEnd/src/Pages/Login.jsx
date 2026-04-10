import React, { useState } from "react";

import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { emailValidator } from "../utils/helper";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [display, setDisplay] = useState(true);

    function emailChange(e) {
        setEmail(e.target.value);
    }

    function passwordChange(e) {
        setPassword(e.target.value);    
    }
    function toggleEye() {
        setDisplay(!display);
    }

    function handleLogin(e){
        e.preventDefault(); 

        if(!emailValidator(e)){
            setError("Enter a Valid Email")
        }

        if(!password){
            setError('Enter A Password')
        }
    }

    // console.log(error);
    

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
