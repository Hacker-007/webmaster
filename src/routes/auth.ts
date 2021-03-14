import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { registerValidation, loginValidation } from "../middlewares/validation";
import User from "../models/user";

const authRouter = express.Router();

authRouter.post("/register", async (req: Request, res: Response) => {
	const { error } = registerValidation(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	const doesEmailExist = await User.findOne({ email: req.body.email });
	if (doesEmailExist) {
		return res.status(400).send("Email Already Exists.");
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	const user = User.build({
		name: req.body.name as string,
		email: req.body.email as string,
		password: hashedPassword,
		roles: ["User"],
	});

	const savedUser = await user.save();
	res.status(201).send(savedUser);
});

authRouter.post("/login", async (req: Request, res: Response) => {
	const { error } = loginValidation(req.body);
	if (error) {
		return res.status(400).send("Invalid Information.");
	}

	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return res.status(400).send("Invalid Information.");
	}

	const validPassword = await bcrypt.compare(
		req.body.password,
		user.password
	);
	if (!validPassword) {
		return res.status(400).send("Invalid Information.");
	}

	const token = jwt.sign(
		{ id: user._id, name: user.name, roles: user.roles },
		process.env.TOKEN_SECRET ||
			"^&%kjhs*&KJha%@WElkj(a97JQJ!KjaMNakjsd5634Bjasd14asD"
	);
	res.status(200).send({ token });
});

export default authRouter;
