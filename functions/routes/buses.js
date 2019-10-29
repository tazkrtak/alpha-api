const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({ buses: "Not Implemented Yet!" });
});

module.exports = router;