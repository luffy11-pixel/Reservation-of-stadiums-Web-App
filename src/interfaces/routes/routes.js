import express from "express";
import { getStadiumById } from "../controllers/stadiumController.js";
import {
  createBooking,
  getBookingDetails,
} from "../controllers/bookingController.js";
import {
  getAbout,
  getAllStadiums,
  getBookingPage,
  getHome,
  getConactUs,
  getlogin,
} from "../controllers/navBarController.js";
import { getRegister } from "../controllers/registerconttroller.js";
const router = express.Router();

// Home route
router.get("/", getHome);

// Stadium routes
router.get("/stadiums", getAllStadiums);

router.get("/stadiums/:id", getStadiumById);

// Login route
router.get("/login", getlogin);

//Register route
router.get("/register", getRegister);

// Contact route
router.get("/Contact-Us", getConactUs);

//about route
router.get("/About", getAbout);

// Booking routes
router.get("/booking", getBookingPage);

router.post("/booking", createBooking);

router.get("/booking/:id", getBookingDetails);

// Catch-all 404 route
router.use((req, res) => {
  res.status(404).render("404", { error: "Page Not Found" });
});

export default router;
