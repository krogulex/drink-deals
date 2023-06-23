const express = require("express");

const mysql = require("mysql");

const knex = require("./knex");
const utils = require("./utils");

const cors = require('cors');


const Promotion = require("./database/models/Promotion");

const app = express();

app.use(cors());

app.use("/storage", express.static("storage/public"));

app.get("/", async (req, res) => {
  try {
    const promotions = await Promotion.query();
    console.log(promotions);
    res.json(promotions)
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("App Name API by freely.digital");
  console.log(`App listening on port ${port}.`);
});
