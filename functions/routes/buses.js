const router = require("express").Router();
const firestore = require("firebase-admin").firestore();

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
  firestore
    .collection("buses")
    .get()
    .then(snap => res.json({ total: snap.size }))
    .catch(e => console.log(e));
});

module.exports = router;
