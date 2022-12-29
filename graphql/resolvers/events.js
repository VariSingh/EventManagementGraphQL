const Event = require("../../models/event");

exports.fetchEvents = async () => {
  try {
    return await Event.find().populate("creator");
  } catch (error) {
    console.log("error ", error);
  }
};

exports.createEvent = async (args) => {
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
};
