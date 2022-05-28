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
  res.sendFile("../../static/html/login");
};

exports.postlogin = (req, res) => {
  const { enrolnum, pass } = req.body;

  db.query(
    "SELECT * FROM users WHERE enrolmentNumber =" + db.escape(enrolnum)+";",
    (err, rows) => {
      if (!err) {
        if (rows[0] === undefined) {
          res.send("User doesn't exist");
        } else {
          console.log(rows[0]["password"]);

          const verified = bcrypt.compareSync(pass, rows[0]["password"]);
          if (verified) {
            req.session.eno = rows[0].enrolmentNumber; //session

            console.log("login successful");
            res.redirect("/");
          } else {
            res.send("Incorrect Enrolment Number or Password");
          }
        }
      } else {
        console.log(err);
      }
    }
  );
  console.log(req.body);
};

//Sign Up

exports.viewsignup = (req, res) => {
  res.sendFile("../../static/html/signup");
};

exports.postsignup = (req, res) => {
  const { enrolnum, pass1, pass2 } = req.body;
  db.query(
    "SELECT * FROM users WHERE enrolmentNumber =" + db.escape(enrolnum),
    (err, rows) => {
      if (!err) {
        if (rows[0] === undefined) {
          if (pass1 == pass2) {
            bcrypt.hash(pass1, saltRounds, function (err, hash) {
              if (!err) {
                "INSERT INTO users ( enrolmentNumber =" +
                  db.escape(enrolnum) +
                  ", password=" +
                  db.escape(hash) +
                  ")";
              } else {
                console.log(err);
              }
            });
            console.log("User updated");
            res.redirect("/");
          } else {
            res.send("Passwords don't match");
          }
        } else {
          res.send("User already exists");
        }
      } else {
        console.log(err);
      }
    }
  );
  console.log(req.body);
};

// Clear cookies

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/login");
    }
    res.clearCookie(process.env.SESS_NAME);
    res.redirect("/login");
  });
};
