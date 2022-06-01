const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const app = express();
app.use(express.json());
const db = require("../../database");
const alert = require("alert");
app.use(express.urlencoded({ extended: true }));

exports.viewbooks = (req, res) => {
  if (req.session.admin) {
    var sql = "SELECT * FROM books";
    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      console.log(data);
      res.render("adminBooks1", { layout: "adminBooks", data: data });
    });
  } else {
    res.redirect("/signin");
  }
};

exports.viewaddbooks = (req, res) => {
  if (req.session.admin) {
    res.sendFile(
      "/home/patronus/Desktop/VS Code/Library/static/html/addBooks.html"
    );
  } else {
    res.redirect("/signin");
  }
};

exports.addbooks = (req, res) => {
  if (req.session.admin) {
    const { bookName, authorName, copies } = req.body;
    console.log(copies);
    var sql =
      "INSERT INTO books (name, author, copies, available) VALUES (" +
      db.escape(bookName) +
      ", " +
      db.escape(authorName) +
      ", " +
      db.escape(copies) +
      ", " +
      db.escape(copies) +
      ");";
    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      console.log(data);
      res.redirect("/admin/books");
    });
  } else {
    res.redirect("/signin");
  }
};

//Plus copies
exports.plusbooks = (req, res) => {
  let x, y;
  if (req.session.admin) {
    const { bookID, copies, available } = req.body;
    x = copies;
    x = x + 1;
    y = available;
    y = y + 1;
    db.query(
      "UPDATE books SET copies=" +
        db.escape(x) +
        ", available=" +
        db.escape(y) +
        " WHERE id=" +
        db.escape(bookID) +
        ";",
      (err, rows) => {
        if (!err) {
          console.log("Added 1 book");
        } else {
          console.log(err);
        }
      }
    );
    console.log(req.body);
    res.redirect("/admin/books");
  } else {
    res.redirect("/signin");
  }
};

//Minus copies
exports.minusbooks = (req, res) => {
  let x, y;
  if (req.session.admin) {
    const { bookID, copies, available } = req.body;
    x = copies;
    x = x - 1;
    y = available;
    y = y - 1;
    if(y>=0){
      db.query(
        "UPDATE books SET copies=" +
          db.escape(x) +
          ", available=" +
          db.escape(y) +
          " WHERE id=" +
          db.escape(bookID) +
          ";",
        (err, rows) => {
          if (!err) {
            console.log("Subtracted 1 book");
          } else {
            console.log(err);
          }
        }
      );
      console.log(req.body);
      res.redirect("/admin/books");
    }
    else{
      alert("No available books to subtract")
    }
  } else {
    res.redirect("/signin");
  }
};
