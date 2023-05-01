import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("db/db.json");
const middlewares = jsonServer.defaults();
const port = 3002;
server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);
server.use(router);
server.listen(port, () => {
  console.log("JSON Server is running");
});

export default server;
