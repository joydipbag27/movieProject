import { FaCirclePlay } from "react-icons/fa6";
import { Link } from "react-router-dom";

function History() {
  
  const historyData = JSON.parse(localStorage.getItem("MOVIE_HISTORY")) || [];

  const isMovie = (elem) => {
    return !!elem?.detail?.title || !!elem?.detail?.release_date;
  };

  const isTv = (elem) => {
    return !!elem?.detail?.name || !!elem?.detail?.first_air_date;
  };


  return (
    <div className="history">
      <h4>Continue Watching</h4>
      {historyData.length > 0  ? (
      historyData.map((elem) => (
        <Link 
        key={elem.detail.id}
        className="historyCard" 
        to={`/details/${isMovie(elem) ? 'movie' : isTv(elem) ? 'tv' : null}/${elem.detail.id}`}
        >
          <div className="historyCardInner">
            <img
              src={`https://image.tmdb.org/t/p/original${
                elem.detail.poster_path || elem.detail.backDrop_path
              }`}
              alt={elem.detail.id}
            />
            <div className="historyTitle">
              <h5>
                {isMovie(elem) 
                  ? (elem.detail.title.length > 20 ? elem.detail.title.slice(0, 20) + "..." : elem.detail.title) 
                  : (elem.detail.name.length > 20 ? elem.detail.name.slice(0, 20) + "..." : elem.detail.name)}
              </h5>
            </div>
          </div>
          <div className="historyPlay">
            <FaCirclePlay />
          </div>
        </Link>
      ))
  ) : <h6>No History Yet!</h6>}
    </div>
  )
}

export default History;
