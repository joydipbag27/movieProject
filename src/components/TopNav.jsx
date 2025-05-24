import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import axios from "../utils/Axios";
import Notification from "./Notification";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../store/reducers/FilterSlice";

function TopNav({ filter }) {
  const reduxFilter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const [hover, setHover] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(
    localStorage.getItem("PROFILE")
      ? JSON.parse(localStorage.getItem("PROFILE")).plan
      : "Regular"
  );
  const [userNameValue, setUserNameValue] = useState(
    localStorage.getItem("PROFILE")
      ? JSON.parse(localStorage.getItem("PROFILE")).userName
      : "Anonymous"
  );

  const isMovie = (elem) => {
    return !!elem.title || !!elem.release_date;
  };

  const isTv = (elem) => {
    return !!elem.name || !!elem.first_air_date;
  };

  const removeQuery = () => {
    setQuery("");
  };

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error fetching Searches: ", error);
    }
  };

  useEffect(() => {
    dispatch(setFilter("all"));
  }, [dispatch]);

  useEffect(() => {
    getSearches();
  }, [query]);

  return (
    <div className="topNavContainer">
      <div className="t-navLeft">
        {filter ? (
          <div className="selectBox">
            <select
              onChange={(e) => dispatch(setFilter(e.target.value))}
              value={reduxFilter.filter}
              name="filter"
              id="filter"
            >
              <option value="all">All</option>
              <option value="movies">Movies</option>
              <option value="tv shows">Tv Shows</option>
            </select>
          </div>
        ) : null}
        <div className="searchBar">
          <input
            value={query}
            spellCheck="false"
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search"
          />

          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              backgroundColor: hover && query.length > 0 ? "#3f3e3e" : "",
            }}
            onClick={() => removeQuery()}
            className="searchIcon"
          >
            {query.length > 0 ? <RxCross1 /> : <IoSearchOutline />}
          </div>

          <div
            className="searchRes"
            style={{ display: query.length > 0 ? "block" : "none" }}
          >
            {searches.map((elem, index) => (
              <Link
                key={index}
                className="searchResItem"
                to={`/details/${
                  isMovie(elem) ? "movie" : isTv(elem) ? "tv" : "unknown"
                }/${elem.id}`}
                onClick={() => removeQuery()}
              >
                <IoSearchOutline />
                <h5>
                  {elem.title ||
                    elem.original_title ||
                    elem.name ||
                    elem.original_name}
                </h5>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="t-navRight">
        <Notification />

        <Link to="/profile" className="profile">
          <img
            src={`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${userNameValue}`}
            alt=""
          />
          <div className="profileName">
            <h5>{userNameValue}</h5>
            <h6>{selectedPlan}</h6>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default TopNav;
