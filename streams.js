/*
const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1
  //   fs.readFile("./test-file.txt", (err, data) => {
  //     if (err) {
  //       console.log(err);
  //     }

  //     res.end(data);
  //   });

  // Solution 2: Streams
  //   const readable = fs.createReadStream("./test-file.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });

  //   readable.on("end", () => {
  //     res.end();
  //   });
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found");
  //   });

  // Solution 3
  const readable = fs.createReadStream("./test-file.txt");
  readable.pipe(res);
  // readableSource.pipe(wtitebleDestination)
});

server.listen(8000, "127.0.0.1", (err, res) => {
  console.log("Starting server");
});
 */

const fs = require("fs");
const zlib = require("zlib");

const readStream = fs.createReadStream("./test-file.txt");
const writeStream = fs.createWriteStream("./new-text.txt");
const compressStream = zlib.createGzip();

// readStream.on("data", (chunk) => {
//   writeStream.write("\n------------------\n");
//   writeStream.write(chunk);
// });

const handleError = () => {
  console.log("Error!");
  readStream.destroy();
  writeStream.end("Finished with error...");
};

readStream
  .on("error", handleError)
  .pipe(compressStream)
  .pipe(writeStream)
  .on("error", handleError);
