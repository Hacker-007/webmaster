const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
	doctorName: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	reason: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
