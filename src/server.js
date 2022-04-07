const Db = require("./databse/db");
const http = require("http");

const { app } = require("./index");

const httpServer = http.createServer(app);

httpServer.listen(9000, () => {
  Db.connect()
    .then(() => {
      console.log("Connetion Successful");
    })
    .catch((err) => {
      console.log(`Error found! ${err}`);
    });
  console.log("started listening");
});
