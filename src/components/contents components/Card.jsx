import React, { useEffect, useState } from 'react'
import noImage from '../../assets/noImageCard.png'
import { Link } from 'react-router-dom'

function Card({ data, big }) {
  const [mediaType, setMediaType] = useState(null)
  const imageURL = data.backDrop_path || data.poster_path 
  ? `https://image.tmdb.org/t/p/original${data.backDrop_path || data.poster_path}`
  : noImage

  const isMovie = () => {
    return !!data.title || !!data.release_date
  }
 
  const isTv = () => {
    return !!data.name || !!data.first_air_date
  }
  
  useEffect(() => {
    setMediaType(isMovie() ? 'movie' : isTv() ? 'tv' : null)
  }, [])

  return (
    <Link to={`/details/${mediaType}/${data.id}`} className={big ? ' card bigCard' : 'card'}>
      <img title={data.title || data.name} loading='lazy' src={imageURL} />
    </Link>
  )
}

export default Card