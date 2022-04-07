const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./databse/db");
const TodosRoute = require("./routes/todos");
const AuthRoute = require("./routes/authRoutes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/todos", TodosRoute);
app.use("/auth", AuthRoute);

app.get("/", (req, res) => {
  res.send("hello World");
});

app.listen(9000, () => {
  db.connect()
    .then(() => {
      console.log("Connetion Successful");
    })
    .catch((err) => {
      console.log(`Error found! ${err}`);
    });
  console.log("started listening");
});
