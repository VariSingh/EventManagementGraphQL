const { fetchEvents, createEvent } = require("./events");
const { fetchUsers, createUser } = require("./user");
const { fetchBookings, createBooking, cancellBooking } = require("./booking");

module.exports = {
  events: fetchEvents,
  users: fetchUsers,
  bookings: fetchBookings,
  createEvent: createEvent,
  createUser: createUser,
  createBooking: createBooking,
  cancelBooking: cancellBooking,
};
