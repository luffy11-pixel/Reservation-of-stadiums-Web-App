document.getElementById("reservation-form")?.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Reservation Successful! Redirecting to Payment...");
    window.location.href = "payment.html";
});

document.getElementById("login-form")?.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Login Successful!");
});

document.addEventListener("DOMContentLoaded", function() {
    console.log("Football Field Reservation System Loaded!");
});
const panels = document.querySelectorAll(".panel");

panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    removeActiveClasses();
    panel.classList.add("active");
  });
});

const removeActiveClasses = () => {
  panels.forEach((panel) => {
    panel.classList.remove("active");
  });
};

