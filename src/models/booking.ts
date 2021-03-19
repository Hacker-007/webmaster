import mongoose from "mongoose";

interface IBooking {
	doctorName: string;
	date: Date;
	reason: string;
	username: string;
}

interface BookingDoc extends mongoose.Document {
	doctorName: string;
	date: Date;
	reason: string;
	username: string[];
}

interface IBookingModel extends mongoose.Model<BookingDoc> {
	build(attr: IBooking): BookingDoc;
}

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

bookingSchema.statics.build = (attr: IBooking) => new Booking(attr);

const Booking = mongoose.model<BookingDoc, IBookingModel>("Booking", bookingSchema);

export default Booking;
