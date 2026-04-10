import React from "react";
import { Link } from "react-router-dom";
import { nameLogo } from "../utils/helper";

const ProfileInfo = () => {
    // console.log(nameLogo('John Willioms'));

    return (
        <div className="flex items-center gap-2">
            <div className="rounded-[100%] bg-gray-200 h-10 w-10 text-xl font-medium grid place-items-center">
                {nameLogo("John Willioms")}
            </div>
            <div>
                <p>Williams</p>
                <Link to="/Login" className="text-blue-400 underline">
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default ProfileInfo;
