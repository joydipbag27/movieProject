import React from 'react'
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { MdOutlineExplore } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import { TbSettings } from "react-icons/tb";
import History from "./History";

function Navigation() {
    const linksData = [
        { title: "Home", icon: <GoHome /> },
        { title: "Explore", icon: <MdOutlineExplore /> },
        { title: "Favorites", icon: <MdFavoriteBorder /> },
        { title: "Profile", icon: <RxPerson /> },
        { title: "Settings", icon: <TbSettings /> },
      ];

  return (
    <div className="navigation">
        {linksData.map((elem, index) => (
          <NavLink 
          key={index} 
          to={elem.title === "Home" ? "/" : `/${elem.title.toLowerCase()}`} 
          className={({ isActive }) => isActive ? "navLinks active" : "navLinks"}
          >
            <div className="navLinkLogo">{elem.icon}</div>
            <div className='navLinkTitle'>{elem.title}</div>
          </NavLink>
        ))}
        <History/>
      </div>
  )
}

export default Navigation