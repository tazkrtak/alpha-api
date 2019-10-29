const router = require("express").Router();

router.get("/", (req, res) => {
    res.json({ users: "Not Implemented Yet!" });
});

module.exports = router;
