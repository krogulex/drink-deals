import React, { useState, useEffect } from "react";
import "swiper/css";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  FormControl,
  Checkbox,
} from "@mui/material";

import { fetchPromotionsData } from "../../services/fetchApi";

import Table from "../Table/Table";

const Home = () => {
  const [promotionsData, setPromotionsData] = useState(null);
  const [dates, setDates] = useState([]);
  const [days, setDays] = useState([]);
  const [filter, setFilter] = useState([])

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
    const formattedDays = [];
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
      const dayOfWeek = i === 0 ? "dzisiaj" : daysOfWeek[date.getDay()];
      const formattedDate = `${dayOfWeek}, ${date.toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "numeric",
      })}`;

      const formattedDay = daysOfWeekInEnglish[date.getDay()];

      formattedDates.push(formattedDate);
      formattedDays.push(formattedDay);
    }
    setDates(formattedDates);
    setDays(formattedDays);
  }, []);

  const handleCategoryChange = () => {

    //dodawaj do filtrów kolejno oraz zmien na chcked. Następnie wyfiltruj dawaną tablicę
    setFilter((el) => {
      console.log(el)
    })
  };
  console.log(filter);
  return (
    <div>
      <div className="filter">
        <h2>Wybierz swój ulubiony trunek!</h2>
        <div className="category">
          <Checkbox
            name="beer"
            label="beer"
            onChange={handleCategoryChange}
            checked={false}
          ></Checkbox>
          <span>Piwo</span>
          <Checkbox
            name="aperol"
            label="aperol"
            onChange={handleCategoryChange}
            checked={false}
          ></Checkbox>{" "}
          <span>Aperol</span>
          <Checkbox
            name="whisky"
            label="whisky"
            onChange={handleCategoryChange}
            checked={false}
          ></Checkbox>
          <span>Whisky</span>
          <Checkbox
            name="gin"
            label="gin"
            onChange={handleCategoryChange}
            checked={false}
          ></Checkbox>
          <span>Gin</span>
          <Checkbox
            name="vodka"
            label="vodka"
            onChange={handleCategoryChange}
            checked={false}
          ></Checkbox>
          <span>Wódka</span>
          <Checkbox
            name="prosecco"
            label="prosecco"
            onChange={handleCategoryChange}
            checked={false}
          ></Checkbox>{" "}
          <span>Prosecco</span>
          <Checkbox
            name="martini"
            label="martini"
            onChange={handleCategoryChange}
            checked={false}
          ></Checkbox>
          <span>Martini</span>
          <Checkbox
            name="wine"
            label="wine"
            onChange={handleCategoryChange}
            checked={false}
          ></Checkbox>
          <span>Wino</span>
          <Checkbox
            name="rum"
            label="rum"
            onChange={handleCategoryChange}
            checked={false}
          ></Checkbox>
          <span>Rum</span>
          <Checkbox
            name="tequila"
            label="tequila"
            onChange={handleCategoryChange}
            checked={false}
          ></Checkbox>
          <span>Tequila</span>
          <Checkbox
            name="other"
            label="other"
            onChange={handleCategoryChange}
            checked={false}
          ></Checkbox>
          <span>Inne</span>
        </div>
      </div>

      {dates.map((date, index) => (
        <Table
          key={index}
          promotionsData={promotionsData}
          date={date}
          day={days[index]}
        />
      ))}
    </div>
  );
};

export default Home;
