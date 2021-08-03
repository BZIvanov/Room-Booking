import Room from '../models/room';
import Booking from '../models/booking';
import catchAsync from '../middlewares/catch-async';
import AppError from '../utils/app-error';
import APIFeatures from '../utils/api-features';

const getAllRooms = catchAsync(async (req, res) => {
  const apiFeatures = new APIFeatures(Room.find(), req.query).search().filter();

  let rooms = await apiFeatures.query;
  const filteredCount = rooms.length;

  apiFeatures.pagination();
  rooms = await apiFeatures.query;

  const totalCount = await Room.countDocuments();

  res.status(200).json({
    success: true,
    totalCount,
    filteredCount,
    perPage: apiFeatures.perPage,
    rooms,
  });
});

const getRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    return next(new AppError('Room not found', 404));
  }

  res.status(200).json({
    success: true,
    room,
  });
});

const createRoom = catchAsync(async (req, res) => {
  const room = await Room.create(req.body);

  res.status(201).json({
    success: true,
    room,
  });
});

const updateRoom = catchAsync(async (req, res) => {
  let room = await Room.findById(req.query.id);

  if (!room) {
    return next(new AppError('Room not found', 404));
  }

  room = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    room,
  });
});

const deleteRoom = catchAsync(async (req, res) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    return next(new AppError('Room not found', 404));
  }

  await Room.remove();

  res.status(200).json({ success: true });
});

const createReview = catchAsync(async (req, res) => {
  const { rating, comment, roomId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: +rating,
    comment,
  };

  const room = await Room.findById(roomId);
  if (!room) {
    return next(new AppError('Room not found', 404));
  }

  const isReviewed = room.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    room.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    room.reviews.push(review);
    room.reviewsNumber = room.reviews.length;
  }

  const totalRating = room.reviews.reduce(
    (acc, review) => review.rating + acc,
    0
  );
  room.rating = totalRating / room.reviews.length;

  await room.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
});

const eligibleReviewer = catchAsync(async (req, res) => {
  const { roomId } = req.query;
  const bookings = await Booking.find({ user: req.user._id, room: roomId });
  const isEligibleReviewer = bookings.length > 0;

  res.status(200).json({ success: true, isEligibleReviewer });
});

export {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  createReview,
  eligibleReviewer,
};
