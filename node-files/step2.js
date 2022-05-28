const fs = require("fs");
const process = require("process");

const axios = require("axios");

const input = process.argv[2];

function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(`Error reading ${path}:`);
      console.log(
        `  Error: ${err.code}: no such file or directory, open '${path}'`
      );
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

async function webCat(URL) {
  try {
    const data = await axios.get(URL);
    console.log(data);
  } catch (err) {
    console.log(`Error fetching ${URL}:`);
    console.log(
      `  Error: Request failed with status code ${err.response.status}`
    );
    process.exit(1);
  }
}

if (input.includes("http")) {
  webCat(input);
} else {
  cat(input);
}
