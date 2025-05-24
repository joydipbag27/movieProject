import React from 'react'
import TopNav from './TopNav'
import SideNav from './SideNav'
import ExploreContents from './ExploreContents'
import { useEffect, useState } from 'react'
import Loading from './Loading'

function Explore() {
  document.title = "DogmovieHd | Explore"
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
    <div className='exploreContainer'>
        <SideNav/>
      <div className="exploreRight">
        <TopNav filter={true}/>
        <ExploreContents incrementLoading={incrementLoading} decrementLoading={decrementLoading}/>
      </div>
    </div>
    </>
  )
}

export default Explore