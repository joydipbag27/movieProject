import React, { useRef } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import MediumCard from "./MediumCard"
function CastContainer() {
    const castContainerRef = useRef(null);
    const {info} = useSelector((state) => state.movie)

    const GoArrowLeft = () => {
        if (castContainerRef.current) {
          const cardWidth =
            castContainerRef.current.querySelector(".mediumCard").offsetWidth; // Target a card element
          castContainerRef.current.scrollLeft -= cardWidth + 16;
        }
      };
    
      const GoArrowRight = () => {
        if (castContainerRef.current) {
          const cardWidth =
            castContainerRef.current.querySelector(".mediumCard").offsetWidth; // Target a card element
          castContainerRef.current.scrollLeft += cardWidth + 16;
        }
      };

      
    
  return info?.images?.backdrops?.length > 0 ?(
    <div className="detailedImagesContainer">
       <h2>Images</h2>
       <motion.div 
        className="castCards"
        ref={castContainerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        >

        <div onClick={() => GoArrowLeft()} className="m-cardBtn m-leftBtn">
          <MdKeyboardArrowLeft />
        </div>    

        {info?.images?.backdrops?.slice(0, 10).map((elem, index) => <MediumCard key={index} data={elem}/>)}

        <div onClick={() => GoArrowRight()} className="m-cardBtn m-rightBtn">
          <MdKeyboardArrowRight />
        </div>

       </motion.div>
    </div>
  ) : null
}

export default CastContainer