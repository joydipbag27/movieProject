import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaFireAlt } from "react-icons/fa";
import { HiBanknotes } from "react-icons/hi2";
import { FaCrown } from "react-icons/fa";

function Profile() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("Regular");
  const [userNameValue, setUserNameValue] = useState('Anonymous')

  const handleSelectedPlan = (e) => {
    setSelectedPlan(e.target.value);
  };
  const userNameHandler = (e) => {
    setUserNameValue(e.target.value)
  }
  const handleSubmit = () => {
    localStorage.setItem("PROFILE", JSON.stringify({userName: userNameValue, plan: selectedPlan}))
    navigate(-1)
  }
  return (
    <div className="f-se-pro-Container">
      <div className="f-se-Header">
        <div onClick={() => navigate(-1)} className="c-back">
          <FaArrowLeft />
        </div>
        <h1>Profile</h1>
      </div>
      <div className="f-se-pro-cardContainer">
        <div className="p-image">
          <img
            src={`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${userNameValue}`}
            alt=""
          />
        </div>
        <div className="p-name">
          <input type="text" onChange={(e) => userNameHandler(e)} id="userName" maxLength={13} placeholder="Enter Your Name" />
        </div>
        <div className="p-plans">
          <div className="p-plan">
            <input
              type="radio"
              onChange={handleSelectedPlan}
              checked={selectedPlan === "Regular"}
              name="plan"
              value="Regular"
              id="regularOP"
            />
            <label htmlFor="regularOP">
              <h3>
                <FaFireAlt /> <span>Regular</span>
              </h3>
              <h4>
                Price: <span>₹149/Month</span>
              </h4>
            </label>
          </div>
          <div className="p-plan">
            <input
              type="radio"
              onChange={handleSelectedPlan}
              checked={selectedPlan === "Pro"}
              name="plan"
              value="Pro"
              id="proOP"
            />
            <label htmlFor="proOP">
              <h3>
                <HiBanknotes /> <span>Pro</span>
              </h3>
              <h4>
                Price: <span>₹349/Month</span>
              </h4>
            </label>
          </div>
          <div className="p-plan">
            <input
              type="radio"
              name="plan"
              checked={selectedPlan === "Ultimate"}
              onChange={handleSelectedPlan}
              value="Ultimate"
              id="ultimateOP"
            />
            <label htmlFor="ultimateOP">
              <h3>
                <FaCrown /> <span>Ultimate</span>
              </h3>
              <h4>
                Price: <span>₹849/Month</span>
              </h4>
            </label>
          </div>
        </div>
        <div className="p-buttons">
          <button onClick={() => handleSubmit()} className="p-save">Save</button>
          <button onClick={() => navigate(-1)} className="p-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
