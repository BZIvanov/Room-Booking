import Booking from '../models/booking';
import catchAsync from '../middlewares/catch-async';

const createBooking = catchAsync(async (req, res) => {
  const {
    roomId,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = req.body;

  const booking = await Booking.create({
    room: roomId,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt: Date.now(),
  });

  res.status(201).json({
    success: true,
    booking,
  });
});

export { createBooking };
