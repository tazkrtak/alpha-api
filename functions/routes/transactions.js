const moment = require("moment");
const router = require("express").Router();
const firestore = require("firebase-admin").firestore();

/**
 * @api {get} /transactions/total Get transactions total count
 * @apiGroup Transactions
 *
 * @apiSuccess {Integer} total total transactions count
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "total": 34
 *     }
 */
router.get("/total", (req, res) => {
  fetchTransactions()
    .then(snap => res.json({ total: snap.size }))
    .catch(e => console.log(e));
});

/**
 * @api {get} /transactions/income Get transactions income
 * @apiGroup Transactions
 *
 * @apiSuccess {Double} total total transactions count
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "total": 564.5
 *     }
 */
router.get("/income", (req, res) => {
  fetchTransactions()
    .then(snap =>
      res.json({
        total: snap.docs.reduce(
          (total, doc) => total - doc.data().amount,
          0
        )
      })
    )
    .catch(e => console.log(e));
});

/**
 * @api {get} /transactions/months Get transactions grouped by month
 * @apiGroup Transactions
 *
 * @apiSuccess {Integer} number month number
 * @apiSuccess {String} name month name
 * @apiSuccess {transactions} transactions number of transactions made in this month
 * 
 * @apiSuccessExample Success-Response:
 * [
 *  {
 *    "number": 1,
 *    "name": "يناير",
 *    "transactions": 1900
 *  },
 *  {
 *    "number": 2,
 *    "name": "فبراير",
 *    "transactions": 2048
 *  },
 *  {
 *    "number": 3,
 *    "name": "مارس",
 *    "transactions": 2543
 *  }
 * ]
 */
router.get("/months", (req, res) => {
  fetchTransactions()
    .then(snap => res.json(groupIntervals(snap.docs, intervals.MONTHS)))
    .catch(e => console.log(e));
});

/**
 * @api {get} /transactions/years Get transactions grouped by year
 * @apiGroup Transactions
 *
 * @apiSuccess {Integer} number year number
 * @apiSuccess {String} name year name
 * @apiSuccess {transactions} transactions number of transactions made in this year
 * 
 * @apiSuccessExample Success-Response:
 * [
 *  {
 *    "number": 2018,
 *    "name": "2018",
 *    "transactions": 1901234
 *  },
 *  {
 *    "number": 2019,
 *    "name": "2019",
 *    "transactions": 2564841
 *  }
 * ]
 */
router.get("/years", (req, res) => {
  fetchTransactions()
    .then(snap => res.json(groupIntervals(snap.docs, intervals.YEARS)))
    .catch(e => console.log(e));
});

function fetchTransactions() {
  return firestore
    .collection("transactions")
    .where("amount", "<", 0)
    .get();
}

const intervals = {
  MONTHS: {
    shift: -1,
    pattern: "MM",
    names: [
      "يناير",
      "فبراير",
      "مارس",
      "إبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر"
    ]
  },
  YEARS: {
    shift: -2018,
    pattern: "YYYY"
  }
};

function groupIntervals(docs, interval) {
  return Array.from(
    docs.reduce((intervals, doc) => {
      var date = moment.unix(doc.data().timestamp._seconds);
      var number = parseInt(date.format(interval.pattern));
      var index = number + interval.shift;
      intervals[index] = (intervals[index] || 0) + 1;
      return intervals;
    }, []),
    item => item || 0
  ).map((usage, index) => {
    var number = index - interval.shift;
    console.log(index);
    return {
      number,
      name: interval.names ? interval.names[index] : number.toString(),
      transactions: usage
    };
  });
}

module.exports = router;
