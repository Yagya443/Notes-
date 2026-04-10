import React from 'react'
import NavBar from '../Components/NavBar'
import Notes from '../Components/Notes'
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import AddNotes from '../Components/AddNotes';

const Home = () => {

  const note=useSelector((state)=>state.notes.notes)

  return (
    <> 
      <NavBar />

      <div className='w-[80vw] min-h-[80vh] relative left-1/2 -translate-x-1/2 top-12' >
        <Notes 
          title={note.title}
          date={note.date}
          content={note.content}
          tags={note.tags}
          isPinned={note.isPinned}
          onEdit={() => {}}
          onUpdate={() => {}}
          onPinNote={() => {}}
        />
      </div>

      <button className='absolute right-2 bottom-2 bg-blue-500 p-4 text-white rounded-xl' >
        <FaPlus onClick={()=><AddNotes/>}/>
      </button>
    </>
  )
}

export default Home
