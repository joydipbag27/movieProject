import CardContainer from "./contents components/CardContainer";

function ExploreContents( { incrementLoading, decrementLoading }) {
  const categories = [
    {category:"trending_thriller_movies", type: "movies"},
    {category:"marvel_cinematic_universe", type: "movie"},
    {category:"popular_web_series", type: "tv shows"},
    {category:"english_sci_fi", type: "movie"},
    {category:"popular_romantic_comedies", type: "movie"},
    {category:"oscar_nominees", type: "movie"},
    {category:"bengali_action_movies", type: "movies"},
    {category:"hindi_horror_movies", type: "movies"},
    {category:"bengali_romantic_movies", type: "movies"},
    {category:"hindi_sci_fi_movies", type: "movies"},
    {category:"bengali_thriller_movies", type: "movies"}
  ];
  return <div className="exploreContentsContainer">
    {categories.map((elem, index) => (
        <CardContainer
          onStart={incrementLoading}
          onFinish={decrementLoading}
          key={index}
          category={elem.category}
          type={elem.type}
        />
      ))}
  </div>;
}

export default ExploreContents;
