import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "../utils/Axios";
import { FaStar } from "react-icons/fa";
import { IoTimerOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { MdMovieFilter } from "react-icons/md";
import { TbRating18Plus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { loadMovieDetails, removeMovie } from "../store/actions/movieActions";
import { MdMovieCreation } from "react-icons/md";
import { ImTv } from "react-icons/im";
import CastContainer from "./contents components/CastContainer";
import DetailImages from "./contents components/DetailImages";
import { FaImdb } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaWikipediaW } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import VideoPlayer from "./contents components/VideoPlayer";
import Videos from "./contents components/Videos";
import Similar from "./contents components/Similar";
import { favAdded } from "../store/reducers/NotificationSlice";

function DetailsContents({ incrementLoading, decrementLoading }) {
  document.title = "DogmovieHd | Details";

  const { info } = useSelector((state) => state.movie);
  const { notifications } = useSelector((state) => state.notification);
  const [genre, setGenre] = useState([]);
  const { mediaId, mediaType } = useParams();
  const dispatch = useDispatch();
  const [selectVideo, setSelectVideo] = useState("");
  const [videoAvailable, setVideoAvailable] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState("");
  const [fav, setFav] = useState(
    JSON.parse(localStorage.getItem("FAVORITES")) || []
  );

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
  };

  useEffect(() => {
    if (info?.videos.length > 0) {
      setVideoAvailable(true);
    } else {
      setVideoAvailable(false);
    }
    setSelectVideo("");
  }, [info]);

  const getGenre = async () => {
    try {
      const res = await axios.get("/genre/movie/list");
      const genres = res.data.genres;
      setGenre(genres);
    } catch (error) {
      console.log("error: trying to get genre", error);
    }
  };

  useEffect(() => {
    incrementLoading();
    dispatch(loadMovieDetails(mediaType, mediaId)).finally(() =>
      decrementLoading()
    );
    getGenre();
    return () => {
      dispatch(removeMovie());
    };
  }, [mediaId, mediaType]);

  const handleFavorites = () => {
    const currentId = info?.detail?.id;
    if (!currentId) return;
    if (fav.some((item) => item.id === currentId)) {
      return;
    }
    if (!fav.some((item) => item.detail?.id === info.detail?.id)) {
      setFav([
        ...fav,
        info,
      ]);
      dispatch(favAdded(mediaType));
    }
  };

  useEffect(() => {
    localStorage.setItem("FAVORITES", JSON.stringify(fav));
  }, [fav]);

  return (
    <div className="detailsContentsContainer">
      <div
        className="d-cover"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8),
                     rgba(0, 0, 0, 0)),linear-gradient(to left, rgba(0, 0, 0, 0.6),
                     rgba(0, 0, 0, 0)),
                     url(https://image.tmdb.org/t/p/original${
                       info?.detail?.seasons?.find(
                         (elem) => elem.id === Number(selectedSeason)
                       )?.poster_path ||
                       info?.detail?.backdrop_path ||
                       info?.detail?.poster_path
                     })`,
        }}
      >
        <div className="d-left">
          <div className="d-badges">
            <div className="d-badge">
              {mediaType === "movie" ? <MdMovieCreation /> : <ImTv />}
              <h4>{mediaType === "movie" ? "Movie" : "Tv Show"}</h4>
            </div>
            <div className="d-badge">
              {info?.detail?.adult ? <TbRating18Plus /> : <MdMovieFilter />}
              <h4>{info?.detail?.adult ? "+18" : "All Audiences"}</h4>
            </div>
          </div>
          <div className="d-left-bottom">
            <h1>
              {info?.detail?.title ||
                info?.detail?.original_title ||
                info?.detail?.name ||
                "N/A"}{" "}
              {info?.detail?.seasons
                ?.find((elem) => elem.id === Number(selectedSeason))
                ?.name.replace("Season ", ": S")
                .toUpperCase()}
            </h1>
            <div className="d-genre">
              {info?.detail &&
              info?.detail?.genres &&
              info?.detail?.genres.length > 0 ? (
                info?.detail?.genres.map((elem) => {
                  return <h4 key={elem.id}>{elem.name}</h4>;
                })
              ) : (
                <h4>Not Available</h4>
              )}
            </div>
            <div className="d-info">
              <p>{info?.detail?.overview ? info?.detail?.overview : "N/A"}</p>
            </div>
            <div className="d-buttons">
              {info?.watchProviders?.flatrate ? (
                <Link
                  to={info.watchProviders.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-button whiteTheme"
                >
                  <FaPlay />
                  <h4>Stream Now</h4>
                </Link>
              ) : info?.watchProviders?.rent ? (
                <Link
                  to={info.watchProviders.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-button whiteTheme"
                >
                  <FaPlay />
                  <h4>Rent Now</h4>
                </Link>
              ) : null}

              <div
                onClick={() => handleFavorites()}
                className="d-button blackTheme"
              >
                <FaRegHeart />
                <h4>Add to Favorites</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="d-right">
          <div className="d-right-top">
            {info?.externalId?.imdb_id ? (
              <Link
                target="_blank"
                to={`https://www.imdb.com/title/${info.externalId.imdb_id}`}
              >
                <FaImdb />
              </Link>
            ) : null}
            {info?.externalId?.wikidata_id ? (
              <Link
                target="_blank"
                to={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
              >
                <FaWikipediaW />
              </Link>
            ) : null}
            {info?.detail?.homepage ? (
              <Link target="_blank" to={info.detail.homepage}>
                <FaExternalLinkAlt />
              </Link>
            ) : null}
          </div>
          <div className="d-right-bottom">
            {info?.detail?.seasons ? (
              <div className="d-right-seasons">
                <select
                  name="Seasons"
                  id="season"
                  value={selectedSeason}
                  onChange={handleSeasonChange}
                >
                  {info?.detail?.seasons?.map((elem) => (
                    <option value={elem.id} key={elem.id}>
                      Season {elem.season_number}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            <div className="d-right-infos">
              <div className="rating">
                <FaStar />
                <h4>
                  {info?.detail?.vote_average
                    ? (info?.detail?.vote_average).toFixed(1)
                    : "N/A"}
                </h4>
              </div>
              <div className="releasingYear">
                <SlCalender />
                <h4>
                  {info?.detail?.release_date || info?.detail?.last_air_date
                    ? (
                        info?.detail?.release_date ||
                        info?.detail?.last_air_date
                      ).split("-")[0]
                    : "N/A"}
                </h4>
              </div>
              <div className="duration">
                <IoTimerOutline />
                <h4>
                  {info?.detail?.runtime
                    ? `${Math.floor(info?.detail?.runtime / 60)}h ${
                        info?.detail?.runtime % 60
                      }m`
                    : info?.detail?.episode_run_time &&
                      info?.detail?.episode_run_time.length > 0
                    ? `${Math.floor(info?.detail?.episode_run_time[0] / 60)}h ${
                        info?.detail?.episode_run_time[0] % 60
                      }m`
                    : "N/A"}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="castAndSimilar">
        <CastContainer />
        <DetailImages />
      </div>

      <div
        className={
          videoAvailable
            ? "playerAndVideos"
            : "playerAndVideos noVideo-playerAndVideos"
        }
      >
        <VideoPlayer videoAvailable={videoAvailable} data={selectVideo} />
        <Videos
          videoAvailable={videoAvailable}
          setSelectVideo={setSelectVideo}
        />
      </div>

      <Similar />
    </div>
  );
}

export default DetailsContents;
