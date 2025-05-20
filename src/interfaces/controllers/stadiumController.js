export const stadiums = [
  {
    id: 1,
    name: "Green Valley Stadium",
    location: "123 Main St, Manchester",
    price: "$120/hour",
    rating: 4.8,
    features: ["Floodlights", "Changing Rooms", "Parking"],
    image: "/assets/images/images.jpg",
    images: ["/assets/images/images.jpg", "/assets/images/images (1).jpg"], // Add images array
  },
  {
    id: 2,
    name: "Urban Football Arena",
    location: "456 Park Ave, London",
    price: "$85/hour",
    rating: 4.5,
    features: ["Artificial Turf", "Cafe", "Equipment Rental"],
    image: "/assets/images/images (1).jpg",
    images: ["/assets/images/images (1).jpg", "/assets/images/images (2).jpg"], // Add images array
  },
  {
    id: 3,
    name: "Central Sports Complex",
    location: "789 Stadium Dr, Liverpool",
    price: "$150/hour",
    rating: 4.9,
    features: ["Natural Grass", "Spectator Seating", "Pro Equipment"],
    image: "/assets/images/images (2).jpg",
    images: ["/assets/images/images (2).jpg", "/assets/images/images (3).jpg"], // Add images array
  },
];

const testimonials = [
  {
    id: 3,
    name: "Alice Johnson",
    avatar: "/assets/images/images(2).jpg",
    role: "Football Enthusiast",
    rating: 5,
    content: "The booking process was seamless, and the stadium was fantastic!",
  },
  {
    name: "Bob Smith",
    avatar: "/assets/images/avatar2.jpg",
    role: "Coach",
    rating: 4,
    content: "Great facilities and easy to book. Highly recommend!",
  },
  {
    name: "Charlie Brown",
    avatar: "/assets/images/avatar3.jpg",
    role: "Player",
    rating: 5,
    content: "Amazing experience! Will definitely book again.",
  },
];

export const getStadiumById = (req, res) => {
  const { id } = req.params; // Get the stadium ID from the URL
  const stadium = stadiums.find((s) => s.id === parseInt(id)); // Find the stadium by ID
  if (!stadium) {
    return res.status(404).render("404.ejs", { error: "Stadium Not Found" });
  }

  // Filter testimonials for the specific stadium
  const reviewstestimonials = testimonials.filter((t) => t.id === parseInt(id));

  res.render("stadiumDetails", {
    stadium,
    reviewstestimonials,
    page: "stadiums",
  });
};
