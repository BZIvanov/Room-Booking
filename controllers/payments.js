import absoluteUrl from 'next-absolute-url';
import Room from '../models/room';
import User from '../models/user';
import Booking from '../models/booking';
import catchAsync from '../middlewares/catch-async';

const stripe = require('stripe')(process.env.STRIPE_API_SECRET);

const stripeCheckoutSession = catchAsync(async (req, res) => {
  const { checkInDate, checkOutDate, daysOfStay, amount } = req.query;

  const room = await Room.findById(req.query.roomId);

  const { origin } = absoluteUrl(req);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${origin}/bookings/me`,
    cancel_url: `${origin}/room/${room._id}`,
    customer_email: req.user.email,
    client_reference_id: req.query.roomId,
    metadata: { checkInDate, checkOutDate, daysOfStay },
    line_items: [
      {
        name: room.name,
        images: [room.images[0].url],
        amount: amount * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],
  });

  res.status(200).json({
    success: true,
    session,
  });
});

export { stripeCheckoutSession };
