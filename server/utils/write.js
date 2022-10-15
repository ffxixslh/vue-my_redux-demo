const fs = require("node:fs");
const saveData = async () => {
  const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));
  const result = await fetch("http://localhost:8080/api/users");
  const data = await result.json();

  console.log(data.data);
  fs.writeFile("../assets/data.json", JSON.stringify(data.data), (err) => {
    console.log("err:", err);
  });
};

const saveJSONAsTXT = () => {
  fs.readFile("../assets/data.json", (err, data) => {
    if (err) {
      console.log("err:", err);
    } else {
      let stringFile = convertJSON2String(data);
      saveStringAsTXT(stringFile)
    }
  });
};

const convertJSON2String = (jsonFile) => {
  let fileString = "";
  let file = JSON.parse(jsonFile);
  file.forEach((item) => {
    fileString += `${item.id}\t ${item.name}\t${item.address}\t${item.birthday}\n`;
  });
  return fileString;
};

const saveStringAsTXT = (stringFile) => {
  fs.writeFile('data.txt', stringFile, (err) => {
    if (err) {
      console.log("error occurs");
    } else {
      console.log("write to data.txt:\n", stringFile);
    }
  })
}

saveJSONAsTXT()