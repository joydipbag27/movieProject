import React from "react";
import HeaderContent from "./contents components/HeaderContent";
import CardContainer from "./contents components/CardContainer";

function Contents({ incrementLoading, decrementLoading }) {
  const categories = [
    {category:"now_playing", type: "movies"},
    {category:"popular", type: "movies"},
    {category:"top_rated", type: "movies"},
    {category:"upcoming", type: "movies"},
    {category:"bengali", type: "movies"},
    {category:"hindi", type: "movies"},
    {category:"popular_hindi_shows", type: "tv shows"},
    {category:"popular_bengali_shows", type: "tv shows"},
    {category:"for_kids", type: "tv shows"},
  ];
  return (
    <div className="contentsContainer">
      <HeaderContent onStart={incrementLoading} onFinish={decrementLoading} />

      {categories.map((elem, index) => (
        <CardContainer
          onStart={incrementLoading}
          onFinish={decrementLoading}
          key={index}
          type={elem.type}
          category={elem.category}
        />
      ))}
    </div>
  );
}

export default Contents;
