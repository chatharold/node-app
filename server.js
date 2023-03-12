// imports
const http = require("http");
const fs = require("fs");

// config
const PORT = process.env.PORT || 8000;

// funcs
function route(path) {
  try {
    const data = fs.readFileSync(path, "utf8");
    return data;
  } catch (err) {
    console.error(err);
  }
}

// init
http
  .createServer((req, res) => {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(route("./view/index.html"));
    } else if (req.url === "/devices") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(route("./devices.json"));
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(route("./view/404.html"));
    }
    res.end();
  })
  .listen(PORT, () => console.log("App is running"));
