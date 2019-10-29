const router = require("express").Router();

router.get("/", (req, res) => {
    res.json({ transactions: "Not Implemented Yet!" });
});

module.exports = router;
