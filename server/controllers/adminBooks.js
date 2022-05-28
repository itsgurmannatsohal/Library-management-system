const express = require("express");
const app = express();
app.use(express.json());
const db = require("../../database");
app.use(express.urlencoded({ extended: true }));

exports.viewbooks = (req, res) => {
  var sql = "SELECT id, name, author FROM books";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    //render ejs file for admin
  });
};

exports.addbooks = (req, res) => {
  const { bookName, authorName } = req.body;
  var sql =
    "ALTER TABLE books ADD name =" +
    db.escape(bookName) +
    ", author=" +
    db.escape(authorName) +
    ", status= 1;";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    //redirect to viewbooks
  });
};

//Assuming we know book id

var idx;

//Deleting books
function deleteBooks(req, res) {
  db.query(
    "SELECT * from books WHERE id=" + db.escape(idx) + "AND status = '1';",
    (err, rows) => {
      if (!err) {
        if (rows[0] != undefined) {
          res.send("The book is checked out. Can't delete");
        } else {
          db.query("DELETE FROM books WHERE id=" + db.escape(idx) + ";");
          db.query("DELETE FROM requests WHERE id=" + db.escape(idx) + ";");
        }
      } else {
        console.log(err);
      }
    }
  );
  console.log(req.body);
}
