const express = require("express");
const app = express();
app.use(express.json());
const db = require("../../database");
app.use(express.urlencoded({ extended: true }));

exports.viewdashboard = (req, res) => {
  var sql = "SELECT id, name, author FROM books WHERE status = 0";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    //res.render("dashboard", { title: "Dashboard", userData: data });
    res.render("dashboard1", { layout: "dashboard", data: data });
  });
};

exports.viewlist = (req, res) => {
  var sql =
    "SELECT name, author FROM books WHERE enrolmentNumber =" +
    req.session.eno +
    " AND status= 1;";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    //res.render("checkoutlist", { title: "List", userData: data });
    res.render("checkoutList1", { layout: "checkoutList", data: data });
  });
};

//Request check out
exports.requestOut = (req, res) => {
  const { bookID } = req.body;
  console.log(bookID);

  var sql =
    "INSERT INTO requests (id, enrolmentNumber, type) VALUES (" +
    db.escape(bookID) +
    ", " +
    req.session.eno +
    ", 'check-out' );";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
  });
  res.send("Request sent");
};

//Request check in
exports.requestIn = (req, res) => {
  const { bookID } = req.body;
  console.log(bookID);
  var sql =
    "INSERT INTO requests (id, enrolmentNumber, type) VALUES (" +
    db.escape(bookID) +
    ", " +
    req.session.eno +
    ", 'check-in' );";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    res.send("Request sent");
  });
};
