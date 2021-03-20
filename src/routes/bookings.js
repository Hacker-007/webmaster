const express = require("express");
const { newBookingValidation, getBookingValidation } = require("../middlewares/validation");
const Booking = require("../models/booking");
const verifyToken = require("../middlewares/verifyToken");
const canAccess = require("../middlewares/canAccess");

const bookingRouter = express.Router();

bookingRouter.post("/booking/add", verifyToken, canAccess(["User"]), async (req, res) => {
	const { error } = newBookingValidation(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
    
	const booking = new Booking({
		doctorName: req.body.doctorName,
		date: req.body.date,
		reason: req.body.reason,
		username: req.body["token"].name,
	});

	const savedBooking = await booking.save();
	res.status(201).send(savedBooking);
});

bookingRouter.get("/booking/get", verifyToken, canAccess(["User"]), async (req, res) => {
    const { error } = getBookingValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const booking = await Booking.findOne({
        username: req.body["token"].name,
        date: req.body.date,
    });

    res.status(200).send(booking)
});

bookingRouter.get("/booking/all", verifyToken, canAccess(["User"]), async (req, res) => {
    const { error } = getBookingValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const bookings = await Booking.find({});
    res.status(200).send(bookings)
});

module.exports = bookingRouter;
