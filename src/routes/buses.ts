import express = require("express");
import admin = require("firebase-admin");

const router = express.Router();
const db = admin.firestore();

/**
 * @api {get} /buses/total Get buses total count
 * @apiGroup Buses
 *
 * @apiSuccess {Integer} total total buses count
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "total": 16
 *     }
 */
router.get("/total", (req, res) => {
  db.collection("buses")
    .get()
    .then(snap => res.json({ total: snap.size }))
    .catch(e => console.log(e));
});

module.exports = router;
