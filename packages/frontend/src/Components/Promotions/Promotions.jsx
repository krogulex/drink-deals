import React, { useState, useEffect } from "react";
import "swiper/css";
import {
  Checkbox,
} from "@mui/material";

import { fetchPromotionsData } from "../../services/fetchApi";

import Table from "../Table/Table";

const Promotions = () => {
  const [promotionsData, setPromotionsData] = useState(null);
  const [dates, setDates] = useState([]);
  const [days, setDays] = useState([]);
  const [filter, setFilter] = useState([]);
  const [filteredPromotions, setFilteredPromotions] = useState();

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

  useEffect(() => {
    if (filter.length === 0) {
      return setFilteredPromotions(promotionsData);
    }
    const filteredPromotionsData = promotionsData.filter((item) =>
    Array.isArray(item.category) && item.category.some((category) => filter.includes(category))
  );
    setFilteredPromotions(filteredPromotionsData);
  }, [promotionsData, filter]);

  const handleCategoryChange = (event) => {
    const categoryName = event.target.name;
    const isChecked = event.target.checked;

    setFilter((prevFilter) => {
      if (isChecked) {
        return [...prevFilter, categoryName];
      } else {
        return prevFilter.filter((category) => category !== categoryName);
      }
    });
  };
  return (
    <div className="promotions-content">
      <div className="filter">
        <h2>Wybierz swój ulubiony trunek!</h2>
        <div className="category">
          {[
            { name: "beer", label: "beer", text: "Piwo" },
            { name: "aperol", label: "aperol", text: "Aperol" },
            { name: "whisky", label: "whisky", text: "Whisky" },
            { name: "gin", label: "gin", text: "Gin" },
            { name: "vodka", label: "vodka", text: "Wódka" },
            { name: "prosecco", label: "prosecco", text: "Prosecco" },
            { name: "martini", label: "martini", text: "Martini" },
            { name: "wine", label: "wine", text: "Wino" },
            { name: "rum", label: "rum", text: "Rum" },
            { name: "tequila", label: "tequila", text: "Tequila" },
            { name: "other", label: "other", text: "Inne" },
          ].map(({ name, label, text }) => (
            <div className="checkbox-div" key={name}>
              <Checkbox
                name={name}
                label={label}
                onChange={handleCategoryChange}
                checked={filter.includes(name)}
              />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {dates.map((date, index) => (
        <Table
          key={index}
          promotionsData={filteredPromotions}
          date={date}
          day={days[index]}
        />
      ))}
    </div>
  );
};

export default Promotions;
