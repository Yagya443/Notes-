import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlinePushPin } from "react-icons/md";
import { useDispatch } from "react-redux";
import { togglePin } from "../redux/notesSlice";
import EmptyMessage from "./EmptyMessage";
import axiosInstance from "../utils/axiosInstance";

const Notes = ({ allNotes, getAllNotes }) => {
    const dispatch = useDispatch();

    async function handleTogglePin(id) {
        
        try {
            await axiosInstance.put(`/pin-note/${id}`);
            await getAllNotes();
        } catch (error) {
            console.log("Delete error", error);
        }

    }
    

    async function deleteNote(id) {
        
        try {
            await axiosInstance.delete(`/delete-note/${id}`);
            await getAllNotes();
        } catch (error) {
            console.log("Delete error", error);
        }
    }

    return (
        <div className="grid grid-cols-3 gap-4 ">
            {allNotes.map((event, idx) => (
                <div
                    key={idx}
                    className={`relative py-1 px-2  transition-all hover:shadow-xl border-3 ${event.isPinned && "border-blue-500"} `}
                    onClick={() => handleTogglePin(event._id)}
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
                            {/* <FaPen size={15} /> */}
                            <MdOutlineDelete
                                size={30}
                                onClick={() => deleteNote(event._id)}
                            />
                        </div>
                    </div>

                    <MdOutlinePushPin
                        className={`absolute right-2 top-4`}
                        color={event.isPinned ? "blue" : "gray"}
                        size={25}
                    />
                </div>
            ))}
            {allNotes.length === 0 && <EmptyMessage />}
        </div>
    );
};

export default Notes;
