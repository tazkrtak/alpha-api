const router = require("express").Router();
const firestore = require("firebase-admin").firestore();

router.get("/total", (req, res) => {
  firestore
    .collection("staff")
    .get()
    .then(snap => res.json({ total: snap.size }))
    .catch(e => console.log(e));
});

module.exports = router;
