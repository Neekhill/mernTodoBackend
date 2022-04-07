const Users = require("../databse/models/user");
const bluebird = require("bluebird");
const bcrypt = bluebird.promisifyAll(require("bcryptjs"));
const AuthErrorCodes = require("./authError");
const TokenService = require("./tokenService");

//register user
async function registerUser({ username, email, password }) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = Users({
    username,
    email,
    password: hashedPassword,
  });
  return await newUser.save();
}

//login user
async function login(email, reqpassword) {
  const user = await Users.findOne({ email: email });
  console.log(user);
  if (user === null) {
    throw new Error(AuthErrorCodes.AuthErrorCodes.INVALID_EMAIL);
  }
  const result = await bcrypt.compare(reqpassword, user.password);
  if (!result) {
    throw new Error(AuthErrorCodes.AuthErrorCodes.INVALID_PASSWORD);
  }
  console.log(`user = ${JSON.stringify(user)}`);
  const token = await TokenService.generateToken(user._id, user.isAdmin);
  const { password, ...others } = user._doc;

  return { ...others, token };
}

module.exports = {
  registerUser: registerUser,
  login: login,
};
