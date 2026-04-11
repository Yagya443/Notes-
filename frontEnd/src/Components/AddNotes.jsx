import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addNote } from "../redux/notesSlice";

const AddNotes = ({ closeModal }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);

    const dispatch = useDispatch();

    function addingNote() {
        dispatch(
            addNote({
                id: Date.now(),
                title,
                content,
                tags,
                // date,
                isPinned: false,
            }),
        );
        closeModal();
    }

    function handleTags(e) {
        const splittedTag = e.target.value.split(",");

        setTags(splittedTag);
    }

    return (
        <div className="relative ">
            <IoMdClose
                className="absolute right-0 top-0"
                size={30}
                onClick={closeModal}
            />
            <h2 className="text-2xl">Title</h2>
            <input
                placeholder="Title"
                className="border w-full px-1 py-1 "
                onChange={(e) => setTitle(e.target.value)}
            />
            <h2 className="text-2xl ">Content</h2>
            <textarea
                placeholder="Content"
                type="text"
                onChange={(e) => setContent(e.target.value)}
                className="border w-full px-1 py-1 h-40"
                height={50}
            />
            <h2 className="text-2xl mt-0">Tags</h2>

            <textarea
                placeholder="Seperate Multiple Tags By Comma"
                type="text"
                // value={'dfvghjkl'}
                className="border w-full px-1 py-1"
                onChange={handleTags}
            />

            <button
                className="bg-blue-500 w-full text-white font-medium py-1 text-2xl rounded-md"
                onClick={addingNote}
            >
                Add
            </button>
        </div>
    );
};

export default AddNotes;
