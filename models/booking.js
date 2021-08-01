import { Schema, models, model } from 'mongoose';
import timeZone from 'mongoose-timezone';

const schema = new Schema(
  {
    room: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Room',
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    daysOfStay: {
      type: Number,
      required: true,
    },
    paymentInfo: {
      id: { type: String, required: true },
      status: { type: String, required: true },
    },
    paidAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// we will provide timeZone, because by default mongoose is using UTC
schema.plugin(timeZone);

module.exports = models.Booking || model('Booking', schema);
