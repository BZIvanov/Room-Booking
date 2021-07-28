const { Schema, models, model } = require('mongoose');

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide room name'],
      maxLength: [50, 'Room name should be at most 50 characters'],
      trim: true,
    },
    pricePerNight: {
      type: Number,
      required: [true, 'Please provide room price'],
      max: [999, 'Room price should cost at most 999'],
    },
    description: {
      type: String,
      required: [true, 'Please provide room description'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Please provide room address'],
      trim: true,
    },
    guestsCapacity: {
      type: Number,
      required: [true, 'Please provide guests capacity'],
    },
    bedsNumber: {
      type: Number,
      required: [true, 'Please provide number of beds'],
    },
    internet: {
      type: Boolean,
      default: false,
    },
    breakfast: {
      type: Boolean,
      default: false,
    },
    airConditioner: {
      type: Boolean,
      default: false,
    },
    petsAllowed: {
      type: Boolean,
      default: false,
    },
    roomCleaning: {
      type: Boolean,
      default: false,
    },
    images: [
      {
        publicId: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, 'Please provide room category type'],
      enum: {
        values: ['Kingsize', 'Single', 'Double'],
        message: 'Please select correct room category',
      },
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviewsNumber: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: Schema.ObjectId,
          ref: 'User',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    roomCreator: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

// for Next.js we must do this check for already existing model
module.exports = models.Room || model('Room', schema);
