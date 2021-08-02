import absoluteUrl from 'next-absolute-url';
import getRawBody from 'raw-body';
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

const webhookCheckout = catchAsync(async (req, res) => {
  console.log('here');
  try {
    const rawBody = await getRawBody(req);
    const sig = req.headers['stripe-signature'];
    console.log(sig);
    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      const roomId = session.client_reference_id;
      const userId = (await User.findOne({ email: session.customer_email })).id;
      const amountPaid = session.amount_total / 100;
      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };
      const checkInDate = session.metadata.checkInDate;
      const checkOutDate = session.metadata.checkOutDate;
      const daysOfStay = session.metadata.daysOfStay;

      await Booking.create({
        room: roomId,
        user: userId,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now(),
      });

      res.status(201).json({ success: true });
    }
  } catch (error) {
    console.log('Stripe webhook error: ', error);
  }
});

export { stripeCheckoutSession, webhookCheckout };
