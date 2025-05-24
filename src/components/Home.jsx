import React from "react";
import SideNav from "./SideNav";
import TopNav from "./TopNav";
import Contents from "./Contents";
import { useState, useEffect } from "react";
import Loading from "./Loading";

function Home() {
  document.title = "DogmovieHD | Home";

  const [loadingCount, setLoadingCount] = useState(0);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (loadingCount > 0) {
      setShowLoader(true);
    } else if (loadingCount === 0) {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 1000); 

      return () => clearTimeout(timeout);
    }
  }, [loadingCount]);

  const incrementLoading = () => setLoadingCount((prev) => prev + 1);
  const decrementLoading = () => setLoadingCount((prev) => Math.max(prev - 1, 0));

  return (
    <>
     {showLoader ? <Loading /> : null}
     <div className="homeContainer">
      <SideNav />
      <div className="homeRight">
        <TopNav filter={true}/>
        <Contents
          incrementLoading={incrementLoading}
          decrementLoading={decrementLoading}
        />
      </div>
    </div>
    </>
  );
}

export default Home;
