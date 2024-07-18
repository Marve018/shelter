const mongoose = require('mongoose');

//


// SCHEMA SETUP
const propertySchema = new mongoose.Schema({
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

    imageUrl: [
        {
            url: {
                type: String,
                required: true,
            },
            public_id: {
                type: String,
                required: true,
            },
        },
    ],

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },

});

module.exports = mongoose.model('Property', propertySchema);
