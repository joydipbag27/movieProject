import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FavoriteCard from "./contents components/FavoriteCard";
import { useDispatch } from "react-redux";
import { favRemove } from "../store/reducers/NotificationSlice";

function Favorites() {
  const [favData, setFavData] = useState(
    JSON.parse(localStorage.getItem("FAVORITES")) || []
  );
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const favDeleteHandler = (id) => {
    setFavData((prev) => [...prev].filter((elem) => elem.detail.id !== id));

    const deleteFavData = favData.find((elem) => elem.detail.id === id)
    dispatch(favRemove(deleteFavData.detail.title || deleteFavData.detail.name))
  };

  useEffect(() => {
    localStorage.setItem("FAVORITES", JSON.stringify(favData));
  }, [favData]);

  console.log(favData);
  return (
    <div className="f-se-Container">
      <div className="f-se-Header">
        <div onClick={() => navigate(-1)} className="c-back">
          <FaArrowLeft />
        </div>
        <h1>Favorites</h1>
      </div>
      <div className="f-se-cardContainer">
        {favData.length > 0 ? (
          favData.map((elem) => (
          <FavoriteCard
            key={elem.detail.id}
            favDeleteHandler={favDeleteHandler}
            id={elem.detail.id}
            data={elem}
          />
        ))
        ) : (
          <div className="f-empty"><h1>No Favorites Yet!</h1></div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
