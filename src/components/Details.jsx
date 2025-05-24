import React from 'react'
import SideNav from './SideNav'
import TopNav from './TopNav'
import DetailsContents from './DetailsContents'
import Loading from './Loading'
import { useEffect, useState } from 'react'



function Details() {
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
    <div className='detailsContainer'>
        <SideNav />
        <div className="detailsRight">
            <TopNav filter={false}/>
            <DetailsContents incrementLoading={incrementLoading} decrementLoading={decrementLoading}/>
        </div>
            
    </div>
    </>
  )
}

export default Details