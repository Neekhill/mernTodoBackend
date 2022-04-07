require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Db = require("./databse/db");
const TodosRoute = require("./routes/todos");
const AuthRoute = require("./routes/authRoute");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/todos", TodosRoute);
app.use("/auth", AuthRoute);

app.get("/", (req, res) => {
  res.send("hello World");
});

app.listen(process.env.PORT || 9000, async () => {
  try {
    await Db.connect();
    console.log("Connetion Successful");
  } catch (err) {
    console.log(`Error found! ${err}`);
  }

  console.log("listening at port 9000");
});
