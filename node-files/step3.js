const fs = require("fs");
const process = require("process");

const axios = require("axios");
const { argv } = require("process");

let path;
let out;

function cat(path, out) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(`Error reading ${path}:`);
      console.log(
        `  Error: ${err.code}: no such file or directory, open '${path}'`
      );
      process.exit(1);
    } else {
      output(data, out);
    }
  });
}

async function webCat(URL, out) {
  try {
    const data = await axios.get(URL);
    output(data.data, out);
  } catch (err) {
    console.log(`Error fetching ${URL}:`);
    console.log(
      `  Error: Request failed with status code ${err.response.status}`
    );
    process.exit(1);
  }
}

function output(content, out) {
  if (out) {
    fs.writeFile(out, content, "utf-8", function (err) {
      if (err) {
        console.log(`Couldn't write to file`);
        process.exit(1);
      }
    });
  } else {
    console.log(content);
  }
}

if (process.argv[2] == "--out") {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.includes("http")) {
  webCat(path, out);
} else {
  cat(path, out);
}
