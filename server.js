import jsonServer from "json-server";
import cors from "cors";
import path from "path";
import chokidar from "chokidar";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 3000;
const router = jsonServer.router("db/db.json");
const server = jsonServer.create();
const watcher = chokidar.watch(path.join(__dirname, "db/db.json"));
watcher.on("change", () => {
  console.log("Reloading JSON Server data...");
  router.db.read();
  router.db.setState(router.db.getState());
});
server.use(cors());
server.use(jsonServer.defaults());
server.use(router);
server.listen(port, () => {
  console.log("JSON Server is running");
});

export default server;
