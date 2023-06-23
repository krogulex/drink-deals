import React, { useState, useEffect } from "react";

import { fetchPromotionsData } from "../../services/fetchApi";

const Home = () => {
  const [promotionsData, setPromotionsData] = useState(null);

  useEffect(() => {
    const fetchPromotions = () => {
      fetchPromotionsData()
        .then((data) => {
          setPromotionsData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchPromotions();
  }, []);

  console.log(promotionsData);

  return (
    <div>
      <h1>Hello, World!</h1>
      {promotionsData && (
        <ul>
          {promotionsData.map((el) => (
            <li key={el._id}>{el.name}, {el.place}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
