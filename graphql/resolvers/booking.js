const Booking = require("../../models/booking");

exports.fetchBookings = async () => {
  try {
    return await Booking.find().populate("events").populate("creator");
  } catch (error) {
    console.log("error ", error);
  }
};

exports.createBooking = async (args) => {
  try {
    const booking = await new Booking({
      event: args.eventId,
      creator: "63a9bcc49e723f086327179a",
    });
    booking.save();
    if (!booking) {
      throw new Error("Event could not be booked");
    }
    return booking;
  } catch (error) {
    console.log("error ", error);
  }
};

exports.cancellBooking = async (args) => {
  try {
    const booking = await Booking.findOne({ _id: args.bookingId });
    if (!booking) {
      throw new Error("Booking not found");
    }
    console.log("booking.cancelled ", booking);
    if (booking.cancelled) {
      throw new Error("Booking already cancelled");
    }
    const updatedBooking = await Booking.findOneAndUpdate(
      {
        _id: args.bookingId,
      },
      {
        cancelled: true,
      }
    );
    if (!updatedBooking) {
      throw new Error("Booking not found or could not be cancelled");
    }
    return updatedBooking;
  } catch (error) {
    console.log("error ", error);
    return error;
  }
};
