import React from 'react'
import noPeopleImage from '../../assets/noImageAvailablePeople.png'

function SmallCard({ data }) {
    const imageUrl = data.file_path ? `https://image.tmdb.org/t/p/original${data.file_path}`: noPeopleImage;
    
  return (
    <div className='mediumCard'>
        <img src={imageUrl} loading='lazy' />
    </div>
  )
}

export default SmallCard