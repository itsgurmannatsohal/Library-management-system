const express = require("express");
const app = express();
app.use(express.json());
const db = require("../../database");
app.use(express.urlencoded({ extended: true }));

exports.viewdashboard = (req, res) => {
  var sql = "SELECT id, name, author FROM books";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    res.render("dashboard", { title: "Dashboard", userData: data });
  });
};

exports.viewlist = (req, res) => {
  console.log("hi");
  var sql =
    "SELECT name, author FROM books WHERE enrolmentNumber =" +
    req.session.eno +
    " AND status= 1;";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    res.render("checkoutlist", { title: "List", userData: data });
  });
};

//Assuming we know the book id

var idx;

//Request check out
function requestOut(req, res) {
  var sql =
    "ALTER TABLE requests ADD id =" +
    db.escape(idx) +
    ", enrolmentNumber=" +
    req.session.eno +
    "status= 'out' ;";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
  });
}

var idy;

//Request check in
function requestIn(req, res) {
  var sql =
    "ALTER TABLE requests ADD id =" +
    db.escape(idy) +
    ", enrolmentNumber=" +
    req.session.eno +
    "status= 'in';";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
  });
}
