const mongoose = require("mongoose");
const userSchema = require("../schema/user");

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
