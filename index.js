const fs = require("fs");
const http = require("http");
const url = require("url");

//////////////// FILES

// *** BLOCKING, SYNCHRONOUS WAY

// const hello = "Hello world!";
// console.log(hello);

// const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textInput);

// const textOutput = `This is what we know about the avocado: ${textInput}\n Created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOutput);

// console.log("File written");

// *** NON-BLOCKING, ASYNCHRONOUS WAY
// const res = fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("ERROR 💥");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("File has been written!");
//       });
//     });
//   });
// });

//////////////// SERVER

const apiData = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const apiDataObj = JSON.parse(apiData);

const server = http.createServer((req, res) => {
  console.log(req.url);

  const pathName = req.url;
  if (pathName === "/overview" || pathName === "/") {
    res.end("This is the OVERVIEW ");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT ");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(apiData);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
