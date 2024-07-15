const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

	username: {
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
        enum: ['user', 'admin'],
        default: 'user',
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

	updatedAt: {
		type: Date,
		default: Date.now
	}

});

const User = mongoose.model('User', userSchema);

module.exports = User;
