import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css/scrollbar";
import { CircularProgress } from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";
import { updatePromotion } from "../../services/fetchApi";

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

const Table = ({ promotionsData, date, day }) => {
  const [filteredPromotions, setFilteredPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSentMap, setIsSentMap] = useState({});

  useEffect(() => {
    if (promotionsData) {
      const filteredData = promotionsData.filter((el) => el.day.includes(day));
      setFilteredPromotions(filteredData);
      setLoading(false);
    }
  }, [promotionsData, day]);

  const handleReportOutdated = async (promotionId) => {
    try {
      await updatePromotion(promotionId);
      setIsSentMap((prevIsSentMap) => ({
        ...prevIsSentMap,
        [promotionId]: true, // Set isSent to true for the specific promotion
      }));
    } catch (error) {
      console.error("Error updating promotion:", error);
      setIsSentMap((prevIsSentMap) => ({
        ...prevIsSentMap,
        [promotionId]: false, // Set isSent to false for the specific promotion
      }));
    }
  };

  return (
    <div className="table">
      <h2 className="heading">{date}</h2>
      {loading ? (
        <CircularProgress /> // Display the spinner while loading is true
      ) : (
        promotionsData && (
          <Swiper
            slidesPerView={"auto"}
            centeredSlides={true}
            spaceBetween={17}
            grabCursor={true}
            scrollbar={{
              hide: true,
            }}
            modules={[Scrollbar]}
            breakpoints={{
              768: {
                centeredSlides: false,
              },
              1024: {
                centeredSlides: false,
              },
            }}
            className="mySwiper"
          >
            {filteredPromotions.length === 0 && (
              <div className="none-promotions">
                Niestety w dniu dzisiejszym nie ma promek :( Dodaj swoją w
                formularzu!
              </div>
            )}
            {filteredPromotions.map((el) => (
              <SwiperSlide key={el._id} className="promotion-element">
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
                  <h3>
                    {el.name} - {el.place}
                  </h3>
                  <div className="promotion-info">
                    <div className="promotion-left">
                      <h3>Cena: {el.price} zł</h3>
                      <p>
                        Godziny:
                        {el.allDay === true || el.startHours === ""
                          ? " Cały dzień"
                          : ` ${el.startHours} - ${el.endHours}`}
                      </p>
                    </div>
                    <div className="promotion-right">
                      <a
                        href={el.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="promotion-button navigation-button">
                          Nawiguj
                        </button>
                      </a>
                      <a
                        href={el.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="promotion-button">Strona</button>
                      </a>
                    </div>
                  </div>

                  {el.description === "" ? (
                    <p className="additional-info">
                      Dodatkowe informacje: brak
                    </p>
                  ) : (
                    <p className="additional-info">
                      Dodatkowe informacje: {el.description}
                    </p>
                  )}
                  <div className="outdated-div">
                    {el.outdated === 1 ? (
                      <p className="outdated-text">
                        Promocja może już być nieaktualna. W celu weryfikacji skontaktuj się z
                        lokalem.
                      </p>
                    ) : (
                      <div>
                        <button
                          className="promotion-button"
                          onClick={() => handleReportOutdated(el._id)}
                        >
                          Zgłoś nieaktualność promocji
                        </button>
                        {isSentMap[el.id] && (
                          <div className="alert-div">
                            <Alert severity="success" className="alert">
                              <AlertTitle>Sukces</AlertTitle>
                              Promocja została wysłana do ponownej weryfikacji
                              <strong> Dziękujemy!</strong>
                            </Alert>
                          </div>
                        )}
                        {isSentMap[el.id] === false && (
                          <div className="alert-div">
                            <Alert severity="error" className="alert">
                              <AlertTitle>Błąd</AlertTitle>
                              Zgłoszenie nie zostało przyjęte
                              <strong> Spróbuj ponownie później.</strong>
                            </Alert>
                          </div>
                        )}
                      </div>
                    )}
                    <p>Ostatnia aktualizacja: {el.updatedAt} </p>
                    </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )
      )}
    </div>
  );
};

export default Table;
