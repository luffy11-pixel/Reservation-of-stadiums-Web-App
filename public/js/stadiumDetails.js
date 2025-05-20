const mainImage = document.getElementById("mainImage");
const smallImages = document.querySelectorAll(".small-images img");
let currentIndex = 0;
let interval;

function startSlideshow() {
  interval = setInterval(() => {
    smallImages[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % smallImages.length;
    smallImages[currentIndex].classList.add("active");
    mainImage.src = smallImages[currentIndex].src; // Update main image
  }, 3000);
}

function selectImage(index) {
  clearInterval(interval); // Stop the slideshow
  smallImages[currentIndex].classList.remove("active");
  currentIndex = index;
  smallImages[currentIndex].classList.add("active");
  mainImage.src = smallImages[currentIndex].src; // Update main image
  startSlideshow(); // Restart the slideshow
}

startSlideshow(); // Start the slideshow on page load

const calendarCells = document.querySelectorAll(
  ".calendar-table td.available"
);

calendarCells.forEach((cell) => {
  cell.addEventListener("click", () => {
    // Remove active class from all cells
    calendarCells.forEach((c) => c.classList.remove("active"));
    // Add active class to the clicked cell
    cell.classList.add("active");
  });
});

const calendarBody = document.getElementById("calendarBody");
const currentMonth = document.getElementById("currentMonth");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

let date = new Date();

function renderCalendar() {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  currentMonth.textContent = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  calendarBody.innerHTML = "";
  let row = document.createElement("tr");
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
    row.appendChild(document.createElement("td"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("td");
    cell.textContent = day;
    cell.classList.add("available");
    cell.addEventListener("click", () => {
      document
        .querySelectorAll(".calendar-table td")
        .forEach((c) => c.classList.remove("active"));
      cell.classList.add("active");
    });
    row.appendChild(cell);

    if ((firstDay + day - 1) % 7 === 0) {
      calendarBody.appendChild(row);
      row = document.createElement("tr");
    }
  }
  if (row.children.length > 0) {
    calendarBody.appendChild(row);
  }
}

prevMonth.addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

nextMonth.addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

let currentReviewPage = 0;

function changeReviewPage(direction) {
  const reviewCards = document.querySelectorAll(".review-card");
  const reviewsPerPage = 2;
  const totalPages = Math.ceil(reviewCards.length / reviewsPerPage);

  currentReviewPage = Math.max(
    0,
    Math.min(currentReviewPage + direction, totalPages - 1)
  );

  reviewCards.forEach((card, index) => {
    card.style.display =
      Math.floor(index / reviewsPerPage) === currentReviewPage
        ? "flex"
        : "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  changeReviewPage(0);
});