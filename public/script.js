// Define start and end coordinates
const start = [28.7041, 77.1025]; // Example Start: Delhi
const end = [28.4595, 77.0266];   // Example End: Gurgaon

// Function to fetch route data from the backend
async function fetchRoute(start, end) {
  try {
    const response = await fetch("/api/route/planner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: `${start[1]},${start[0]}`, // longitude, latitude
        end: `${end[1]},${end[0]}`,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      plotRoute(data.route.coordinates);
    } else {
      console.error("Error fetching route:", data.message);
      alert("Error fetching route!");
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

// Initialize the map
const map = L.map("map").setView(start, 12);

// Add OSM tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Function to plot the route
function plotRoute(coordinates) {
  const routeLine = L.polyline(coordinates.map(coord => [coord[1], coord[0]]), {
    color: "blue",
  }).addTo(map);
  map.fitBounds(routeLine.getBounds());
}

// Fetch and display the route
fetchRoute(start, end);
