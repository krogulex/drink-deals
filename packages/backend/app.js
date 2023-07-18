const express = require("express");
const bodyParser = require("body-parser");

const mysql = require("mysql");

const knex = require("./knex");
const utils = require("./utils");

const multer = require("multer");
const path = require("path");

const cors = require('cors');

const Promotion = require("./database/models/Promotion");
const { all } = require("axios");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/storage", express.static("storage/public"));

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "storage/public/images"); // The directory where images will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  },
});

const upload = multer({ storage: multerStorage });

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

app.post("/promotions", upload.single("image"), async (req, res) => {
  try {
    console.log(req.body)
    // Extract the promotion data from the request body
    const { name, place, price, allDay, allWeek, startHours, endHours, description, category, day, link} = req.body;

    const image = req.file ? req.file.filename : null;

    const isAllDay = req.body.allDay === 'true';
    const isAllWeek = req.body.allWeek === 'true';

    // Create a new promotion record using Knex
    const newPromotion = await Promotion.query().insert({
      name: name,
      place: place,
      price: price,
      allDay: isAllDay,
      allWeek: isAllWeek,
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
