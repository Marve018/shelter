const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/")


// SCHEMA SETUP
const propertySchema = new mongoose.schema({
	type: {
		type: String,
		required: true
	},

	address: {
		type: String,
		required: true
	},

	country: {
		type: String
	}




});
