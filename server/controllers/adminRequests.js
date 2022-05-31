const express = require("express");
const app = express();
app.use(express.json());
const db = require("../../database");
app.use(express.urlencoded({ extended: true }));

exports.viewrequests = (req, res) => {
  var sql =
    "SELECT books.id, books.name, books.author, requests.enrolmentNumber, requests.type, books.status FROM books INNER JOIN requests ON books.id= requests.id";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    //res.render("requests", { title: "Requests", userData: data });
    res.render("request1", { layout: "request", data: data });
  });
};

//If accepted
exports.accept = (req, res) => {
  const { bookID, bookStatus, enrolmentNumber } = req.body;
  console.log(bookID, bookStatus, enrolmentNumber);
  var sql = "DELETE FROM requests WHERE id=" + db.escape(bookID) + ";";

  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    if (bookStatus === 1) {
      var sql =
        "UPDATE books SET status = 0" +
        ", enrolmentNumber= `NULL` WHERE id=" +
        db.escape(bookID) +
        ";";

      db.query(sql, function (err, data, fields) {
        if (err) throw err;
        console.log(data);
      });
    } else {
      var sql =
        "UPDATE books SET status = 1" +
        ", enrolmentNumber= " +
        db.escape(enrolmentNumber) +
        " WHERE id=" +
        db.escape(bookID) +
        ";";

      db.query(sql, function (err, data, fields) {
        if (err) throw err;
        console.log(data);
      });
    }
  });
  res.redirect("http://localhost:8080/admin/requests");
};

//If denied
exports.deny = (req, res) => {
  const { bookID } = req.body;
  console.log(bookID);
  var sql = "DELETE FROM requests WHERE id=" + db.escape(bookID) + ";";

  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    res.redirect("http://localhost:8080/admin/requests");
  });
};
