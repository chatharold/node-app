// imports
import http from "http";
import { networkInterfaces } from "os";
import devices from "./devices.json" assert { type: "json" };
import { readFile } from "node:fs/promises";

// config
const PORT = process.env.PORT || 5000;
const IP = networkInterfaces().en0[1].address.toString();

// init server
http
  .createServer(async (req, res) => {
    if (req.url === "/" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/html" });
      try {
        const filePath = new URL('./view/index.html', import.meta.url);
        const page = await readFile(filePath, { encoding: 'utf8' });
        res.write(page)
      } catch (err) {
        console.error(err.message);
      }      
      res.end();
    } else if (req.url === "/devices" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(devices));
      res.end();
    } else {
      res.writeHead(400, { "Content-Type": "text/html" });
      try {
        const filePath = new URL('./view/404.html', import.meta.url);
        const page = await readFile(filePath, { encoding: 'utf8' });
        res.write(page)
      } catch (err) {
        console.error(err.message);
      }    
      res.end();
    }
  })
  .listen(PORT, IP, () => console.log(`${IP}:${PORT}`));
