import React, { useRef } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import SmallCard from "./SmallCard";

function CastContainer() {
  const castContainerRef = useRef(null);
  const { info } = useSelector((state) => state.movie);

  const GoArrowLeft = () => {
    if (castContainerRef.current) {
      const cardWidth =
        castContainerRef.current.querySelector(".smallCard").offsetWidth; // Target a card element
      castContainerRef.current.scrollLeft -= cardWidth + 16;
    }
  };

  const GoArrowRight = () => {
    if (castContainerRef.current) {
      const cardWidth =
        castContainerRef.current.querySelector(".smallCard").offsetWidth; // Target a card element
      castContainerRef.current.scrollLeft += cardWidth + 16;
    }
  };

  return (
    <div className={info?.images?.backdrops?.length > 0 ? "castContainer" : "castContainer fullLength"}>
      <h2>{info?.credits?.cast.length > 0 ? "Cast" : "Crew"}</h2>
      <motion.div
        className="castCards"
        ref={castContainerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div onClick={() => GoArrowLeft()} className="sm-cardBtn sm-leftBtn">
          <MdKeyboardArrowLeft />
        </div>

        {info?.credits?.cast.length > 0
          ? info?.credits?.cast
              .slice(0, 20)
              .map((elem, index) => <SmallCard key={index} data={elem} />)
          : info?.credits?.crew
              .slice(0, 20)
              .map((elem, index) => <SmallCard key={index} data={elem} />)}

        <div onClick={() => GoArrowRight()} className="sm-cardBtn sm-rightBtn">
          <MdKeyboardArrowRight />
        </div>
      </motion.div>
    </div>
  );
}

export default CastContainer;
