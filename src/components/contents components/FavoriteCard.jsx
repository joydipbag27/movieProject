import React from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import noImage from "../../assets/noImageCard.png"
import { Link } from 'react-router-dom';

function FavoriteCard({data, id, favDeleteHandler}) {

  return (
    <Link className='favoriteCard'>
        <div className="f-left">
            <div className="f-cover">
            <img src={`https://image.tmdb.org/t/p/original${data.detail.backdrop_path || data.detail.poster_path || noImage}`} alt={data.detail.id} />
        </div>
        <div className="f-middle">
            <h2>Name: <span>{data.detail.name || data.detail.title}</span></h2>
            <div className="f-middle-infos">
                <div className="f-duration"><h4>Duration: <span>{data.detail.runtime
                    ? `${Math.floor(data.detail.runtime / 60)}h ${
                        data.detail.runtime % 60
                      }m`
                    : data.detail.episode_run_time &&
                      data.detail.episode_run_time.length > 0
                    ? `${Math.floor(data.detail.episode_run_time[0] / 60)}h ${
                        data.detail.episode_run_time[0] % 60
                      }m`
                    : "N/A"}</span></h4></div>
            </div>
        </div>
        </div>
        <div onClick={() => favDeleteHandler(id)} className="f-deleteContainer">
            <RiDeleteBin5Fill />
        </div>
    </Link>
  )
}

export default FavoriteCard