import express = require("express");

const router = express.Router();

router.get("/status", (req, res) => {
  res.json({ status: "alive" });
});

router.get("/about", (req, res) => {
  res.json({
    name: "Tazkrtak",
    description: "Tazkrtak REST API",
    apiVersion: "v1"
  });
});

export = router;
