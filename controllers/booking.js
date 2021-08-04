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

const getMyBookings = catchAsync(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate({
      path: 'room',
      select: 'name pricePerNight images',
    })
    .populate({
      path: 'user',
      select: 'name email',
    });

  res.status(200).json({
    success: true,
    bookings,
  });
});

const getBooking = catchAsync(async (req, res) => {
  const booking = await Booking.findById(req.query.id)
    .populate({
      path: 'room',
      select: 'name pricePerNight images',
    })
    .populate({
      path: 'user',
      select: 'name email',
    });

  res.status(200).json({
    success: true,
    booking,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const bookings = await Booking.find();

  res.status(200).json({
    success: true,
    bookings,
  });
});

const removeBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.query.id);
  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  await booking.remove();

  res.status(200).json({ success: true });
});

export {
  createBooking,
  checkRoomAvailability,
  checkRoomBookedDates,
  getMyBookings,
  getBooking,
  getAllBookings,
  removeBooking,
};
