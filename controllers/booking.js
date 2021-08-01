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

const checkRoomAvailability = catchAsync(async (req, res) => {
  let { roomId, checkInDate, checkOutDate } = req.query;
  console.log(roomId, checkInDate, checkOutDate);
  checkInDate = new Date(checkInDate);
  checkOutDate = new Date(checkOutDate);

  const bookings = await Booking.find({
    room: roomId,
    $and: [
      { checkInDate: { $lte: checkOutDate } },
      { checkOutDate: { $gte: checkInDate } },
    ],
  });

  const isAvailable = bookings.length === 0;

  res.status(200).json({
    success: true,
    isAvailable,
  });
});

export { createBooking, checkRoomAvailability };
