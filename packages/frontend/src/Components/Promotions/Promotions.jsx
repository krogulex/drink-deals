import React, { useState, useEffect } from "react";

import { fetchPromotionsData } from "../../services/fetchApi";

import Table from "../Table/Table";

const Home = () => {
  const [promotionsData, setPromotionsData] = useState(null);
  const [date, setDate] = useState(new Date());

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

  console.log(promotionsData)

  return (
    <div>
      <Table promotionsData={promotionsData} date={date}></Table>
    </div>
  );
};

export default Home;
