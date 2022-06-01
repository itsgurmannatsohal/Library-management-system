const express = require("express");
const app = express();
app.use(express.json());
const db = require("../../database");
app.use(express.urlencoded({ extended: true }));

exports.viewrequests = (req, res) => {
  if (req.session.admin) {
    var sql =
      "SELECT books.id, books.name, books.author, requests.enrolmentNumber, requests.type, books.status FROM books INNER JOIN requests ON books.id= requests.id";
    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      console.log(data);
      //res.render("requests", { title: "Requests", userData: data });
      res.render("request1", { layout: "request", data: data });
    });
  } else {
    res.redirect("/signin");
  }
};

//If accepted

exports.accept = (req, res) => {
  if (req.session.admin) {
    const { bookID, bookStatus, enrolmentNumber } = req.body;
    console.log(bookID, bookStatus, enrolmentNumber);
    var sql = "DELETE FROM requests WHERE id=" + db.escape(bookID) + ";";

    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      console.log(data);
      if (bookStatus === 1) {
        var sql =
          "UPDATE books SET status = 0 WHERE id=" + db.escape(bookID) + ";";

        db.query(sql, function (err, data, fields) {
          if (err) throw err;
          console.log(data);
          res.redirect("/admin/requests");
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
    const { bookID } = req.body;
    console.log(bookID);
    var sql = "DELETE FROM requests WHERE id=" + db.escape(bookID) + ";";

    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      console.log(data);
      res.redirect("/admin/requests");
    });
  } else {
    res.redirect("/signin");
  }
};
