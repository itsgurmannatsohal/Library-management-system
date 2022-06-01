const express = require("express");
const app = express();
app.use(express.json());
const db = require("../../database");
app.use(express.urlencoded({ extended: true }));

exports.viewrequests = (req, res) => {
  if (req.session.admin) {
    var sql =
      "SELECT books.id, books.name, books.author, requests.enrolmentNumber, requests.req, requests.type, requests.status, books.available FROM books INNER JOIN requests ON books.id= requests.id WHERE requests.status = 2";
    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      console.log(data);
      res.render("request1", { layout: "request", data: data });
    });
  } else {
    res.redirect("/signin");
  }
};

//If accepted

exports.accept = (req, res) => {
  let x, y;
  if (req.session.admin) {
    const { bookID, requestType, enrolmentNumber, available } = req.body;
    x = y = available;
    x = x - 1;
    y = y + 1;

    var sql = "SELECT * FROM requests";

    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      console.log(data);
      if (requestType === 7) {
        console.log("check in resolved");
        var sql =
          "UPDATE books SET available=" +
          db.escape(y) +
          " WHERE id=" +
          db.escape(bookID) +
          ";";

        db.query(sql, function (err, data, fields) {
          if (err) throw err;
          db.query(
            "UPDATE requests SET status = 1 WHERE id=" +
              db.escape(bookID) +
              " AND enrolmentNumber=" +
              db.escape(enrolmentNumber) +
              " AND type=" +
              db.escape(requestType) +
              ";",
            (err, rows) => {
              if (err) {
                console.log(err);
              }
              db.query(
                "UPDATE requests SET type = 7 WHERE status =1 AND enrolmentNumber=" +
                  db.escape(enrolmentNumber) +
                  " AND type=9;",
                (err, rows) => {
                  if (err) {
                    console.log(err);
                  }
                }
              );
            }
          );
          res.redirect("/admin/requests");
        });
      } else {
        console.log("check out resolved");
        var sql =
          "UPDATE books SET enrolmentNumber= " +
          db.escape(enrolmentNumber) +
          ", available= " +
          db.escape(x) +
          " WHERE id=" +
          db.escape(bookID) +
          ";";

        db.query(sql, function (err, data, fields) {
          if (err) throw err;
          db.query(
            "UPDATE requests SET status = 1 WHERE id=" +
              db.escape(bookID) +
              " AND enrolmentNumber=" +
              db.escape(enrolmentNumber) +
              " AND type=" +
              db.escape(requestType) +
              ";",
            (err, rows) => {
              if (err) {
                console.log(err);
              }
            }
          );

          res.redirect("/admin/requests");
        });
      }
    });
  } else {
    res.redirect("/signin");
  }
};

//If denied
exports.deny = (req, res) => {
  if (req.session.admin) {
    const { bookID, enrolmentNumber } = req.body;
    console.log(bookID);
    var sql =
      "UPDATE requests SET status = 0 WHERE id=" +
      db.escape(bookID) +
      " AND enrolmentNumber=" +
      db.escape(enrolmentNumber) +
      ";";

    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      console.log(data);
      res.redirect("/admin/requests");
    });
  } else {
    res.redirect("/signin");
  }
};
