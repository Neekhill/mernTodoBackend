const mogoose = require("mongoose");
const Schema = mogoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // this will created at, updated at timestamps
);

module.exports = userSchema;
