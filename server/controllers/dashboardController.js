const express = require("express");
const app = express();
app.use(express.json());
const db = require("../../database");
const alert = require("alert");
app.use(express.urlencoded({ extended: true }));

exports.viewdashboard = (req, res) => {
  if (req.session.eno) {
    var sql = "SELECT * FROM books;";
    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      console.log(data);
      res.render("dashboard1", { layout: "dashboard", data: data });
    });
  } else {
    res.redirect("/signin");
  }
};

exports.viewlist = (req, res) => {
  if (req.session.eno) {
    var sql =
      "SELECT books.id, books.name, books.author FROM books INNER JOIN requests ON books.id= requests.id WHERE requests.status = 1 AND requests.enrolmentNumber= " +
      db.escape(req.session.eno) +
      " AND type = 9;";

    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      console.log(data);
      res.render("checkoutList1", { layout: "checkoutList", data: data });
    });
  } else {
    res.redirect("/signin");
  }
};

//Request check out
exports.requestOut = (req, res) => {
  if (req.session.eno) {
    const { bookID, available } = req.body;
    if (available > 0) {
      db.query(
        "SELECT * FROM requests WHERE Id=" +
          db.escape(bookID) +
          " AND enrolmentNumber=" +
          db.escape(req.session.eno) +
          " AND status=2 AND type = 9;",
        (err, rows) => {
          if (!err) {
            if (rows[0] === undefined) {
              db.query(
                "INSERT INTO requests (id, enrolmentNumber, type, status, req) VALUES (" +
                  db.escape(bookID) +
                  ", " +
                  req.session.eno +
                  ", 9, 2, 'Check-out' );",
                (err, rows) => {
                  if (!err) {
                    console.log("request sent");
                  } else {
                    console.log(err);
                  }
                }
              );
            } else {
              alert("Already requested");
            }
          }
        }
      );
    } else {
      alert("No books available to check out");
    }
  } else {
    res.redirect("/signin");
  }
};

//Request check in
exports.requestIn = (req, res) => {
  if (req.session.eno) {
    const { bookID } = req.body;
    console.log(bookID);

    db.query(
      "SELECT * FROM requests WHERE Id=" +
        db.escape(bookID) +
        " AND enrolmentNumber=" +
        db.escape(req.session.eno) +
        " AND status=2 AND type = 7;",
      (err, rows) => {
        if (!err) {
          if (rows[0] === undefined) {
            db.query(
              "INSERT INTO requests (id, enrolmentNumber, type, status, req) VALUES (" +
                db.escape(bookID) +
                ", " +
                req.session.eno +
                ", 7, 2, 'Check-in' );",
              (err, rows) => {
                if (!err) {
                  console.log("request sent");
                } else {
                  console.log(err);
                }
              }
            );
          } else {
            alert("Already requested");
          }
        }
      }
    );
  } else {
    res.redirect("/signin");
  }
};
