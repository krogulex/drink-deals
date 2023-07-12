import React, { useState, useEffect } from "react";
import "swiper/css";

import { fetchPromotionsData } from "../../services/fetchApi";

import Table from "../Table/Table";

const Home = () => {
  const [promotionsData, setPromotionsData] = useState(null);
  const [dates, setDates] = useState([]);
  const [days, setDays] = useState([])

  useEffect(() => {

    // fetching promotion data
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

    //getting date
    const currentDate = new Date();
    const formattedDates = [];
    const formattedDays = []
    const daysOfWeek = [
      "niedziela",
      "poniedziałek",
      "wtorek",
      "środa",
      "czwartek",
      "piątek",
      "sobota",
    ];
    const daysOfWeekInEnglish = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() + i);
      const dayOfWeek =  i === 0 ? "dzisiaj" : daysOfWeek[date.getDay()];
      const formattedDate = `${dayOfWeek}, ${date.toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "numeric",
      })}`;
      
      const formattedDay = daysOfWeekInEnglish[date.getDay()];


      formattedDates.push(formattedDate);
formattedDays.push(formattedDay)
    }
    setDates(formattedDates);
    setDays(formattedDays)
  }, []);

  return (
    <div>
        {dates.map((date, index) => (
            <Table key={index} promotionsData={promotionsData} date={date} day={days[index]} />
        ))}
    </div>
  );
};

export default Home;