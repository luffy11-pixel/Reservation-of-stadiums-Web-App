import { stadiums } from "./stadiumController.js"; // Import the stadiums array

export const getHome = (req, res) => {
  res.render("Index", { page: "home", stadiums }); // Pass stadiums to the view
};

export const getlogin = (req, res) => {
  res.render("login.ejs", { page: "login" });
};

export const getAllStadiums = (req, res) => {
  res.render("stadiums.ejs", { page: "stadiums" });
};

export const getAbout = (req, res) => {
  res.render("about.ejs", { page: "About" });
};

export const getConactUs = (req, res) => {
  res.render("contact.ejs", { page: "Contact-Us" });
};

export const getBookingPage = (req, res) => {
  res.render("booking", { page: "booking" });
};
