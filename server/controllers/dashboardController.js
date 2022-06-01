const express = require("express");
const app = express();
app.use(express.json());
const db = require("../../database");
const alert = require("alert");
app.use(express.urlencoded({ extended: true }));

exports.viewdashboard = (req, res) => {
  var sql = "SELECT * FROM books;";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    res.render("dashboard1", { layout: "dashboard", data: data });
  });
};

exports.viewlist = (req, res) => {
  var sql =
    "SELECT books.id, books.name, books.author FROM books INNER JOIN requests ON books.id= requests.id WHERE requests.status = 1 AND requests.enrolmentNumber= " +
    db.escape(req.session.eno) +
    " AND type = 9;";

  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    res.render("checkoutList1", { layout: "checkoutList", data: data });
  });
};

//Request check out
exports.requestOut = (req, res) => {
  const { bookID, available } = req.body;
  if (available > 0) {
    var sql =
      "INSERT INTO requests (id, enrolmentNumber, type, status) VALUES (" +
      db.escape(bookID) +
      ", " +
      req.session.eno +
      ", 9, 2 );";
    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      console.log(data);
    });
    res.send("Request sent");
  } else {
    alert("No books available to check out");
  }
};

//Request check in
exports.requestIn = (req, res) => {
  const { bookID } = req.body;
  console.log(bookID);
  var sql =
    "INSERT INTO requests (id, enrolmentNumber, type, status) VALUES (" +
    db.escape(bookID) +
    ", " +
    req.session.eno +
    ", 7, 2 );";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    res.send("Request sent");
  });
};
