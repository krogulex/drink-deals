import { useState } from "react";

import liquorBottlesImage from "../../images/liquor-bottles.jpg";
import aperolImage from "../../images/aperol.jpg";
import beerImage from "../../images/beer.jpg";
import ginImage from "../../images/gin.jpg";
import martiniImage from "../../images/martini.jpg";
import proseccoImage from "../../images/prosecco.jpg";
import rumImage from "../../images/rum.jpg";
import tequilaImage from "../../images/tequila.jpg";
import vodkaImage from "../../images/vodka.jpg";
import whiskyImage from "../../images/whisky.jpg";
import wineImage from "../../images/wine.jpg";

const categoryImages = {
  inne: liquorBottlesImage,
  beer: beerImage,
  aperol: aperolImage,
  gin: ginImage,
  martini: martiniImage,
  prosecco: proseccoImage,
  rum: rumImage,
  tequila: tequilaImage,
  vodka: vodkaImage,
  whisky: whiskyImage,
  wine: wineImage,
};

const Table = ({ promotionsData, date }) => {
  console.log(date)
  return (
    <div className="table">
      <h2 className="heading">dzisiaj</h2>
      {promotionsData && (
        <ul className="promotion-list">
          {promotionsData.map((el) => (
            <li key={el.id} className="promotion-element">
              {el.category.length === 0 ||
              el.category.includes("other") ||
              el.category.length >= 2 ? (
                <img
                  src={liquorBottlesImage}
                  alt="Zdjęcie alkoholu"
                  className="alcohol-image"
                />
              ) : el.category in categoryImages ? (
                <img
                  src={categoryImages[el.category]}
                  alt={`Zdjęcie ${el.category}`}
                  className="alcohol-image"
                />
              ) : null}
              <div className="promotion-div">
                <h3>     {el.name} - {el.place}</h3>
              <div className="promotion-info">
                <div className="promotion-left">
                <h3>Cena: {el.price} zł</h3>
                <p>
                  Godziny:
                  {el.allDay === 1 || el.startHours === ""
                    ? " Cały dzień"
                    : ` ${el.startHours} - ${el.endHours}`}
                </p>
              </div>
              <div className="promotion-right">
                <a href={el.googleMap}>
                  <button className="promotion-button">Nawiguj</button>
                </a>
                <a href={el.link}>
                  <button className="promotion-button">Strona</button>
                </a>
              </div>
              </div>
              
              {el.description === "" ? (
                ""
              ) : (
                <p className="additional-info">Dodatkowe informacje: {el.description}</p>
              )}
              </div>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Table;
