import mongoose from "mongoose";

interface IUser {
	name: string;
	email: string;
	password: string;
	roles: string[];
}

interface UserDoc extends mongoose.Document {
	name: string;
	email: string;
	password: string;
	roles: string[];
}

interface IUserModel extends mongoose.Model<UserDoc> {
	build(attr: IUser): UserDoc;
}

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	roles: {
		type: Array,
		required: true,
	},
});

userSchema.statics.build = (attr: IUser) => new User(attr);

const User = mongoose.model<UserDoc, IUserModel>("User", userSchema);

export default User;
