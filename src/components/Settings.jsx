import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { BsPersonDashFill } from "react-icons/bs";

function Settings() {
    const navigate = useNavigate()
  return (
     <div className="f-se-Container">
      <div className="f-se-Header">
        <div onClick={() => navigate(-1)} className="c-back">
          <FaArrowLeft />
        </div>
        <h1>Settings</h1>
      </div>
      <div className="f-se-cardContainer">
        <div className="se-history">
            <h2><span><FaHistory /></span> Clear History</h2>
            <button onClick={() => localStorage.removeItem("MOVIE_HISTORY")}><span><IoTrashBinSharp /></span>Clear</button>
        </div>
        <div className="se-history">
            <h2><span><FaHeart /></span> Clear Favorites</h2>
            <button onClick={() => localStorage.removeItem("FAVORITES")}><span><IoTrashBinSharp /></span>Clear</button>
        </div>
        <div className="se-history">
            <h2><span><BsPersonDashFill /></span> Clear Profile</h2>
            <button onClick={() => localStorage.removeItem("PROFILE")}><span><IoTrashBinSharp /></span>Clear</button>
        </div>
      </div>
    </div>
  )
}

export default Settings