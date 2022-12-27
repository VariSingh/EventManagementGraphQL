const mongoose = require("mongoose");
const { SchemaTypes } = mongoose;
const { hash } = require("bcrypt");
const Schema = mongoose.Schema;
const { BCRYPT_ROUNDS } = require("../utils/constants");
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  events: [{ type: SchemaTypes.ObjectId, ref: "Event" }],
});

userSchema.pre("save", async function (next) {
  this.password = await hash(this.password, BCRYPT_ROUNDS);
  next();
});

module.exports = mongoose.model("User", userSchema);
