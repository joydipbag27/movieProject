import React, { useRef } from "react";
import { motion } from "framer-motion";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import Card from "./Card";
import { useSelector } from "react-redux";

function Similar() {
  const similarContainerRef = useRef(null);
  const { info } = useSelector((state) => state.movie);

  const GoArrowLeft = () => {
    if (similarContainerRef.current) {
      const cardWidth =
        similarContainerRef.current.querySelector(".card").offsetWidth; // Target a card element
      similarContainerRef.current.scrollLeft -= cardWidth + 16;
    }
  };

  const GoArrowRight = () => {
    if (similarContainerRef.current) {
      const cardWidth =
        similarContainerRef.current.querySelector(".card").offsetWidth; // Target a card element
      similarContainerRef.current.scrollLeft += cardWidth + 16;
    }
  };
  return info?.recommendation?.length > 0 || info?.similar?.length > 0 ? (
    <div className="similarContainer">
      <h2>{info?.recommendation?.length > 0 ? "Recommendation" : "Similar"}</h2>
      <motion.div
        className="similarCards"
        ref={similarContainerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div onClick={() => GoArrowLeft()} className="m-cardBtn m-leftBtn">
          <MdKeyboardArrowLeft />
        </div>

        {info?.recommendation?.length > 0
          ? info?.recommendation?.map((elem) => (
              <Card key={elem.id} data={elem} />
            ))
          : info?.similar?.map((elem) => <Card key={elem.id} data={elem} />)}

        <div onClick={() => GoArrowRight()} className="m-cardBtn m-rightBtn">
          <MdKeyboardArrowRight />
        </div>
      </motion.div>
    </div>
  ) : null;
}

export default Similar;
