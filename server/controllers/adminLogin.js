const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = require("../../database");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//Log in
//Sign in

exports.viewlogin = (req, res) => {
  res.sendFile("../../static/html/adminlogin");
};

exports.postlogin = (req, res) => {
  const { username, pass } = req.body;

  db.query(
    "SELECT * FROM admins WHERE username =" + db.escape(username) + ";",
    (err, rows) => {
      if (!err) {
        if (rows[0] === undefined) {
          res.send("Admin doesn't exist");
        } else {
          console.log(rows[0]["password"]);

          const verified = bcrypt.compareSync(pass, rows[0]["password"]);
          if (verified) {
            console.log("Admin login successful");
            res.redirect("/books");
          } else {
            res.send("Incorrect Username or Password");
          }
        }
      } else {
        console.log(err);
      }
    }
  );
  console.log(req.body);
};