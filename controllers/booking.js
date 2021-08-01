import Booking from '../models/booking';
import catchAsync from '../middlewares/catch-async';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

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

const checkRoomBookedDates = catchAsync(async (req, res) => {
  const { roomId } = req.query;

  const bookings = await Booking.find({ room: roomId });

  let bookedDates = [];

  const timeDifference = moment().utcOffset() / 60;

  bookings.forEach((booking) => {
    const checkInDate = moment(booking.checkInDate).add(
      timeDifference,
      'hours'
    );
    const checkOutDate = moment(booking.checkOutDate).add(
      timeDifference,
      'hours'
    );

    const range = moment.range(moment(checkInDate), moment(checkOutDate));

    const dates = Array.from(range.by('day'));
    bookedDates = bookedDates.concat(dates);
  });

  res.status(200).json({
    success: true,
    bookedDates,
  });
});

export { createBooking, checkRoomAvailability, checkRoomBookedDates };
