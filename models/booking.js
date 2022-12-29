const mongoose = require("mongoose");
const { SchemaTypes } = mongoose;
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    event: { type: SchemaTypes.ObjectId, ref: "Event" },
    creator: { type: SchemaTypes.ObjectId, ref: "User" },
    cancelled: { type: Boolean, default: false },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
