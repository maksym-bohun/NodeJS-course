const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("there is a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Customer`s name: Maks");
});

myEmitter.on("newSale", (_, stock) => {
  console.log(`There are now ${stock} items left in stock`);
});

myEmitter.emit("newSale", 9, 10);

///////////////
const server = http.createServer();

server.on("request", (req, res) => {
  console.log("request recieved");
  res.end("request recieved");
});
server.on("request", (req, res) => {
  console.log("Another request recieved😃");
});

server.on("close", () => {
  console.log("server closed");
});

server.listen(8000, "127.0.0.1", (err) => {
  console.log("Waiting for request...");
});
