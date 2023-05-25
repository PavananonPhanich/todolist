const express = require("express");
const card = require("../models/card");
const router = express.Router();

router.use(express.json());

router.get("/cards", async (req, res) => {
  const result = await card.find();
  res.json(result);
});

router.get("/:title", async (req, res) => {
  const result = await card.findByName(req.params.title);
  res.json(result);
});

router.post("/", async (req, res) => {
  card.create(req.body).then((data) => {
    res.json(data);
  });
});

router.put("/:title", async (req, res) => {
  const result = card
    .findByNameAndUpdate(req.params.title, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Card not found.`,
        });
      } else {
        res.send({ message: "Card updated succcessfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
});

router.delete("/:title", async (req, res) => {
  const result = card
    .findByNameAndRemove(req.params.title)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Card not found.`,
        });
      } else {
        res.send({ message: "Card deleted successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
});

module.exports = router;
