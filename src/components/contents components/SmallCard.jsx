import React from 'react'
import noPeopleImage from '../../assets/noImageAvailablePeople.png'

function SmallCard({ data }) {
    const imageUrl = data.profile_path ? `https://image.tmdb.org/t/p/original${data.profile_path}`: noPeopleImage;
    const peopleName = (data.name || data.original_name)
    
  return (
    <div className='smallCard'>
        <img title={data.known_for_department} src={imageUrl} loading='lazy' />
        <h4>{peopleName}</h4>
    </div>
  )
}

export default SmallCard