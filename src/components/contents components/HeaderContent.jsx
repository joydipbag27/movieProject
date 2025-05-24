import React, { useEffect, useState } from "react";
import HeaderScroller from "./HeaderScroller";
import HeaderCard from "./HeaderCard";
import axios from "../../utils/Axios";
import { motion } from "framer-motion";


function HeaderContent({ onStart, onFinish }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [headerData, setHeaderData] = useState([]);
  const [genre, setGenre] = useState([]);

  

  
  const getHeaderData = async () => {
    onStart();
    try {
      const res = await axios.get("/movie/popular");
      setHeaderData(res.data.results.slice(0, 10));
    } catch (error) {
      console.error("Error fetching header data:", error);
    }finally{
      onFinish()
    }
  };

  const getGenre = async () => {
    try {
      const res = await axios.get("/genre/movie/list");
      const genres = res.data.genres;
      setGenre(genres);
    } catch (error) {
      console.log("error: trying to get genre", error);
    } 
  };

  const tabSelectedHandler = (index) => {
    setSelectedTab(index);
  };


  useEffect(() => {
     getHeaderData();
     getGenre();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedTab((prevTab) => (prevTab + 1) % headerData.length);
    }, 5000); 

    return () => clearInterval(interval); 
  }, [headerData]);

  return (
      <motion.div className="headerContentContainer">
      <motion.div
        className="headerCardWrapper"
        animate={{ x: `-${selectedTab * 100}%` }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {headerData &&
          headerData.map((elem, index) => (
            <HeaderCard data={elem} key={elem.id || index} genre={genre} />
          ))}
      </motion.div>

      <HeaderScroller
        data={headerData}
        tabSelectedHandler={tabSelectedHandler}
        selectedTab={selectedTab}
      />
    </motion.div>
  );
}

export default HeaderContent;
