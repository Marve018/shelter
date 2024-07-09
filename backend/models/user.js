const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

	userName: {
		type: String,
		required: true
	},

	password: {
		type: String,
		required: true
	},

	email: {
		type: String,
		unique: true,
		required: true
	},

	role: {
		type: String,
		required: true
	},

	firstName: {
		type: String,
		required: true
	},

	lastName: {
		type: String,
		required: true
	},

	createdAt: {
		type: Date,
		default: Date.now
	},

	updattedAt: {
		type: Date,
		default: Date.now
	}

});

const User = mongoose.model('User', 'userSchema');
