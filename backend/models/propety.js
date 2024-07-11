const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/")


// SCHEMA SETUP
const propertySchema = new mongoose.schema({
	title: {
		type: String,
		required: true
	},

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

	address: {
		type: String,
		required: true
	},

	country: {
		type: String,
        required: true
	},

    state: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
      },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },

});

module.exports = mongoose.model('Property', propertySchema);
