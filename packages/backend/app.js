const express = require("express");
const app = express();

const mysql = require("mysql");

const knex = require("./knex");
const utils = require("./utils");
const Promotion = require("./database/models/Promotion");

app.use("/storage", express.static("storage/public"));

app.get("/", async (req, res) => {
  try {
    const promotions = await Promotion.query();
    console.log(promotions);
    res.json(promotions)
  } catch (error) {
    console.log(error);
  }

  /*   const config = require('./knexfile');

const db = knex(config.development);

// Example query
db.select('*')
  .from('promotions')
  .then((rows) => {
    return utils.sendResponse({res, data: rows});
  })
  .catch((error) => {
    console.error(error);
  })
; */
  /* knex('promotions').select('*')
  .then((rows) => {
    return utils.sendResponse({res, data: rows});
  })
  .catch((error) => {
    console.error(error);
  })
; */
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("App Name API by freely.digital");
  console.log(`App listening on port ${port}.`);
});

//Connecting to the database
/* const config = require('./knexfile');

const db = knex(config.development);

// Example query
db.select('*')
  .from('promotions')
  .then((rows) => {
    console.log(rows);
  })
  .catch((error) => {
    console.error(error);
  })
;
 */
