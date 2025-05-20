// Date Selection Logic
const datesContainer = document.getElementById("dateSelection");
const timeSlotsContainer = document.getElementById("timeSlots");
const selectedDateTime = document.getElementById("selectedDateTime");
const checkoutBtn = document.getElementById("checkoutBtn");
const bookingAlert = document.getElementById("bookingAlert");

// Sample available dates and times
const availableDates = [
  { date: "2025-05-12", day: "Mon", times: ["morning", "evening"] },
  { date: "2025-05-13", day: "Tue", times: ["afternoon"] },
  // More dates...
];

let currentWeekStart = new Date("2025-05-12"); // Initial week start date

// Generate week range string
function getWeekRange(startDate) {
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  return `${startDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })} - ${endDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })}`;
}

// Generate dates for the current week
function getWeekDates(startDate) {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push({
      date: date.toISOString().split("T")[0],
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
    });
  }
  return dates;
}

// Render week dates
function renderDates() {
  const weekDates = getWeekDates(currentWeekStart);
  datesContainer.innerHTML = weekDates
    .map(
      (date) => `
    <div class="col">
      <div class="time-slot text-center p-2" data-date="${date.date}">
        <div class="fw-bold">${date.day}</div>
        <div>${date.date.split("-")[2]}</div>
      </div>
    </div>
  `
    )
    .join("");

  document.getElementById("currentWeekRange").textContent =
    getWeekRange(currentWeekStart);

  // Add click handlers
  document.querySelectorAll("#dateSelection .time-slot").forEach((slot) => {
    slot.addEventListener("click", function () {
      // Update UI
      document
        .querySelectorAll("#dateSelection .time-slot")
        .forEach((s) => s.classList.remove("selected"));
      this.classList.add("selected");

      // Show available times
      const selectedDate = this.dataset.date;
      const availableDate = availableDates.find((d) => d.date === selectedDate);
      renderTimeSlots(availableDate ? availableDate.times : []);
    });
  });
}

// Generate time slots UI
function renderTimeSlots(availableTimes) {
  const timeSlots = {
    morning: { label: "Morning", time: "8:00 AM - 10:00 AM", price: 90 },
    afternoon: { label: "Afternoon", time: "12:00 PM - 2:00 PM", price: 100 },
    evening: { label: "Evening", time: "6:00 PM - 8:00 PM", price: 120 },
  };

  timeSlotsContainer.innerHTML = availableTimes
    .map(
      (time) => `
    <div class="col-md-6">
      <div class="time-slot" data-time="${time}">
        <div class="d-flex justify-content-between">
          <span class="fw-bold">${timeSlots[time].label}</span>
          <span class="text-success">$${timeSlots[time].price}/hr</span>
        </div>
        <div class="time-range">${timeSlots[time].time}</div>
        <div class="availability text-muted">4 slots left</div>
      </div>
    </div>
  `
    )
    .join("");

  // Add click handlers
  document.querySelectorAll("#timeSlots .time-slot").forEach((slot) => {
    slot.addEventListener("click", function () {
      document
        .querySelectorAll("#timeSlots .time-slot")
        .forEach((s) => s.classList.remove("selected"));
      this.classList.add("selected");

      // Update booking summary
      const selectedDate = document.querySelector("#dateSelection .selected");
      const dateStr = new Date(selectedDate.dataset.date).toLocaleDateString(
        "en-US",
        {
          weekday: "long",
          month: "long",
          day: "numeric",
        }
      );
      const timeStr = this.querySelector(".time-range").textContent;

      selectedDateTime.innerHTML = `
        <div class="fw-bold">${dateStr}</div>
        <div>${timeStr}</div>
      `;

      checkoutBtn.disabled = false;
      bookingAlert.classList.remove("d-none");
    });
  });
}

// Week navigation handlers
document.getElementById("prevWeek").addEventListener("click", () => {
  currentWeekStart.setDate(currentWeekStart.getDate() - 7);
  renderDates();
});

document.getElementById("nextWeek").addEventListener("click", () => {
  currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  renderDates();
});

// Initialize
renderDates();

// Checkout handler
checkoutBtn.addEventListener("click", () => {
  // Redirect to payment page
  window.location.href = "/checkout";
});
