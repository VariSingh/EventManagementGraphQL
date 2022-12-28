const { config } = require("../../utils/config");
const Event = require("../../models/event");
const User = require("../../models/user");

module.exports = {
  events: async () => {
    try {
      return await Event.find().populate("creator");
    } catch (error) {
      console.log("error ", error);
    }
  },
  users: async () => {
    try {
      return await User.find().populate("events");
    } catch (error) {
      console.log("error ", error);
    }
  },
  createEvent: async (args) => {
    try {
      const { title, description, price, date } = args.eventInput;
      const event = new Event({
        title: title,
        description: description,
        price: +price,
        date: new Date(date),
        creator: "63a9bcc49e723f086327179a",
      });
      const savedEvent = await event.save();
      const user = await User.findById("63a9bcc49e723f086327179a");
      if (!user) {
        throw new Error("User does not exist");
      }
      const updatedUser = await User.findByIdAndUpdate(
        "63a9bcc49e723f086327179a",
        {
          $push: { events: event },
        }
      );
      if (!updatedUser) {
        throw new Error("Event created but not updated for user");
      }
      return event;
    } catch (error) {
      console.log("error while creating event ", error);
    }
  },
  createUser: async (args) => {
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
  },
};
