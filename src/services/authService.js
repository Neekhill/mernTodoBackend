const Users = require("../database/models/user");
const bluebird = require("bluebird");
const bcrypt = bluebird.promisifyAll(require("bcryptjs"));

//register user
async function registerUser({ username, email, password }) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = Users({
    firstname,
    lastname,
    username,
    email,
    password: hashedPassword,
  });
  return await newUser.save();
}

module.exports = {
  registerUser: registerUser,
};
