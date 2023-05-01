import jsonServer from "json-server";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = JSON.parse(fs.readFileSync(path.join(__dirname, "db/db.json")));
const server = jsonServer.create();
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();
const port = 3002;
server.use(cors());
server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log("JSON Server is running");
});

export default server;
