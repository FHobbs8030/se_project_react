const jsonServer = await import('json-server');

const server = jsonServer.default.create();
const router = jsonServer.default.router('db.json');
const middlewares = jsonServer.default.defaults();

server.use(middlewares);
server.use(router);

server.listen(3001, () => {
  console.log('✅ JSON Server is running on http://localhost:3001');
});
