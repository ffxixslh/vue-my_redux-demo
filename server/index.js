const path = require("path");
const Mock = require("mockjs");
const express = require("express");
const mysql = require("mysql");
const sql3306 = require("./utils/connection");

const app = express();
const router = express.Router();
const sqlConn = mysql.createConnection(sql3306.option);

sqlConn.connect(() => {
  console.log("connect successfully");
});

app.use(require("cors")());
app.use("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use("/api", router);

app.get("/index", (req, res) => {
  console.log(req.query);
});

router.get("/users", (req, res) => {
  let selectSQL = "SELECT * FROM `users`";

  const dataArr = [];

  sqlConn.query(selectSQL, (err, rows) => {
    if (err) {
      console.log("selectSQL err", err);
    }

    if (rows) {
      rows.forEach((row) => {
        dataArr.push(row);
      });

      console.log("dataArr:", dataArr);
      res.json(dataArr);
    }
  });

  // res.send("hello world")
  // res.sendFile(path.join(__dirname, "/assets/data.json"));

  // res.json(
  //   Mock.mock({
  //     "data|10": [
  //       {
  //         "id|+1": 1,
  //         name: "@cname",
  //         birthday: "@datetime", //日期先忽略
  //         address: "@county(true)",
  //       },
  //     ],
  //   })
  // );
});

app.listen(8080, () => {
  console.log("http://localhost:8080");
});
