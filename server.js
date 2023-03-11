// imports 
const http = require("http");

// config
const PORT = process.env.PORT || 8000;

// init
http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(`<h1>Server is Running</h1>`);
  res.end();
}).listen(PORT, () => console.log("App is running"))
