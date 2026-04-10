import React from "react";
import { FaPen } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlinePushPin } from "react-icons/md";

const Notes = ({ title, date, content, tags, isPinned }) => {
    return (
        <div className="grid grid-cols-3 gap-4 ">
            <div className=" relative py-1 px-2 border transition-all hover:shadow-xl">
                <h1 className="text-2xl font-medium">{title}</h1>
                <h1 className="text-sm">{date}</h1>
                <h1 className="text-sm">{content} </h1>
                <div className="flex items-center justify-between">
                    <h1>{tags}</h1>
                    <div className="flex gap-2 items-center ">
                        <FaPen size={15} />
                        <MdOutlineDelete size={20} />
                    </div>
                </div>
                {isPinned && (
                    <MdOutlinePushPin
                        className="absolute right-2 top-4"
                        color="blue"
                        size={25}
                    />
                )}
            </div>
        </div>
    );
};

export default Notes;
