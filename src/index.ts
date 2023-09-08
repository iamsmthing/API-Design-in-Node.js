// const http = require("http");
// const server = http.createServer((req, res) => {
//   console.log(req);
//   console.log(res);
//   if ((req.method === "GET") | (req.url === "/")) {
//     console.log("Hello from server");
//     res.end();
//   }
// });

// server.listen(3000, () => {
//   console.log(`Server listening at port 3000`);
// });
import app from "./server";
import * as dotenv from "dotenv";
import config from "./config";
dotenv.config();

app.listen(config.port, () => {
  console.log(`Server listening at port ${config.port}`);
});
