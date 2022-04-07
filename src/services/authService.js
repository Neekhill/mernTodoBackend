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

async function checkIfAuthenticated(req, res, next) {
  const authHeader = req.headers.token;
  // Bearer Token
  if (authHeader) {
    token = authHeader.split(" ")[1];
    try {
      const user = await TokenService.verifyToken(token);
      req.user = user;
      //console.log(req.user);
      next();
    } catch (err) {
      console.log(`err = ${err}`);
      res.status(401).send(`${err}`);
    }
  } else {
    return res.status(401).json("you are not authenticated");
  }
}

function checkIfAuthenticatedAndAuthorizes(req, res, next) {
  checkIfAuthenticated(req, res, () => {
    if (req.user.userId === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ error: "You're not allowed to update this" });
    }
  });
}

function checkIfAuthenticatedAndAdmin(req, res, next) {
  checkIfAuthenticated(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ error: "You're not allowed to update this" });
    }
  });
}

module.exports = {
  registerUser: registerUser,
  login: login,
  checkIfAuthenticated: checkIfAuthenticated,
  checkIfAuthenticatedAndAuthorizes: checkIfAuthenticatedAndAuthorizes,
  checkIfAuthenticatedAndAdmin: checkIfAuthenticatedAndAdmin,
};
