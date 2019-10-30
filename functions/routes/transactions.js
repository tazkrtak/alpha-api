const moment = require("moment");
const router = require("express").Router();
const firestore = require("firebase-admin").firestore();

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

router.get("/months", (req, res) => {
  fetchTransactions()
    .then(snap => res.json(groupIntervals(snap.docs, intervals.MONTHS)))
    .catch(e => console.log(e));
});

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
