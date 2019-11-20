import express = require("express");
import admin = require("firebase-admin");

const router = express.Router();
const db = admin.firestore();

/**
 * @api {get} /staff/total Get staff total count
 * @apiGroup Staff
 *
 * @apiSuccess {Integer} total total staff accounts count
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "total": 21
 *     }
 */
router.get("/total", (req, res) => {
  db.collection("staff")
    .get()
    .then(snap => res.json({ total: snap.size }))
    .catch(e => console.log(e));
});

export = router;
