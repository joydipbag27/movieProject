import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { motion } from "framer-motion";
import axios from "../../utils/Axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function CardContainer({ category, type, onStart, onFinish }) {

  const {filter} = useSelector((state) => state.filter)
  const cardContainerRef = useRef(null);
  const [cardData, setCardData] = useState([]);

  const getCardData = async () => {
    onStart();
    try {
      let url = "";
      let params = {};

      if (category === "bengali") {
        url = "https://api.themoviedb.org/3/discover/movie";
        params = {
          api_key: "YOUR_API_KEY",
          with_original_language: "bn",
        };
      } else if (category === "hindi") {
        url = "https://api.themoviedb.org/3/discover/movie";
        params = {
          api_key: "YOUR_API_KEY",
          with_original_language: "hi",
        };
      } else if (category === "popular_hindi_shows") {
        url = "https://api.themoviedb.org/3/discover/tv";
        params = {
          api_key: "YOUR_API_KEY",
          with_original_language: "hi",
          sort_by: "popularity.desc",
          first_air_date_gte: "2020-01-01",
          vote_count_gte: 50,
          vote_average_gte: 6.5,
          with_watch_providers: "8,9,384,531",
        };
      } else if (category === "popular_bengali_shows") {
        url = "https://api.themoviedb.org/3/discover/tv";
        params = {
          api_key: "YOUR_API_KEY",
          with_original_language: "bn",
          sort_by: "popularity.desc",
          first_air_date_gte: "2020-01-01",
          vote_count_gte: 50,
          vote_average_gte: 8.5,
          with_watch_providers: "8,9,384,531",
        };
      } else if (category === "for_kids") {
        url = "https://api.themoviedb.org/3/discover/tv";
        params = {
          api_key: "YOUR_API_KEY",
          language: "hi-IN",
          sort_by: "popularity.desc",
          first_air_date_gte: "2020-01-01",
          vote_count_gte: 50,
          vote_average_gte: 6.5,
          with_genres: "16,10751",
          with_watch_providers: "8,9,384,531",
        };
      } else if (category === "trending_thriller_movies") {
        url = "https://api.themoviedb.org/3/discover/movie";
        params = {
          api_key: "YOUR_API_KEY",
          with_genres: "53", 
          sort_by: "popularity.desc",
          type: "movie", 
          page: 10, 
          vote_count_gte: 50, 
          vote_average_gte: 6.5, 
        };
      } else if (category === "marvel_cinematic_universe") {
        url = "https://api.themoviedb.org/3/discover/movie";
        params = {
          api_key: "YOUR_API_KEY",
          with_companies: "420", 
          sort_by: "popularity.desc", 
          page: 1, 
          vote_count_gte: 50, 
          vote_average_gte: 6.5, 
        };
      } else if (category === "popular_romantic_comedies") {
        url = "https://api.themoviedb.org/3/discover/movie";
        params = {
          api_key: "YOUR_API_KEY",
          with_genres: "35,10749", 
          sort_by: "popularity.desc", 
        };
      } else if (category === "oscar_nominees") {
        url = "https://api.themoviedb.org/3/discover/movie";
        params = {
          api_key: "YOUR_API_KEY",
          certification_country: "US", 
          certification: "R", 
          sort_by: "vote_average.desc", 
          vote_count_gte: 50, 
        };
      } else if (category === "bengali_action_movies") {
        url = "https://api.themoviedb.org/3/discover/movie";
        params = {
          api_key: "YOUR_API_KEY",
          with_original_language: "bn", 
          with_genres: "28", 
          sort_by: "popularity.desc",
          page: 6, 
          vote_count_gte: 50, 
          vote_average_gte: 7.5, 
        };
      } else if (category === "hindi_horror_movies") {
        url = "https://api.themoviedb.org/3/discover/movie";
        params = {
          api_key: "YOUR_API_KEY",
          with_original_language: "hi", 
          with_genres: "27", 
          sort_by: "popularity.desc", 
          vote_count_gte: 50, 
          vote_average_gte: 6.0, 
        };
      } else if (category === "bengali_romantic_movies") {
        url = "https://api.themoviedb.org/3/discover/movie";
        params = {
          api_key: "YOUR_API_KEY",
          with_original_language: "bn", 
          with_genres: "10749", 
          sort_by: "popularity.desc", 
          vote_count_gte: 50, 
          vote_average_gte: 8.5, 
        };
      } else if (category === "hindi_sci_fi_movies") {
        url = "https://api.themoviedb.org/3/discover/movie";
        params = {
          api_key: "YOUR_API_KEY",
          with_original_language: "hi", 
          with_genres: "878", 
          sort_by: "popularity.desc", 
          vote_count_gte: 50, 
          vote_average_gte: 6.5, 
        };
      } else if (category === "bengali_thriller_movies") {
        url = "https://api.themoviedb.org/3/discover/movie";
        params = {
          api_key: "YOUR_API_KEY",
          with_original_language: "bn", 
          with_genres: "53", 
          sort_by: "popularity.desc", 
          vote_count_gte: 50, 
          vote_average_gte: 6.5, 
        };
      } else if (category === "english_sci_fi") {
        url = "https://api.themoviedb.org/3/discover/movie";
        params = {
          api_key: "YOUR_API_KEY",
          with_genres: "28,12,878", 
          sort_by: "popularity.desc", 
          page: 3, 
          vote_count_gte: 50, 
          vote_average_gte: 6.5, 
        };
      } else if (category === "popular_web_series") {
        url = "https://api.themoviedb.org/3/discover/tv";
        params = {
          api_key: "YOUR_API_KEY",
          sort_by: "popularity.desc",
          vote_count_gte: 1000,
          vote_average_gte: 7.5,
          with_genres: "18,10765,9648", 
          with_original_language: "en",
          page: 1,
        };
      } else {
        url = `/movie/${category}`;
      }
      const res = await axios.get(url, { params });
      setCardData(res.data.results);
    } catch (error) {
      console.error("Error fetching card data:", error);
    } finally {
      onFinish();
    }
  };

  const GoArrowLeft = () => {
    if (cardContainerRef.current) {
      const cardWidth =
        cardContainerRef.current.querySelector(".card").offsetWidth;
      cardContainerRef.current.scrollLeft -= cardWidth + 16;
    }
  };

  const GoArrowRight = () => {
    if (cardContainerRef.current) {
      const cardWidth =
        cardContainerRef.current.querySelector(".card").offsetWidth;
      cardContainerRef.current.scrollLeft += cardWidth + 16;
    }
  };

  useEffect(() => {
    getCardData();
  }, [category]);

  return filter === type || filter === "all" ? (
    <div className="cardContainer">
      <Link to={`/categories/${category}`}>
        <h2>
          {category
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </h2>
      </Link>
      <motion.div
        className="cards"
        ref={cardContainerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div onClick={() => GoArrowLeft()} className="cardBtn leftBtn">
          <MdKeyboardArrowLeft />
        </div>
        {cardData.map((elem) => (
          <Card data={elem} key={elem.id} />
        ))}
        <div onClick={() => GoArrowRight()} className="cardBtn rightBtn">
          <MdKeyboardArrowRight />
        </div>
      </motion.div>
    </div>
  ) : null;
}

export default CardContainer;
