const express = require("express");
const app = express();
require("dotenv").config();
const exphbs = require("express-handlebars");
const session = require("express-session");
const cookie = require("cookie-parser");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname));

const handlebars = exphbs.create({
  extname: ".hbs",
});
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

app.use(
  session({
    name: process.env.SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESS_SECRET,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

const loginRouter = require("./server/routers/loginRouter.js");
const dashboardRouter = require("./server/routers/dashboardRouter.js");
const adminRouter = require("./server/routers/adminRouter.js");

app.use("/signin", loginRouter);
app.use("/dashboard", dashboardRouter);
app.use("/admin", adminRouter);

port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
