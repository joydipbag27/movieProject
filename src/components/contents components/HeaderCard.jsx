import React from "react";
import { GoMute } from "react-icons/go";
import { GoUnmute } from "react-icons/go";
import { FaPlay } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineMoreHoriz } from "react-icons/md";
import noImage from "../../assets/noImageAvailable2.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function HeaderCard({ data, genre }) {
  const [mediaType, setMediaType] = useState(null);
  
  const isMovie = () => {
    return !!data.title || !!data.release_date;
  };

  const isTv = () => {
    return !!data.name || !!data.first_air_date;
  };

  useEffect(() => {
    setMediaType(isMovie() ? "movie" : isTv() ? "tv" : null);
  }, []);


  return (
    <Link
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url(https://image.tmdb.org/t/p/original${
          data.backdrop_path || data.poster_path || noImage
        })`,
      }}
      className="headerCard"
      to={`/details/${mediaType}/${data.id}`}
    >
      <div className="dsp-header">
        <h4>🔥Now Popular</h4>
        {data && data.video ? (
          <div className="dsp-unmute">
            <GoMute />
          </div>
        ) : (
          <div className="dsp-unmute"></div>
        )}
      </div>
      <div className="dsp-rest">
        <div className="dsp-category">
          {data &&
            data.genre_ids.map((elem) => {
              const genreItem = genre.find((item) => item.id === elem);
              return genreItem ? <h4 key={elem}>{genreItem.name}</h4> : null;
            })}
        </div>
        <div className="dsp-info">
          <h2>{data.title || data.original_title || data.name || "N/A"}</h2>
          <p>
            {data.overview.length > 150
              ? data.overview.substring(0, 150) + "..."
              : data.overview || "N/A"}
          </p>
        </div>
        <div className="dsp-buttons">
          <div className="dsp-button whiteTheme">
            <FaPlay />
            <h4>Watch Now</h4>
          </div>
          <div className="dsp-button blackTheme">
            <FaRegHeart />
            <h4>Add to Favorites</h4>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HeaderCard;
