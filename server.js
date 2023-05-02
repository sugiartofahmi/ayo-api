import jsonServer from "json-server";
import cors from "cors";
import path from "path";
import chokidar from "chokidar";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 3000;

const router = jsonServer.router(path.join(__dirname, "db/db.json"));

const server = jsonServer.create();

// Gunakan chokidar untuk memantau perubahan pada file
const watcher = chokidar.watch(path.join(__dirname, "db/db.json"));
watcher.on("change", () => {
  console.log("Reloading JSON Server data...");
  router.db.read();
  router.db.setState(router.db.getState());
});

server.use(cors());
server.use(jsonServer.defaults());

// Tambahkan middleware untuk menulis perubahan data ke dalam file db.json
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  fs.writeFileSync(
    path.join(__dirname, "db/db.json"),
    JSON.stringify(router.db.getState())
  );
  next();
});

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
export default server;
