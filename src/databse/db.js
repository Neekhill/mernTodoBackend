const mongoose = require("mongoose");
const DbConfig = require("../config/dbConfig");

function getConnectionString() {
  return `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER_ADDRESS}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
}

function connectToDb() {
  return mongoose.connect(getConnectionString(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = {
  connect: connectToDb,
};
