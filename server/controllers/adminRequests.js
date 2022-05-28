const express = require("express");
const app = express();
app.use(express.json());
const db = require("../../database");
app.use(express.urlencoded({ extended: true }));

exports.viewrequests = (req, res) => {
  var sql =
    "SELECT books.name, books.author, requests.enrolmentNumber FROM books INNER JOIN requests ON books.enrolmentNumber= requests.enrolmentNumber";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    //render requests ejs file for admin
  });
};

//Resolving requests
//Assuming we know the value of bool and book id

var boolx, idx;

//Check out
function checkOut(req, res) {
  var sql = "DELETE FROM requests WHERE id=" + db.escape(idx) + ";";

  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    if (boolx === 1) {
      var sql =
        "UPDATE TABLE books SET status = '1'" +
        ", enrolmentNumber=" +
        req.session.eno +
        "WHERE id=" +
        db.escape(idx) +
        ";";

      db.query(sql, function (err, data, fields) {
        if (err) throw err;
        console.log(data);
      });
    }
  });
}

var booly, idy;

//Check in
function checkIn(req, res) {
  var sql = "DELETE FROM requests WHERE id=" + db.escape(idy) + ";";

  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);

    if (booly === 1) {
      var sql =
        "UPDATE TABLE books SET status = '0'" +
        ", enrolmentNumber= NULL" +
        "WHERE id=" +
        idy +
        ";";

      db.query(sql, function (err, data, fields) {
        if (err) throw err;
        console.log(data);
      });
    }
  });
}
