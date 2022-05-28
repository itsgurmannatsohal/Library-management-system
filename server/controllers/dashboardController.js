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
    //render ejs file
  });
};

exports.viewlist = (req, res) => {
  var sql =
    "SELECT name, status FROM books WHERE enrolmentNumber =" +
    req.session.eno +
    "AND status= '0';";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    //render ejs file
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
