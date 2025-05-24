import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/Axios";
import Card from "./contents components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";

function Category() {
  document.title = "DogmovieHD | Category";

  const navigate = useNavigate();

  const { category } = useParams("category");
  const [cardData, setCardData] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingCount, setLoadingCount] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (loadingCount > 0) {
      setShowLoader(true);
    } else if (loadingCount === 0) {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [loadingCount]);

  const incrementLoading = () => setLoadingCount((prev) => prev + 1);
  const decrementLoading = () =>
    setLoadingCount((prev) => Math.max(prev - 1, 0));

  const getCardData = async () => {
    incrementLoading();
    try {
      let url = "";
      let params = {};

      if (category === "bengali") {
        url = "https://api.themoviedb.org/3/discover/movie";
        params = {
          api_key: "YOUR_API_KEY",
          with_original_language: "bn",
          page: `${page}`,
        };
      } else if (category === "hindi") {
        url = "https://api.themoviedb.org/3/discover/movie";
        params = {
          api_key: "YOUR_API_KEY",
          with_original_language: "hi",
          page: `${page}`,
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
          page: `${page}`,
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
          page: `${page}`,
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
          page: `${page}`,
        };
      } else if (category === "trending_thriller_movies") {
        url = "https://api.themoviedb.org/3/discover/movie";
        params = {
          api_key: "YOUR_API_KEY",
          with_genres: "53",
          sort_by: "popularity.desc",
          type: "movie",
          page: `${page}`,
          vote_count_gte: 50,
          vote_average_gte: 6.5,
        };
      } else if (category === "marvel_cinematic_universe") {
        url = "https://api.themoviedb.org/3/discover/movie";
        params = {
          api_key: "YOUR_API_KEY",
          with_companies: "420",
          sort_by: "popularity.desc",
          page: `${page}`,
          vote_count_gte: 50,
          vote_average_gte: 6.5,
        };
      } else if (category === "popular_romantic_comedies") {
        url = "https://api.themoviedb.org/3/discover/movie";
        params = {
          api_key: "YOUR_API_KEY",
          with_genres: "35,10749",
          sort_by: "popularity.desc",
          page: `${page}`,
        };
      } else if (category === "oscar_nominees") {
        url = "https://api.themoviedb.org/3/discover/movie";
        params = {
          api_key: "YOUR_API_KEY",
          certification_country: "US",
          certification: "R",
          sort_by: "vote_average.desc",
          vote_count_gte: 50,
          page: `${page}`,
        };
      } else if (category === "bengali_action_movies") {
        url = "https://api.themoviedb.org/3/discover/movie";
        params = {
          api_key: "YOUR_API_KEY",
          with_original_language: "bn",
          with_genres: "28",
          sort_by: "popularity.desc",
          page: `${page}`,
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
          page: `${page}`,
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
          page: `${page}`,
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
          page: `${page}`,
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
          page: `${page}`,
        };
      } else if (category === "english_sci_fi") {
        url = "https://api.themoviedb.org/3/discover/movie";
        params = {
          api_key: "YOUR_API_KEY",
          with_genres: "28,12,878",
          sort_by: "popularity.desc",
          page: `${page}`,
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
          page: `${page}`,
        };
      } else {
        url = `/movie/${category}?language=en-US&page=${page}`;
      }
      const res = await axios.get(url, { params });

      if (res.data.results.length > 0) {
        setCardData((prev) => {
          const combined = [...prev, ...res.data.results];
          return combined.filter(
            (item, index, self) =>
              self.findIndex((i) => i.id === item.id) === index
          );
        });
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching card data:", error);
    } finally {
      decrementLoading();
    }
  };

  useEffect(() => {
    setCardData([]);
    getCardData();
    setPage(1);
  }, [category]);

  return (
    <>
      {showLoader ? <Loading /> : null}
      <InfiniteScroll
        dataLength={cardData.length}
        next={getCardData}
        loader={<h2>Loading...</h2>}
        hasMore={hasMore}
      >
        <div className="categoryContainer">
          <div className="c-header">
            <div className="c-back" onClick={() => navigate(-1)}>
              <FaArrowLeft />
            </div>
            <h1>
              {category
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </h1>
          </div>
          <div className="c-cardContainer">
            {cardData &&
              cardData.map((elem) => (
                <Card big={true} key={elem.id} data={elem} />
              ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

export default Category;
