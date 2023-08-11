const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

/* const multer = require("multer");
const path = require("path"); */

const cors = require("cors");

const router = require("./routes/promotions");

const app = express();

const mongoose = require("mongoose");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* app.use("/storage", express.static("storage/public"));

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

const upload = multer({ storage: multerStorage }); */

app.use("/promotions", router);

const PORT = process.env.PORT || 8000;

/* const DB_URI = process.env.DB_URI;

 const connection = mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); 

 connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Database connection failed. Error message: ${err.message}`);
    process.exit(1);
  });
 */

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_URI);
    console.log("Connect to MongoDb successfully");
  } catch (error) {
    console.log("Connect failed" + error);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
