import Room from '../models/room';
import catchAsync from '../middlewares/catch-async';
import AppError from '../utils/app-error';
import APIFeatures from '../utils/api-features';

const getAllRooms = catchAsync(async (req, res) => {
  const apiFeatures = new APIFeatures(Room.find(), req.query)
    .search()
    .filter()
    .pagination();

  const rooms = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: rooms.length,
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

export { getAllRooms, getRoom, createRoom, updateRoom, deleteRoom };
