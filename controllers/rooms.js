const getAllRooms = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'get all rooms',
  });
};

export { getAllRooms };
