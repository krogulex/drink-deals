const express = require("express");
const router = express.Router();

/* const Promotion = require("../database/models/Promotion")
const knex = require("../knex"); */

const Promotion = require("../service/promotion");

router.get("", async (req, res) => {
  try {
    const promotions = await Promotion.find({});

    res.json(promotions);
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "",
  /* upload.single("image"), */ async (req, res) => {
    try {

      const {
        name,
        place,
        price,
        allDay,
        allWeek,
        startHours,
        endHours,
        description,
        category,
        day,
        link,
        website,
        googleMaps,
      } = req.body;

      // Create a new promotion record using Mongoose
      const newPromotion = await Promotion.create({
        name: name,
        place: place,
        price: price,
        allDay: allDay,
        allWeek: allWeek,
        startHours: startHours,
        endHours: endHours,
        description: description,
        category: category,
        day: day,
        website: website,
        googleMaps: googleMaps,
        link: link,
        verified: false,
        outdated: false,
      });

      console.log(newPromotion)

      res.status(201).json(newPromotion);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the promotion." });
    }
  }
);

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id)

    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    const updatedPromotion = await Promotion.findOneAndUpdate(
        { _id: id },
        {
      outdated: true,
      updated_at: currentDate,
    });

    if (updatedPromotion === 0) {
      return res
        .status(404)
        .json({ error: "Promotion with this ID is not found." });
    }

    res.status(200).json({ message: "Promotion was updated" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `An error occurred while updating the promotion.` });
  }
});

module.exports = router;
