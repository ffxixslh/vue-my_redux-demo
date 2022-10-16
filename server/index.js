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
app.use(express.json({ type: "application/json" }));
app.use("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use("/api", router);

app.get("/index", (req, res) => {
  console.log(req.query);
});

router.get("/users", async (req, res) => {
  const queryResult = useSQL("SELECT * FROM `users`");
  queryResult.then(
    (result) => {
      if (result.length !== 0) {
        // console.log("query result:", result);
        res.json(result);
      } else {
        res.json("data not found");
      }
    },
    (err) => {
      res.status(404).json("data not found");
    }
  );
});

// 创建资源
router.post("/users/add", async (req, res) => {
  const { name, address, birthday } = req.body;
  const sqlResult = useSQL(
    `INSERT INTO users (name, address, birthday) VALUES ('${name}', '${address}', '${birthday}')`
  );
  sqlResult.then((result) => {
    res.json({
      status: "200",
      msg: "insert success",
      data: {
        id: result,
      },
    });
  });
});

// 更新资源
router.put("/users/:id", async (req, res) => {
  const { id, name, address, birthday } = req.body;
  const sqlResult = useSQL(
    `UPDATE users SET name = '${name}', address = '${address}', birthday = '${birthday}' WHERE id = '${id}'`
  );
  sqlResult.then((result) => {
    res.json({
      status: "200",
      msg: "update success",
    });
  });
});

// 删除资源
router.delete("/users/delete/:id", async (req, res) => {
  const { id } = req.body;
  const sqlResult = useSQL(`DELETE FROM users WHERE 'id' = ${id}`);
  sqlResult.then((result) => {
    res.json({
      status: "200",
      msg: "delete success",
    });
  });
});

function useSQL(sqlStr) {
  let selectSQL = sqlStr;

  return new Promise((resolve, reject) => {
    sqlConn.query(selectSQL, (err, rows) => {
      if (err) {
        console.log("selectSQL err:", err);
        reject(err);
      }

      console.log("rows:", rows);

      if (Array.isArray(rows)) {
        const dataArr = [];
        rows.forEach((row) => {
          dataArr.push(row);
        });
        resolve(dataArr);
      }

      if (typeof rows === "object") {
        resolve(rows.insertId);
      }
    });
  });
}

app.listen(8080, () => {
  console.log("http://localhost:8080");
});
