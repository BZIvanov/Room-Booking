const mongoose = require('mongoose');
const Room = require('../models/room');
const rooms = require('../data/rooms');

mongoose.connect('mongodb://localhost:27017/book-it', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const seedRooms = async () => {
  try {
    await Room.deleteMany();
    await Room.insertMany(rooms);
    console.log('Rooms data seeded');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedRooms();
