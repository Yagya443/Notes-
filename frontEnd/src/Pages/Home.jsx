import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import Notes from "../Components/Notes";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import AddNotes from "../Components/AddNotes";

const Home = () => {
    const note = useSelector((state) => state.notes.notes);

    const [openModal, setOpenModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    return (
        <>
            <NavBar />

            <div className="w-[80vw] min-h-[80vh] relative left-1/2 -translate-x-1/2 top-12">
                <Notes note={note} />
            </div>

            <button
                className="absolute cursor-pointer right-4 bottom-4 bg-blue-500 p-4 text-white rounded-xl"
                onClick={() => {
                    setOpenModal({ isShown: true, type: "add", data: null });
                }}
            >
                <FaPlus size={25}/>
            </button>

            <Modal
                isOpen={openModal.isShown}
                onRequestClose={() => setOpenModal({ isShown: false })}
                style={{
                    content: {
                        left: "50%",
                        top: "50%",
                        translate: "-50% -50%",
                        height: "470px",
                        width: "500px",
                        // backgroundColor: "#d9d3d3",
                    },
                }}
            >
                <AddNotes closeModal={() => setOpenModal({ isShown: false })} />
            </Modal>
        </>
    );
};

export default Home;
