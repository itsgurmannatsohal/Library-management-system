const express = require("express");
const app = express();
require("dotenv").config()
const session = require("express-session");
const cookie = require("cookie-parser");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

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
const adminRouter = require("./server/routers/adminRouter.js")


app.use("/signin", loginRouter)
app.use("/", dashboardRouter);
app.use("/admin", adminRouter)

port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
