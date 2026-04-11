import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlinePushPin } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteNote, togglePin } from "../redux/notesSlice";

const Notes = ({ note }) => {
    const dispatch = useDispatch();

    function handleTogglePin(e) {
        dispatch(togglePin(e))
        
    }

    return (
        <div className="grid grid-cols-3 gap-4 ">
            {note.map((event, idx) => (
                <div
                    key={idx}
                    className={`relative py-1 px-2  transition-all hover:shadow-xl border-3 ${event.isPinned && "border-blue-500"} `}
                    onClick={()=>handleTogglePin(event.id)}
                >
                    <h1 className="text-2xl font-medium">{event.title}</h1>
                    <h1 className="text-sm">{event.date}</h1>
                    <h1 className="text-sm">{event.content} </h1>
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2 ">
                            {event.tags.map((tag, tagIdx) => (
                                <h3
                                    key={tagIdx}
                                    className="border py-0.2 px-2 rounded-md"
                                >
                                    {tag}
                                </h3>
                            ))}
                        </div>
                        <div className="flex gap-2 items-center ">
                            <FaPen size={15} />
                            <MdOutlineDelete size={20} onClick={()=>dispatch(deleteNote(event.id))}/>
                        </div>
                    </div>

                    <MdOutlinePushPin
                        className={`absolute right-2 top-4`}
                        color={event.isPinned ? "blue" : "gray"}
                        size={25}
                    />
                </div>
            ))}
        </div>
    );
};

export default Notes;
