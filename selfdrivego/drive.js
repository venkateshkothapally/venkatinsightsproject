/**
 * Venkatinsights - Self Drive • Rental • Travel • Auto Services
 * Locations: All Locations | Bhupalpally | Warangal | Kataram | Gaddiganipally
 * GPS Auto-Detection & Area-Specific Search Engine
 */

"use strict";

/* ==========================================================================
   1. DATA ARCHITECTURE & SAMPLE DATA
   ========================================================================== */

/**
 * Operating Hubs: Dynamically expandable.
 * Ready for: GET /api/locations
 */
const locations = [
  {
    id: "all",
    name: "All Locations",
    servicesLine: "All Active Cities & Localities"
  },
  {
    id: "bhupalpally",
    name: "Bhupalpally",
    servicesLine: "Self Drive • Rental • Travel • Auto"
  },
  {
    id: "warangal",
    name: "Warangal",
    servicesLine: "Self Drive • Rental • Travel • Auto"
  },
  {
    id: "Kataram",
    name: "Kataram",
    servicesLine: "Self Drive • Rental • Travel • Auto"
  }
];

/**
 * Cars Database: Includes specific 'area' (e.g. Gaddiganipally)
 * Ready for: GET /api/vehicles
 */
let vehicles = [
  // --- BHUPALPALLY CARS (Including Gaddiganipally) ---
  {
    id: 1,
    location: "Bhupalpally",
    area: "Gaddiganipally", // Specific local neighborhood
    type: "car",
    name: "Maruti Suzuki Swift",
    model: "Swift VXi • 2023",
    fuel: "Petrol",
    transmission: "Manual",
    seater: 5,
    rcNumber: "TS 03 EX 0001",
    ownerName: "Ramesh Reddy (Demo)",
    phone: "919876543210",
    whatsapp: "919876543210",
    price: "₹1,500/day",
    services: ["self-drive", "rental"],
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    location: "Bhupalpally",
    area: "Gaddiganipally", // Specific local neighborhood
    type: "car",
    name: "Maruti Suzuki Ertiga",
    model: "ZXi CNG • 2023",
    fuel: "CNG",
    transmission: "Manual",
    seater: 7,
    rcNumber: "TS 03 EX 0002",
    ownerName: "K. Mahender (Demo)",
    phone: "919876543211",
    whatsapp: "919876543211",
    price: "₹2,400/day",
    services: ["self-drive", "rental", "travel"],
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    location: "Bhupalpally",
    area: "Main Bus Stand",
    type: "car",
    name: "Tata Nexon EV",
    model: "Empowered Plus • 2024",
    fuel: "Electric",
    transmission: "Automatic",
    seater: 5,
    rcNumber: "TS 03 EX 0003",
    ownerName: "Venkat Rao (Demo)",
    phone: "919876543212",
    whatsapp: "919876543212",
    price: "₹2,200/day",
    services: ["self-drive"],
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=700&q=80"
  },

  // --- WARANGAL CARS ---
  {
    id: 4,
    location: "Warangal",
    area: "Subedari",
    type: "car",
    name: "Toyota Innova Crysta",
    model: "2.4 GX 7-Seater • 2023",
    fuel: "Diesel",
    transmission: "Manual",
    seater: 7,
    rcNumber: "TS 03 WX 1001",
    ownerName: "Ch. Praveen (Demo)",
    phone: "919876543220",
    whatsapp: "919876543220",
    price: "₹3,200/day",
    services: ["travel", "rental"],
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 5,
    location: "Warangal",
    area: "Nayeemnagar",
    type: "car",
    name: "Hyundai Creta",
    model: "SX (O) IVT • 2024",
    fuel: "Petrol",
    transmission: "Automatic",
    seater: 5,
    rcNumber: "TS 03 WX 1002",
    ownerName: "V. Rajeshwar (Demo)",
    phone: "919876543221",
    whatsapp: "919876543221",
    price: "₹2,800/day",
    services: ["self-drive", "rental"],
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 6,
    location: "Warangal",
    area: "Kazipet Junction",
    type: "car",
    name: "Force Urbania",
    model: "Luxury Van • 2024",
    fuel: "Diesel",
    transmission: "Manual",
    seater: 12,
    rcNumber: "TS 03 WX 1003",
    ownerName: "Warangal Tours (Demo)",
    phone: "919876543222",
    whatsapp: "919876543222",
    price: "₹5,500/day",
    services: ["travel"],
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=700&q=80"
  },

  // --- Kataram CARS ---
  {
    id: 7,
    location: "Kataram",
    area: "Center Chowrasta",
    type: "car",
    name: "Maruti Suzuki Dzire",
    model: "ZXi AT • 2023",
    fuel: "Petrol",
    transmission: "Automatic",
    seater: 5,
    rcNumber: "TS 03 MX 2001",
    ownerName: "Suresh Goud (Demo)",
    phone: "919876543230",
    whatsapp: "919876543230",
    price: "₹1,800/day",
    services: ["self-drive", "rental"],
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 8,
    location: "Kataram",
    area: "Panchayat Road",
    type: "car",
    name: "Mahindra Bolero Neo",
    model: "N10 Diesel • 2023",
    fuel: "Diesel",
    transmission: "Manual",
    seater: 7,
    rcNumber: "TS 03 MX 2002",
    ownerName: "A. Srinivas (Demo)",
    phone: "919876543231",
    whatsapp: "919876543231",
    price: "₹2,200/day",
    services: ["travel", "rental"],
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=700&q=80"
  }
];

/**
 * Autos Database: Dedicated Auto Section (includes Gaddiganipally Auto Stand)
 */
let autos = [
  {
    id: 101,
    location: "Bhupalpally",
    area: "Gaddiganipally",
    type: "auto",
    driverName: "Tharun Challuri (Gaddiganipally)",
    rcNumber: "TS 03 UA XXXX",
    phone: "918340066343",
    whatsapp: "918340066343"
  },
  {
    id: 102,
    location: "Bhupalpally",
    area: "Ambedkar Chowk BhupalpallyA",
    type: "auto",
    driverName: "Challuri KalyanPrasad",
    rcNumber: "TS 03 UA XXXX",
    phone: "917997709551",
    whatsapp: "917997709551"
  },
  {
    id: 103,
    location: "Bhupalpally",
    area: "Bhupalpally Main road",
    type: "auto",
    driverName: " UPDATES SOON",
    rcNumber: "TS 03 UA 0201",
    phone: "919876543242",
    whatsapp: "919876543242"
  },
  {
    id: 104,
    location: "Kataram",
    area: "Main Road Stand",
    type: "auto",
    driverName: "UPDATES SOON",
    rcNumber: "TS 03 UA 0301",
    phone: "919876543243",
    whatsapp: "919876543243"
  }
];

/* ==========================================================================
   2. CONSTANT WATERMARK FOOTER RULE
   ========================================================================== */
const WHATSAPP_BRANDING_FOOTER = 
`— Designed and Developed by Venkatesh Kothapally
Please support: Venkatinsights.in`;

/* ==========================================================================
   3. APP STATE MANAGEMENT
   ========================================================================== */
const state = {
  activeLocation: "All Locations", // Default to "All Locations" or user selection
  selectedServiceFilter: "all",    // all, self-drive, rental, travel, auto
  fuelFilter: "all",              // all, Petrol, Diesel, CNG, Electric
  transmissionFilter: "all",      // all, Automatic, Manual
  seaterFilter: "all",            // all, 5, 7, more
  searchQuery: "",
  selectedCar: null,
  selectedAuto: null
};

/* ==========================================================================
   4. DOM REFERENCES
   ========================================================================== */
const dom = {
  // Navigation
  hamburgerBtn: document.getElementById("hamburgerBtn"),
  navLinks: document.getElementById("navLinks"),
  navBrand: document.getElementById("navBrand"),
  navHomeBtn: document.getElementById("navHomeBtn"),
  navBackBtn: document.getElementById("navBackBtn"),
  navAddServiceBtn: document.getElementById("navAddServiceBtn"),

  // Views
  homeView: document.getElementById("homeView"),
  catalogView: document.getElementById("catalogView"),
  locationCardsContainer: document.getElementById("locationCardsContainer"),
  catalogBackBtn: document.getElementById("catalogBackBtn"),
  locationSelectorDropdown: document.getElementById("locationSelectorDropdown"),

  // Search & Filters
  globalSearchInput: document.getElementById("globalSearchInput"),
  clearSearchBtn: document.getElementById("clearSearchBtn"),
  mainServiceFilters: document.getElementById("mainServiceFilters"),
  carFilterControls: document.getElementById("carFilterControls"),
  fuelFilterGroup: document.getElementById("fuelFilterGroup"),
  transmissionFilterGroup: document.getElementById("transmissionFilterGroup"),
  seaterFilterGroup: document.getElementById("seaterFilterGroup"),
  resetFiltersBtn: document.getElementById("resetFiltersBtn"),
  resultsCount: document.getElementById("resultsCount"),

  // Catalog Grids
  carServicesGrid: document.getElementById("carServicesGrid"),
  autoServicesGrid: document.getElementById("autoServicesGrid"),

  // Car Booking Modal
  carModal: document.getElementById("carModal"),
  closeCarModalBtn: document.getElementById("closeCarModalBtn"),
  modalCarImg: document.getElementById("modalCarImg"),
  modalCarTitle: document.getElementById("modalCarTitle"),
  modalCarModel: document.getElementById("modalCarModel"),
  modalBadges: document.getElementById("modalBadges"),
  modalSpecFuel: document.getElementById("modalSpecFuel"),
  modalSpecTrans: document.getElementById("modalSpecTrans"),
  modalSpecSeater: document.getElementById("modalSpecSeater"),
  modalSpecOwner: document.getElementById("modalSpecOwner"),
  modalSpecRC: document.getElementById("modalSpecRC"),
  modalSpecLocation: document.getElementById("modalSpecLocation"),
  carBookingForm: document.getElementById("carBookingForm"),
  custName: document.getElementById("custName"),
  custMobile: document.getElementById("custMobile"),
  custServiceType: document.getElementById("custServiceType"),
  bookingDateTime: document.getElementById("bookingDateTime"),
  handoverDateTime: document.getElementById("handoverDateTime"),
  durationDisplayCard: document.getElementById("durationDisplayCard"),
  durationCalcText: document.getElementById("durationCalcText"),
  custPickupLocation: document.getElementById("custPickupLocation"),
  btnDetectCarLocation: document.getElementById("btnDetectCarLocation"),
  distanceRequirement: document.getElementById("distanceRequirement"),
  customDistanceGroup: document.getElementById("customDistanceGroup"),
  customDistanceInput: document.getElementById("customDistanceInput"),
  custDestination: document.getElementById("custDestination"),
  custAdditionalInfo: document.getElementById("custAdditionalInfo"),
  btnCarCall: document.getElementById("btnCarCall"),
  callButtonText: document.getElementById("callButtonText"),

  // Auto Modal
  autoModal: document.getElementById("autoModal"),
  closeAutoModalBtn: document.getElementById("closeAutoModalBtn"),
  autoSpecDriver: document.getElementById("autoSpecDriver"),
  autoSpecRC: document.getElementById("autoSpecRC"),
  autoSpecLocation: document.getElementById("autoSpecLocation"),
  autoBookingForm: document.getElementById("autoBookingForm"),
  autoCustName: document.getElementById("autoCustName"),
  autoCustMobile: document.getElementById("autoCustMobile"),
  autoPickupLocation: document.getElementById("autoPickupLocation"),
  btnDetectAutoLocation: document.getElementById("btnDetectAutoLocation"),
  autoDestination: document.getElementById("autoDestination"),
  autoPickupTime: document.getElementById("autoPickupTime"),
  autoDropTime: document.getElementById("autoDropTime"),
  autoAdditionalInfo: document.getElementById("autoAdditionalInfo"),
  btnAutoCall: document.getElementById("btnAutoCall"),

  // Add Service Modal
  addServiceModal: document.getElementById("addServiceModal"),
  closeAddServiceModalBtn: document.getElementById("closeAddServiceModalBtn"),
  tabAddCar: document.getElementById("tabAddCar"),
  tabAddAuto: document.getElementById("tabAddAuto"),
  newCarForm: document.getElementById("newCarForm"),
  newAutoForm: document.getElementById("newAutoForm"),
  newCarLocation: document.getElementById("newCarLocation"),
  newAutoLocation: document.getElementById("newAutoLocation"),

  // Feedback
  feedbackToggleBtn: document.getElementById("feedbackToggleBtn"),
  feedbackForm: document.getElementById("feedbackForm"),
  feedbackInput: document.getElementById("feedbackInput"),

  // Toast
  toast: document.getElementById("toast")
};

/* ==========================================================================
   5. UTILITY & GPS HELPERS
   ========================================================================== */

function showToast(msg, duration = 4000) {
  dom.toast.textContent = msg;
  dom.toast.classList.add("show");
  setTimeout(() => {
    dom.toast.classList.remove("show");
  }, duration);
}

function formatReadableDateTime(isoString) {
  if (!isoString) return "N/A";
  const dateObj = new Date(isoString);
  if (isNaN(dateObj.getTime())) return isoString;

  const options = { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true };
  return dateObj.toLocaleDateString("en-IN", options);
}

function calculateDuration(startStr, endStr) {
  if (!startStr || !endStr) return null;
  const start = new Date(startStr);
  const end = new Date(endStr);
  const diffMs = end - start;

  if (isNaN(diffMs) || diffMs <= 0) return null;

  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;

  let res = "";
  if (days > 0) res += `${days} Day${days > 1 ? "s" : ""}`;
  if (hours > 0) {
    if (res) res += " ";
    res += `${hours} Hour${hours > 1 ? "s" : ""}`;
  }
  return res || "Less than an hour";
}

/**
 * GPS Geolocation fetcher with reverse lookup & closest hub calculation
 */
function fetchCurrentGPSLocation(targetInputElement) {
  if (!navigator.geolocation) {
    showToast("GPS is not supported by your browser/device.");
    return;
  }

  showToast("Fetching your GPS coordinates...");
  targetInputElement.placeholder = "Detecting GPS location...";

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Approximate coordinates for hubs
      const coords = {
        bhupalpally: { lat: 18.43, lon: 79.86, name: "Bhupalpally" },
        warangal: { lat: 17.97, lon: 79.60, name: "Warangal" },
        Kataram: { lat: 18.25, lon: 79.75, name: "Kataram" }
      };

      // Find closest city
      let closestCity = "Bhupalpally";
      let minDistance = Infinity;

      for (const [key, hub] of Object.entries(coords)) {
        const dist = Math.hypot(lat - hub.lat, lon - hub.lon);
        if (dist < minDistance) {
          minDistance = dist;
          closestCity = hub.name;
        }
      }

      // Try free reverse geocoding via OpenStreetMap Nominatim
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        if (response.ok) {
          const data = await response.json();
          const address = data.address || {};
          const locality = address.suburb || address.neighbourhood || address.village || address.road || address.town || closestCity;
          const locationName = `${locality}, ${closestCity}`;
          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
          targetInputElement.value = `${locationName} - Google Maps: ${mapsUrl}`;
          showToast(`Location detected: ${locality}`);
          return;
        }
      } catch (e) {
        // Fallback to coordinates and closest hub
      }

      const locationName = `Near ${closestCity}`;
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
      targetInputElement.value = `${locationName} - Google Maps: ${mapsUrl}`;
      showToast(`GPS location set near ${closestCity}`);
    },
    (err) => {
      let errText = "Unable to retrieve GPS location.";
      if (err.code === 1) errText = "GPS permission denied. Please allow location access.";
      else if (err.code === 2) errText = "Location unavailable. Please check GPS connection.";
      showToast(errText);
      targetInputElement.placeholder = "Enter pickup location manually...";
    },
    { enableHighAccuracy: true, timeout: 8000 }
  );
}

/* ==========================================================================
   6. VIEW ROUTING & LOCATION CARD RENDERING
   ========================================================================== */

function renderHomeLocationCards() {
  dom.locationCardsContainer.innerHTML = locations
    .map((loc) => {
      let count = 0;
      if (loc.id === "all") {
        count = vehicles.length + autos.length;
      } else {
        const carCount = vehicles.filter((v) => v.location.toLowerCase() === loc.name.toLowerCase()).length;
        const autoCount = autos.filter((a) => a.location.toLowerCase() === loc.name.toLowerCase()).length;
        count = carCount + autoCount;
      }

      return `
      <div class="location-card" data-location="${loc.name}">
        <div>
          <div class="location-card-top">
            <span class="loc-live-tag"><i class="fa-solid fa-circle-check"></i> ${loc.id === 'all' ? 'All Coverage' : 'Active Hub'}</span>
            <span class="loc-counter">${count} Services</span>
          </div>
          <h4>${loc.name}</h4>
          <p class="loc-services-line">${loc.servicesLine}</p>
        </div>
        <button type="button" class="btn-loc-view">
          View Services →
        </button>
      </div>
    `;
    })
    .join("");

  dom.locationCardsContainer.querySelectorAll(".location-card").forEach((card) => {
    card.addEventListener("click", () => {
      const locName = card.getAttribute("data-location");
      navigateToCatalog(locName);
    });
  });
}

function populateLocationDropdowns() {
  // Populate catalog location dropdown
  dom.locationSelectorDropdown.innerHTML = locations
    .map((loc) => `<option value="${loc.name}" ${loc.name === state.activeLocation ? "selected" : ""}>${loc.name}</option>`)
    .join("");

  // Populate Add Service dropdowns (excluding 'All Locations')
  const specificCities = locations.filter((l) => l.id !== "all");
  const optionsHTML = specificCities.map((l) => `<option value="${l.name}">${l.name}</option>`).join("");
  dom.newCarLocation.innerHTML = optionsHTML;
  dom.newAutoLocation.innerHTML = optionsHTML;
}

function navigateToHome() {
  dom.catalogView.classList.remove("active");
  dom.homeView.classList.add("active");
  dom.navLinks.classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function navigateToCatalog(locationName) {
  if (locationName) {
    state.activeLocation = locationName;
    dom.locationSelectorDropdown.value = locationName;
  }
  dom.homeView.classList.remove("active");
  dom.catalogView.classList.add("active");
  dom.navLinks.classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
  renderCatalog();
}

/* ==========================================================================
   7. CATALOG RENDERING & AREA/GADDIGANIPALLY SEARCH ENGINE
   ========================================================================== */

function renderCatalog() {
  const isAutoMode = state.selectedServiceFilter === "auto";

  // Toggle Car Filter Matrix Visibility
  dom.carFilterControls.style.display = isAutoMode ? "none" : "flex";

  if (isAutoMode) {
    dom.carServicesGrid.style.display = "none";
    dom.autoServicesGrid.style.display = "grid";
    renderAutoCatalog();
  } else {
    dom.autoServicesGrid.style.display = "none";
    dom.carServicesGrid.style.display = "grid";
    renderCarCatalog();
  }
}

function getFilteredCars() {
  return vehicles.filter((car) => {
    // 1. Location match: If "All Locations" is selected, match all
    const matchesLoc =
      state.activeLocation === "All Locations" ||
      car.location.toLowerCase() === state.activeLocation.toLowerCase();

    // 2. Service type filter
    const matchesService =
      state.selectedServiceFilter === "all" ||
      car.services.includes(state.selectedServiceFilter);

    // 3. Fuel type filter
    const matchesFuel =
      state.fuelFilter === "all" ||
      car.fuel.toLowerCase() === state.fuelFilter.toLowerCase();

    // 4. Transmission filter
    const matchesTrans =
      state.transmissionFilter === "all" ||
      car.transmission.toLowerCase() === state.transmissionFilter.toLowerCase();

    // 5. Seater filter
    let matchesSeater = true;
    if (state.seaterFilter === "5") {
      matchesSeater = car.seater === 5;
    } else if (state.seaterFilter === "7") {
      matchesSeater = car.seater === 7;
    } else if (state.seaterFilter === "more") {
      matchesSeater = car.seater > 7;
    }

    // 6. Global Search - searches car name, area (e.g., Gaddiganipally), model, owner, fuel, etc.
    const q = state.searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      car.name.toLowerCase().includes(q) ||
      car.model.toLowerCase().includes(q) ||
      (car.area && car.area.toLowerCase().includes(q)) ||
      car.ownerName.toLowerCase().includes(q) ||
      car.rcNumber.toLowerCase().includes(q) ||
      car.fuel.toLowerCase().includes(q) ||
      car.transmission.toLowerCase().includes(q) ||
      car.location.toLowerCase().includes(q) ||
      car.services.some((s) => s.toLowerCase().includes(q));

    return matchesLoc && matchesService && matchesFuel && matchesTrans && matchesSeater && matchesSearch;
  });
}

function renderCarCatalog() {
  const carsList = getFilteredCars();
  dom.resultsCount.textContent = `${carsList.length} vehicle${carsList.length === 1 ? "" : "s"} found in ${state.activeLocation}`;

  if (carsList.length === 0) {
    dom.carServicesGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px 16px; background: #fff; border-radius: 12px; border: 1px dashed #cbd5e1;">
        <i class="fa-solid fa-car-side" style="font-size: 2.5rem; color: #94a3b8; margin-bottom: 10px;"></i>
        <h3 style="font-size: 1.1rem; margin-bottom: 4px;">No Vehicles Matching Criteria</h3>
        <p style="color: #64748b; font-size: 0.9rem;">Try selecting "All Locations" or clear your area/filter keywords.</p>
      </div>
    `;
    return;
  }

  dom.carServicesGrid.innerHTML = carsList
    .map((car) => {
      const badgesHTML = `
        <span class="badge-tag">${car.fuel}</span>
        <span class="badge-tag">${car.transmission}</span>
        <span class="badge-tag">${car.seater} Seater</span>
        ${car.services.map((s) => `<span class="badge-tag badge-service ${s === 'self-drive' ? 'badge-self-drive' : ''}">${s.replace('-', ' ').toUpperCase()}</span>`).join("")}
      `;

      return `
      <article class="car-card" data-car-id="${car.id}">
        <div class="car-img-wrap">
          <span class="car-badge-loc"><i class="fa-solid fa-location-dot"></i> ${car.location}</span>
          <img src="${car.image}" alt="${car.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=700&q=80'" />
        </div>
        <div class="car-card-body">
          <div class="car-title-wrap">
            <h4 class="car-name-text">${car.name}</h4>
            <p class="car-model-text">${car.model}</p>
          </div>

          <!-- Owner Area Indicator (e.g. Gaddiganipally) -->
          <div class="car-owner-area">
            <i class="fa-solid fa-map-pin"></i> Area: ${car.area || car.location}
          </div>

          <div class="badges-row">
            ${badgesHTML}
          </div>

          <div class="owner-meta-row">
            <i class="fa-solid fa-user-shield"></i> Owner: ${car.ownerName}
          </div>

          <div class="car-card-footer">
            <div class="car-price-tag">${car.price || "Available on Call"}</div>
            <button type="button" class="btn-book-now">Book Now</button>
          </div>
        </div>
      </article>
    `;
    })
    .join("");

  dom.carServicesGrid.querySelectorAll(".btn-book-now").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".car-card");
      const carId = parseInt(card.getAttribute("data-car-id"), 10);
      openCarBookingModal(carId);
    });
  });
}

function renderAutoCatalog() {
  const q = state.searchQuery.trim().toLowerCase();
  const filteredAutos = autos.filter((auto) => {
    const matchesLoc =
      state.activeLocation === "All Locations" ||
      auto.location.toLowerCase() === state.activeLocation.toLowerCase();

    const matchesSearch =
      !q ||
      auto.driverName.toLowerCase().includes(q) ||
      auto.rcNumber.toLowerCase().includes(q) ||
      (auto.area && auto.area.toLowerCase().includes(q)) ||
      auto.location.toLowerCase().includes(q);

    return matchesLoc && matchesSearch;
  });

  dom.resultsCount.textContent = `${filteredAutos.length} auto service${filteredAutos.length === 1 ? "" : "s"} found in ${state.activeLocation}`;

  if (filteredAutos.length === 0) {
    dom.autoServicesGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px 16px; background: #fff; border-radius: 12px; border: 1px dashed #cbd5e1;">
        <i class="fa-solid fa-taxi" style="font-size: 2.5rem; color: #94a3b8; margin-bottom: 10px;"></i>
        <h3 style="font-size: 1.1rem; margin-bottom: 4px;">No Auto Services Found</h3>
        <p style="color: #64748b; font-size: 0.9rem;">Try searching "Gaddiganipally" or selecting "All Locations".</p>
      </div>
    `;
    return;
  }

  dom.autoServicesGrid.innerHTML = filteredAutos
    .map((auto) => {
      return `
      <article class="auto-card" data-auto-id="${auto.id}">
        <div class="auto-card-header">
          <div class="auto-service-title">
            <div class="auto-badge-icon-sm"><i class="fa-solid fa-taxi"></i></div>
            <span>Auto Service</span>
          </div>
          <span class="badge-tag badge-auto"><i class="fa-solid fa-location-dot"></i> ${auto.location}</span>
        </div>

        <div class="auto-meta-grid">
          <div class="auto-meta-item">
            <span class="lbl">Driver Name</span>
            <span class="val">${auto.driverName}</span>
          </div>
          <div class="auto-meta-item">
            <span class="lbl">RC Number</span>
            <span class="val">${auto.rcNumber}</span>
          </div>
          <div class="auto-meta-item full-width">
            <span class="lbl">Stand / Locality</span>
            <span class="val">${auto.area || auto.location}</span>
          </div>
        </div>

        <button type="button" class="btn-send-auto-request">
          Send Request <i class="fa-solid fa-arrow-right"></i>
        </button>
      </article>
    `;
    })
    .join("");

  dom.autoServicesGrid.querySelectorAll(".btn-send-auto-request").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".auto-card");
      const autoId = parseInt(card.getAttribute("data-auto-id"), 10);
      openAutoBookingModal(autoId);
    });
  });
}

/* ==========================================================================
   8. CAR BOOKING MODAL & DURATION CALCULATION
   ========================================================================== */

function openCarBookingModal(carId) {
  const car = vehicles.find((v) => v.id === carId);
  if (!car) return;

  state.selectedCar = car;

  dom.modalCarImg.src = car.image;
  dom.modalCarTitle.textContent = car.name;
  dom.modalCarModel.textContent = car.model;

  dom.modalBadges.innerHTML = `
    <span class="badge-tag">${car.fuel}</span>
    <span class="badge-tag">${car.transmission}</span>
    <span class="badge-tag">${car.seater} Seater</span>
    <span class="badge-tag badge-service">${car.location}</span>
  `;

  dom.modalSpecFuel.textContent = car.fuel;
  dom.modalSpecTrans.textContent = car.transmission;
  dom.modalSpecSeater.textContent = `${car.seater} Seater`;
  dom.modalSpecOwner.textContent = car.ownerName;
  dom.modalSpecRC.textContent = car.rcNumber;
  dom.modalSpecLocation.textContent = `${car.location} (${car.area || 'Main Area'})`;

  dom.custServiceType.innerHTML = car.services
    .map((s) => {
      let label = "Self Drive";
      if (s === "rental") label = "Rental";
      if (s === "travel") label = "Travel";
      return `<option value="${label}">${label}</option>`;
    })
    .join("");

  const hasTravelOnly = car.services.length === 1 && car.services[0] === "travel";
  dom.callButtonText.textContent = hasTravelOnly ? "Call Driver" : "Call Owner";
  dom.btnCarCall.href = `tel:+${car.phone}`;

  dom.carBookingForm.reset();
  dom.custPickupLocation.value = "";
  dom.durationDisplayCard.style.display = "none";
  dom.customDistanceGroup.style.display = "none";
  clearFormErrors();

  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const nowISO = now.toISOString().slice(0, 16);
  dom.bookingDateTime.min = nowISO;
  dom.handoverDateTime.min = nowISO;

  dom.carModal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function updateDurationCard() {
  const start = dom.bookingDateTime.value;
  const end = dom.handoverDateTime.value;

  if (start && end) {
    const dur = calculateDuration(start, end);
    if (dur) {
      dom.durationCalcText.textContent = `Required Duration: ${dur}`;
      dom.durationDisplayCard.style.display = "block";
      return;
    }
  }
  dom.durationDisplayCard.style.display = "none";
}

function handleCarBookingSubmit(e) {
  e.preventDefault();
  clearFormErrors();

  const car = state.selectedCar;
  if (!car) return;

  const name = dom.custName.value.trim();
  const mobile = dom.custMobile.value.trim();
  const serviceType = dom.custServiceType.value;
  const bookingTime = dom.bookingDateTime.value;
  const handoverTime = dom.handoverDateTime.value;
  const pickupLoc = dom.custPickupLocation.value.trim() || "Customer Location";
  const destination = dom.custDestination.value.trim();
  const notes = dom.custAdditionalInfo.value.trim();

  let distance = dom.distanceRequirement.value;
  if (distance === "Other") {
    const customDist = dom.customDistanceInput.value.trim();
    distance = customDist ? `${customDist} KM` : "Custom (Not Specified)";
  }

  let hasError = false;
  if (!name) {
    document.getElementById("errCustName").classList.add("visible");
    hasError = true;
  }

  const mobilePattern = /^[6-9]\d{9}$/;
  if (!mobile || !mobilePattern.test(mobile)) {
    document.getElementById("errCustMobile").classList.add("visible");
    hasError = true;
  }

  if (!bookingTime || !handoverTime) {
    document.getElementById("errCarDates").classList.add("visible");
    hasError = true;
  } else {
    const bDate = new Date(bookingTime);
    const hDate = new Date(handoverTime);
    if (hDate <= bDate) {
      document.getElementById("errCarDates").textContent = "Handover time must be after booking time.";
      document.getElementById("errCarDates").classList.add("visible");
      hasError = true;
    }
  }

  if (!destination) {
    document.getElementById("errCustDestination").classList.add("visible");
    hasError = true;
  }

  if (hasError) return;

  const durationStr = calculateDuration(bookingTime, handoverTime) || "N/A";
  const formattedBooking = formatReadableDateTime(bookingTime);
  const formattedHandover = formatReadableDateTime(handoverTime);

  const messageText = 
`Hello, I would like to book your vehicle/service.

Venkatinsights BOOKING REQUEST

LOCATION & AREA
City: ${car.location}
Area: ${car.area || car.location}

VEHICLE DETAILS
Car: ${car.name}
Model: ${car.model}
Fuel: ${car.fuel}
Transmission: ${car.transmission}
Seater: ${car.seater} Seater
RC Number: ${car.rcNumber}

OWNER
Owner Name: ${car.ownerName}

SERVICE
Type: ${serviceType}

CUSTOMER DETAILS
Name: ${name}
Mobile: ${mobile}
Pickup Location: ${pickupLoc}

BOOKING DETAILS
Booking Date & Time: ${formattedBooking}
Handover Date & Time: ${formattedHandover}
Required Duration: ${durationStr}
Distance Requirement: ${distance}
Destination: ${destination}
Additional Information: ${notes || "None"}

Please contact me regarding availability, pricing and booking details. Thank you.

${WHATSAPP_BRANDING_FOOTER}`;

  const ownerWhatsapp = car.whatsapp;
  const encodedMsg = encodeURIComponent(messageText);
  const whatsappURL = `https://wa.me/${ownerWhatsapp}?text=${encodedMsg}`;

  showToast("Preparing request... Opening WhatsApp to connect directly with the owner.");
  setTimeout(() => {
    window.open(whatsappURL, "_blank");
  }, 400);
}

/* ==========================================================================
   9. AUTO BOOKING MODAL & DISPATCH
   ========================================================================== */

function openAutoBookingModal(autoId) {
  const auto = autos.find((a) => a.id === autoId);
  if (!auto) return;

  state.selectedAuto = auto;

  dom.autoSpecDriver.textContent = auto.driverName;
  dom.autoSpecRC.textContent = auto.rcNumber;
  dom.autoSpecLocation.textContent = `${auto.location} (${auto.area || 'Auto Stand'})`;
  dom.btnAutoCall.href = `tel:+${auto.phone}`;

  dom.autoBookingForm.reset();
  dom.autoPickupLocation.value = "";
  clearFormErrors();

  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  dom.autoPickupTime.min = now.toISOString().slice(0, 16);

  dom.autoModal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function handleAutoBookingSubmit(e) {
  e.preventDefault();
  clearFormErrors();

  const auto = state.selectedAuto;
  if (!auto) return;

  const custName = dom.autoCustName.value.trim();
  const custMobile = dom.autoCustMobile.value.trim();
  const pickupLoc = dom.autoPickupLocation.value.trim() || "Detected / Local Stand";
  const destination = dom.autoDestination.value.trim();
  const pickupTime = dom.autoPickupTime.value;
  const dropTime = dom.autoDropTime.value;
  const notes = dom.autoAdditionalInfo.value.trim();

  let hasError = false;
  if (!custName) {
    document.getElementById("errAutoName").classList.add("visible");
    hasError = true;
  }

  const mobilePattern = /^[6-9]\d{9}$/;
  if (!custMobile || !mobilePattern.test(custMobile)) {
    document.getElementById("errAutoMobile").classList.add("visible");
    hasError = true;
  }

  if (!destination) {
    document.getElementById("errAutoDestination").classList.add("visible");
    hasError = true;
  }

  if (!pickupTime) {
    document.getElementById("errAutoPickup").classList.add("visible");
    hasError = true;
  }

  if (hasError) return;

  const formattedPickup = formatReadableDateTime(pickupTime);
  const formattedDrop = dropTime ? formatReadableDateTime(dropTime) : "Flexible / Local";

  const messageText = 
`Hello, I would like to request an auto service.

Venkatinsights AUTO SERVICE REQUEST

DRIVER & STAND
Driver Name: ${auto.driverName}
RC Number: ${auto.rcNumber}
Location: ${auto.location} (${auto.area || 'Main Stand'})

CUSTOMER DETAILS
Customer Name: ${custName}
Mobile Number: ${custMobile}
Pickup Location: ${pickupLoc}
Destination: ${destination}

TIMINGS
Pickup: ${formattedPickup}
Drop: ${formattedDrop}
Additional Information: ${notes || "None"}

Please contact me regarding availability and fare. Thank you.

${WHATSAPP_BRANDING_FOOTER}`;

  const driverWhatsapp = auto.whatsapp;
  const encodedMsg = encodeURIComponent(messageText);
  const whatsappURL = `https://wa.me/${driverWhatsapp}?text=${encodedMsg}`;

  showToast("Preparing auto request... Redirecting to driver WhatsApp.");
  setTimeout(() => {
    window.open(whatsappURL, "_blank");
  }, 400);
}

/* ==========================================================================
   10. ADD NEW SERVICE (WITH AREA & LOCALITY CAPTURE)
   ========================================================================== */

function handleAddCarSubmit(e) {
  e.preventDefault();

  const owner = document.getElementById("newCarOwner").value.trim();
  const mobile = document.getElementById("newCarMobile").value.trim();
  const whatsapp = document.getElementById("newCarWhatsapp").value.trim();
  const loc = dom.newCarLocation.value;
  const area = document.getElementById("newCarArea").value.trim() || "Local";
  const name = document.getElementById("newCarName").value.trim();
  const model = document.getElementById("newCarModel").value.trim();
  const rc = document.getElementById("newCarRC").value.trim();
  const price = document.getElementById("newCarPrice").value.trim();
  const fuel = document.getElementById("newCarFuel").value;
  const trans = document.getElementById("newCarTransmission").value;
  const seater = parseInt(document.getElementById("newCarSeater").value, 10);
  const img = document.getElementById("newCarImg").value.trim();

  const checkedServices = Array.from(document.querySelectorAll("input[name='newCarServices']:checked")).map((cb) => cb.value);

  if (checkedServices.length === 0) {
    alert("Please select at least one service type.");
    return;
  }

  const newVehicle = {
    id: Date.now(),
    location: loc,
    area: area,
    type: "car",
    name: name,
    model: model,
    fuel: fuel,
    transmission: trans,
    seater: seater,
    rcNumber: rc,
    ownerName: owner,
    phone: `91${mobile.replace(/\D/g, "")}`,
    whatsapp: `91${whatsapp.replace(/\D/g, "")}`,
    price: price || "Available on Call",
    services: checkedServices,
    image: img || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=700&q=80"
  };

  vehicles.unshift(newVehicle);
  dom.newCarForm.reset();
  closeAllModals();
  renderCatalog();
  showToast(`Vehicle in ${area}, ${loc} listed successfully!`);
}

function handleAddAutoSubmit(e) {
  e.preventDefault();

  const driver = document.getElementById("newAutoDriver").value.trim();
  const mobile = document.getElementById("newAutoMobile").value.trim();
  const whatsapp = document.getElementById("newAutoWhatsapp").value.trim();
  const rc = document.getElementById("newAutoRC").value.trim();
  const loc = dom.newAutoLocation.value;
  const area = document.getElementById("newAutoArea").value.trim() || "Main Stand";

  const newAuto = {
    id: Date.now(),
    location: loc,
    area: area,
    type: "auto",
    driverName: driver,
    rcNumber: rc,
    phone: `91${mobile.replace(/\D/g, "")}`,
    whatsapp: `91${whatsapp.replace(/\D/g, "")}`
  };

  autos.unshift(newAuto);
  dom.newAutoForm.reset();
  closeAllModals();
  renderCatalog();
  showToast(`Auto driver listed in ${area}, ${loc}!`);
}

/* ==========================================================================
   11. MODAL HELPERS & CLOSERS
   ========================================================================== */

function closeAllModals() {
  dom.carModal.classList.remove("open");
  dom.autoModal.classList.remove("open");
  dom.addServiceModal.classList.remove("open");
  document.body.style.overflow = "";
}

function clearFormErrors() {
  document.querySelectorAll(".field-error").forEach((el) => el.classList.remove("visible"));
}

/* ==========================================================================
   12. EVENT LISTENERS INITIALIZATION
   ========================================================================== */

function setupEventListeners() {
  // Mobile Hamburger Toggle
  dom.hamburgerBtn.addEventListener("click", () => {
    dom.navLinks.classList.toggle("open");
  });

  // Navigation Links
  dom.navBrand.addEventListener("click", navigateToHome);
  dom.navHomeBtn.addEventListener("click", navigateToHome);
  dom.navBackBtn.addEventListener("click", () => {
    if (dom.catalogView.classList.contains("active")) {
      navigateToHome();
    } else {
      window.history.back();
    }
  });
  dom.catalogBackBtn.addEventListener("click", navigateToHome);

  // Footer Navigation
  document.getElementById("ftLinkHome").addEventListener("click", (e) => { e.preventDefault(); navigateToHome(); });
  document.getElementById("ftLinkServices").addEventListener("click", (e) => { e.preventDefault(); navigateToCatalog(); });
  document.getElementById("ftLinkLocations").addEventListener("click", (e) => { e.preventDefault(); navigateToHome(); });
  document.getElementById("ftLinkAddService").addEventListener("click", (e) => {
    e.preventDefault();
    dom.addServiceModal.classList.add("open");
    document.body.style.overflow = "hidden";
  });

  // Location Selector Dropdown Change in Catalog View
  dom.locationSelectorDropdown.addEventListener("change", (e) => {
    state.activeLocation = e.target.value;
    renderCatalog();
  });

  // Global Search Input with instant matching
  dom.globalSearchInput.addEventListener("input", (e) => {
    const val = e.target.value;
    state.searchQuery = val;
    dom.clearSearchBtn.style.display = val ? "inline-block" : "none";

    if (dom.homeView.classList.contains("active") && val.trim() !== "") {
      navigateToCatalog();
    } else {
      renderCatalog();
    }
  });

  dom.clearSearchBtn.addEventListener("click", () => {
    state.searchQuery = "";
    dom.globalSearchInput.value = "";
    dom.clearSearchBtn.style.display = "none";
    renderCatalog();
  });

  // GPS Location Detection Buttons
  dom.btnDetectCarLocation.addEventListener("click", () => {
    fetchCurrentGPSLocation(dom.custPickupLocation);
  });

  dom.btnDetectAutoLocation.addEventListener("click", () => {
    fetchCurrentGPSLocation(dom.autoPickupLocation);
  });

  // Main Service Filter Pills (All, Self Drive, Rental, Travel, Auto)
  dom.mainServiceFilters.querySelectorAll(".filter-pill").forEach((pill) => {
    pill.addEventListener("click", (e) => {
      dom.mainServiceFilters.querySelectorAll(".filter-pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      state.selectedServiceFilter = pill.getAttribute("data-service");
      renderCatalog();
    });
  });

  // Secondary Filters
  dom.fuelFilterGroup.querySelectorAll(".btn-filter-tag").forEach((btn) => {
    btn.addEventListener("click", () => {
      dom.fuelFilterGroup.querySelectorAll(".btn-filter-tag").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.fuelFilter = btn.getAttribute("data-fuel");
      renderCarCatalog();
    });
  });

  dom.transmissionFilterGroup.querySelectorAll(".btn-filter-tag").forEach((btn) => {
    btn.addEventListener("click", () => {
      dom.transmissionFilterGroup.querySelectorAll(".btn-filter-tag").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.transmissionFilter = btn.getAttribute("data-trans");
      renderCarCatalog();
    });
  });

  dom.seaterFilterGroup.querySelectorAll(".btn-filter-tag").forEach((btn) => {
    btn.addEventListener("click", () => {
      dom.seaterFilterGroup.querySelectorAll(".btn-filter-tag").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.seaterFilter = btn.getAttribute("data-seater");
      renderCarCatalog();
    });
  });

  dom.resetFiltersBtn.addEventListener("click", () => {
    state.fuelFilter = "all";
    state.transmissionFilter = "all";
    state.seaterFilter = "all";

    dom.fuelFilterGroup.querySelectorAll(".btn-filter-tag").forEach((b) => b.classList.toggle("active", b.getAttribute("data-fuel") === "all"));
    dom.transmissionFilterGroup.querySelectorAll(".btn-filter-tag").forEach((b) => b.classList.toggle("active", b.getAttribute("data-trans") === "all"));
    dom.seaterFilterGroup.querySelectorAll(".btn-filter-tag").forEach((b) => b.classList.toggle("active", b.getAttribute("data-seater") === "all"));

    renderCarCatalog();
  });

  // Duration recalculation hooks
  dom.bookingDateTime.addEventListener("change", updateDurationCard);
  dom.handoverDateTime.addEventListener("change", updateDurationCard);

  // Distance dropdown toggle
  dom.distanceRequirement.addEventListener("change", (e) => {
    dom.customDistanceGroup.style.display = e.target.value === "Other" ? "flex" : "none";
  });

  // Form Submissions
  dom.carBookingForm.addEventListener("submit", handleCarBookingSubmit);
  dom.autoBookingForm.addEventListener("submit", handleAutoBookingSubmit);

  // Add Service Modal Controls
  dom.navAddServiceBtn.addEventListener("click", () => {
    dom.navLinks.classList.remove("open");
    dom.addServiceModal.classList.add("open");
    document.body.style.overflow = "hidden";
  });

  dom.tabAddCar.addEventListener("click", () => {
    dom.tabAddCar.classList.add("active");
    dom.tabAddAuto.classList.remove("active");
    dom.newCarForm.style.display = "flex";
    dom.newAutoForm.style.display = "none";
  });

  dom.tabAddAuto.addEventListener("click", () => {
    dom.tabAddAuto.classList.add("active");
    dom.tabAddCar.classList.remove("active");
    dom.newAutoForm.style.display = "flex";
    dom.newCarForm.style.display = "none";
  });

  dom.newCarForm.addEventListener("submit", handleAddCarSubmit);
  dom.newAutoForm.addEventListener("submit", handleAddAutoSubmit);

  // Feedback button and WhatsApp submission
  dom.feedbackToggleBtn.addEventListener("click", () => {
    const isOpening = dom.feedbackForm.hidden;
    dom.feedbackForm.hidden = !isOpening;
    dom.feedbackToggleBtn.setAttribute("aria-expanded", String(isOpening));
    if (isOpening) dom.feedbackInput.focus();
  });

  dom.feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const feedback = dom.feedbackInput.value.trim();
    if (!feedback) return;

    const message = `Hello, I would like to share feedback about Venkatinsights:\n\n${feedback}`;
    const whatsappURL = `https://wa.me/919177086943?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
    dom.feedbackInput.value = "";
    showToast("Opening WhatsApp for your feedback...");
  });

  // Modal Closers
  dom.closeCarModalBtn.addEventListener("click", closeAllModals);
  dom.closeAutoModalBtn.addEventListener("click", closeAllModals);
  dom.closeAddServiceModalBtn.addEventListener("click", closeAllModals);

  window.addEventListener("click", (e) => {
    if (e.target === dom.carModal || e.target === dom.autoModal || e.target === dom.addServiceModal) {
      closeAllModals();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllModals();
  });
}

/* ==========================================================================
   13. APPLICATION BOOTSTRAP
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderHomeLocationCards();
  populateLocationDropdowns();
  setupEventListeners();
});