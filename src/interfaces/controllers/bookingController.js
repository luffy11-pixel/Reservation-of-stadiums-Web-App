export const createBooking = (req, res) => {
  const { stadiumId, userId, time } = req.body;
  // Example response
  res.status(201).json({ message: "Booking created", stadiumId, userId, time });
};

export const getBookingDetails = (req, res) => {
  const { id } = req.params;
  // Example response
  res.json({ id:1, stadiumId: 1, userId: 123, time: "2023-10-01T10:00:00Z" });
};

