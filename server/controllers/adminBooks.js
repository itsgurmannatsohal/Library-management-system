const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const app = express();
app.use(express.json());
const db = require("../../database");
app.use(express.urlencoded({ extended: true }));

// if (req.session.admin === true) {
//   allow = 1;
// }
allow = 1;

exports.viewbooks = (req, res) => {
  if (req.session.admin) {
    var sql = "SELECT id, name, author FROM books";
    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      console.log(data);
      //res.render("adminBooks", { title: "Books", userData: data });
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
    const { bookName, authorName } = req.body;
    var sql =
      "INSERT INTO books (name, author, status) VALUES (" +
      db.escape(bookName) +
      ", " +
      db.escape(authorName) +
      ", 0);";
    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      console.log(data);
      res.redirect("/admin/books");
    });
  } else {
    res.redirect("/signin");
  }
};

//Deleting books
exports.deleteBooks = (req, res) => {
  if (req.session.admin) {
    const { bookID } = req.body;
    db.query(
      "DELETE FROM books WHERE id=" + db.escape(bookID) + ";",
      (err, rows) => {
        if (!err) {
          db.query(
            "DELETE FROM books WHERE id=" + db.escape(bookID) + ";",
            (err, rows) => {
              if (!err) {
                console.log("Deleted");
              } else {
                console.log(err);
              }
            }
          );
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
