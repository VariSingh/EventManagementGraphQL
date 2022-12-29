const User = require("../../models/user");

exports.fetchUsers = async () => {
  try {
    return await User.find().populate("events");
  } catch (error) {
    console.log("error ", error);
  }
};

exports.createUser = async (args) => {
  try {
    const { email, password } = args.userInput;
    const user = await User.findOne({ email: email });
    if (user) {
      throw new Error("user already exists");
    }
    const newUser = new User({
      email: email,
      password: password,
    });
    return await newUser.save();
  } catch (error) {
    console.log("error while creating user ", error);
    return error;
  }
};
