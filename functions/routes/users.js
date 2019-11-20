const router = require("express").Router();
const firestore = require("firebase-admin").firestore();

/**
 * @api {get} /users/total Get users total count
 * @apiGroup Users
 *
 * @apiSuccess {Integer} total total users accounts count
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "total": 65
 *     }
 */
router.get("/total", (req, res) => {
  firestore
    .collection("users")
    .get()
    .then(snap => res.json({ total: snap.size }))
    .catch(e => console.log(e));
});

module.exports = router;
