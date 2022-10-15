(async () => {
  const { writeFile } = require("node:fs");
  const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));
  const result = await fetch("http://localhost:8080/api/list");
  const data = await result.json();

  console.log(data.data);
  writeFile("../assets/data.json", JSON.stringify(data.data), (err) => {
    console.log("err:", err);
  });
})();
