const stadiums = [
  {
    name: "Green Valley Stadium",
    location: "Manchester",
    price: 12,
    amenities: ["Floodlights", "Parking", "Changing Rooms"],
    images: "/assets/images/image.webp",
  },
  {
    name: "Urban Football Arena",
    location: "London",
    price: 78,
    amenities: ["Artificial Turf", "Café", "Parking"],
    images: "/assets/images/image.webp",
  },
  {
    name: "Central Sports Complex",
    location: "Liverpool",
    price: 15,
    amenities: ["Natural Grass", "Spectator Seating"],
    images: "/assets/images/image.webp",
  },
  {
    name: "Riverside Pitch",
    location: "Newcastle",
    price: 500,
    amenities: ["Natural Grass", "Changing Rooms"],
    images: "/assets/images/image.webp",
  },
  {
    name: "Metro Football Center",
    location: "Birmingham",
    price: 68,
    amenities: ["Artificial Turf", "Floodlights", "Spectator Seating"],
    images: "/assets/images/image.webp",
  },
  {
    name: "Eastside Grounds",
    location: "Leeds",
    price: 78,
    amenities: ["Artificial Turf", "Parking"],
    images: "/assets/images/image.webp",
  },
  {
    name: "Green Valley Stadium",
    location: "Manchester",
    price: 674,
    amenities: ["Floodlights", "Parking", "Changing Rooms"],
    images: "/assets/images/image.webp",
  },
  {
    name: "Urban Football Arena",
    location: "London",
    price: 85,
    amenities: ["Artificial Turf", "Café", "Parking"],
    images: "/assets/images/image.webp",
  },
  {
    name: "Central Sports Complex",
    location: "Liverpool",
    price: 150,
    amenities: ["Natural Grass", "Spectator Seating"],
    images: "/assets/images/image.webp",
  },
  {
    name: "Riverside Pitch",
    location: "Newcastle",
    price: 500,
    amenities: ["Natural Grass", "Changing Rooms"],
    images: "/assets/images/image.webp",
  },
  {
    name: "Metro Football Center",
    location: "Birmingham",
    price: 20,
    amenities: ["Artificial Turf", "Floodlights", "Spectator Seating"],
    images: "/assets/images/image.webp",
  },
  {
    name: "Eastside Grounds",
    location: "Leeds",
    price: 75,
    amenities: ["Artificial Turf", "Parking"],
    images: "/assets/images/image.webp",
  },
];

const stadiumContainer = document.getElementById("stadiumContainer");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const filters = document.querySelectorAll('#filters input[type="checkbox"]');

function renderCards() {
  const maxPrice = parseInt(priceRange.value);
  const selectedAmenities = Array.from(filters)
    .filter((f) => f.checked)
    .map((f) => f.value);

  stadiumContainer.innerHTML = "";

  const filtered = stadiums.filter((s) => {
    const matchPrice = s.price <= maxPrice;
    const matchAmenities = selectedAmenities.every((am) =>
      s.amenities.includes(am)
    );
    return matchPrice && matchAmenities;
  });

  filtered.forEach((s) => {
    const card = document.createElement("div");
    card.className = "col-md-6 col-xl-4";
    card.innerHTML = `
          <div class="card stadium-card shadow-sm h-100">
            <img src="${s.images}" class="card-img-top" alt="${s.name}">
            <div class="card-body">
              <h6 class="card-title mb-1">${s.name}</h6>
              <p class="text-muted small mb-1">${s.location}</p>
              <div class="mb-2">
                ${s.amenities
                  .map((a) => `<span class="badge text-bg-light">${a}</span>`)
                  .join(" ")}
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <span class="fw-bold">$${
                  s.price
                }<span class="text-muted fw-normal small">/hour</span></span>
                <a href="#" class="btn btn-outline-success">View Details</a>
              </div>
            </div>
          </div>
        `;
    stadiumContainer.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const maxPrice = Math.max(...stadiums.map((s) => s.price));
  priceRange.max = maxPrice;
  priceRange.value = maxPrice / 2;
  priceValue.textContent = maxPrice / 2;

  // Set initial background fill
  const percentage =
    ((priceRange.value - priceRange.min) / (priceRange.max - priceRange.min)) *
    100;
  priceRange.style.background = `linear-gradient(to right, #28a745 ${percentage}%, #ddd ${percentage}%)`;
});

priceRange.addEventListener("input", () => {
  const midpoint = priceRange.max / 2;
  const adjustedValue = midpoint + (priceRange.value - midpoint);
  priceValue.textContent = adjustedValue;

  // Update the background fill
  const percentage =
    ((priceRange.value - priceRange.min) / (priceRange.max - priceRange.min)) *
    100;
  priceRange.style.background = `linear-gradient(to right, #28a745 ${percentage}%, #ddd ${percentage}%)`;

  renderCards();
});

filters.forEach((f) => f.addEventListener("change", renderCards));

renderCards();
