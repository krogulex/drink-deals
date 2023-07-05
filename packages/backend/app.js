const express = require("express");
const bodyParser = require("body-parser");

const mysql = require("mysql");

const knex = require("./knex");
const utils = require("./utils");

const cors = require('cors');

const Promotion = require("./database/models/Promotion");
const { all } = require("axios");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/storage", express.static("storage/public"));

app.get("/promotions", async (req, res) => {
  try {
    const promotions = await Promotion.query();
    promotions.map((promotion) => {
      promotion.day = JSON.parse(promotion.day)
    })
    promotions.map((promotion) => {
      promotion.category = JSON.parse(promotion.category)
    })
    res.json(promotions)
  } catch (error) {
    console.log(error);
  }
});

app.post("/promotions", async (req, res) => {
  try {
    console.log(req.body)
    // Extract the promotion data from the request body
    const { name, place, price, allDay, allWeek, startHours, endHours, description, category, day, link, image } = req.body;

    // Create a new promotion record using Knex
    const newPromotion = await Promotion.query().insert({
      name: name,
      place: place,
      price: price,
      allDay: allDay,
      allWeek: allWeek,
      startHours: startHours,
      endHours: endHours,
      description: description,
      category: JSON.stringify(category),
      day: JSON.stringify(day),
      link: link,
      image: image,
    });

    res.status(201).json(newPromotion);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while creating the promotion." });
  }
});



const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("App Name API by freely.digital");
  console.log(`App listening on port ${port}.`);
});
