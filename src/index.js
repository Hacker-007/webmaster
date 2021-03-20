const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/bookings");
const bcrypt = require("bcryptjs");
const User = require("./models/user");
const cors = require("cors");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(
	"mongodb://localhost:27017/webmaster",
	{
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => console.log("Connected To The Database.")
);

app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(bookingRoutes);

// if (process.env.NODE_ENV === "production") {
	app.use(express.static(__dirname + "/public/"));
	app.get(/.*/, (_, res) => res.sendFile(__dirname + "/public/index.html"));
// }

app.listen(port, preloadData);

function preloadData() {
	User.deleteMany({}, async () => {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash("Test", salt);
		const admin = new User({
			name: "Admin",
			email: "admin@gmail.com",
			password: hashedPassword,
			roles: ["User", "Admin"],
		});

		await admin.save();
	});

	console.log(`The Server Is Listening On Port ${port}.`);
}
