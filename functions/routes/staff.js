const router = require("express").Router();
const firestore = require("firebase-admin").firestore();

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
  firestore
    .collection("staff")
    .get()
    .then(snap => res.json({ total: snap.size }))
    .catch(e => console.log(e));
});

module.exports = router;
