import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Notes from "../Components/Notes";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import AddNotes from "../Components/AddNotes";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Home = () => {

    const [openModal, setOpenModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    const [userInfo, setUserInfo] = useState(null);
    const [allNotes, setAllNotes] = useState([]);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function getUserInfo() {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response && response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    }

    
    const getAllNotes=async ()=>{
        try {
            const response =await axiosInstance.get("/get-notes")
            
            if(response.data && response.data.notes){
                setAllNotes(response.data.notes)
            }
        } catch (error) {
            setError("An Unexpected Error")
        }
    }
    useEffect(() => {
        getUserInfo();
        getAllNotes();
    }, []);

    return (
        <>
            <NavBar userInfo={userInfo}/>

            <div className="w-[80vw] min-h-[80vh] relative left-1/2 -translate-x-1/2 top-12">
                <Notes allNotes={allNotes} getAllNotes={getAllNotes} />
            </div>

            <button
                className="absolute cursor-pointer right-4 bottom-4 bg-blue-500 p-4 text-white rounded-xl"
                onClick={() => {
                    setOpenModal({ isShown: true, type: "add", data: null });
                }}
            >
                <FaPlus size={25} />
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
                <AddNotes closeModal={() => setOpenModal({ isShown: false })} getAllNotes={getAllNotes} />
            </Modal>
        </>
    );
};

export default Home;
