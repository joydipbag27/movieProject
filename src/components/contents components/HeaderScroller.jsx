import React, { useState } from "react";
import { useRef } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import noImage from "../../assets/noImageAvailable2.jpg"

function HeaderScroller({ data, tabSelectedHandler, selectedTab }) {

  const smCards = useRef(null);

  const goLeft = () => {
    if (smCards.current) {
      const cardWidth = smCards.current.querySelector(
        ".headerScrollerCard"
      ).offsetWidth;
      smCards.current.scrollLeft -= cardWidth * 4 + 7;
    }
  };

  const goRight = () => {
    if (smCards.current) {
      const cardWidth = smCards.current.querySelector(
        ".headerScrollerCard"
      ).offsetWidth;
      smCards.current.scrollLeft += cardWidth * 4 + 7;
    }
  };

  return (
    <div className="headerScrollerWrapper">
      <div onClick={goLeft} className="headerScrollerBTN leftBTN">
        <FaChevronLeft />
      </div>

      <div ref={smCards} className="headerScroller">
        {data &&
          data.map((elem, index) => (
            <div key={index} onClick={() => tabSelectedHandler(index)} style={{border: selectedTab === index ? '3px solid #fff' : 'none'}} className="headerScrollerCard">
              <img
                src={`https://image.tmdb.org/t/p/original${elem.backdrop_path || elem.poster_path || noImage}`}
                alt={elem.original_title}
              />
            </div>
          ))}
      </div>
      <div onClick={goRight} className="headerScrollerBTN rightBTN">
        <FaChevronRight />
      </div>
    </div>
  );
}

export default HeaderScroller;
