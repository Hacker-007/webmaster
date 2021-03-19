import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { newBookingValidation, getBookingValidation } from "../middlewares/validation";
import Booking from "../models/booking";
import verifyToken from "../middlewares/verifyToken";
import canAccess from "../middlewares/canAccess";

const bookingRouter = express.Router();

bookingRouter.post("/booking/add", verifyToken, canAccess(["User"]), async (req: Request, res: Response) => {
	const { error } = newBookingValidation(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
    
	const booking = Booking.build({
		doctorName: req.body.doctorName as string,
		date: req.body.date as Date,
		reason: req.body.reason ?? "",
		username: req.body["token"].name,
	});

	const savedBooking = await booking.save();
	res.status(201).send(savedBooking);
});

bookingRouter.get("/booking/get", verifyToken, canAccess(["User"]), async (req: Request, res: Response) => {
    const { error } = getBookingValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const booking = await Booking.findOne({
        username: req.body["token"].name,
        date: req.body.date as Date,
    });

    res.status(200).send(booking)
});

export default bookingRouter;
