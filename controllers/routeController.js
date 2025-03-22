const axios = require("axios");

const getRoute = async (req, res) => {
  const { start, end } = req.body;

  try {
    // Split start and end coordinates
    const startCoords = start.split(",").map(Number);
    const endCoords = end.split(",").map(Number);

    // Get route from OSRM
    const response = await axios.get(
      `https://router.project-osrm.org/route/v1/driving/${startCoords[1]},${startCoords[0]};${endCoords[1]},${endCoords[0]}?overview=full&geometries=geojson`
    );

    if (response.data.routes.length === 0) {
      return res.status(404).json({ message: "No route found" });
    }

    // Convert route coordinates for Leaflet [lat, lng]
    const routeCoords = response.data.routes[0].geometry.coordinates.map(
      (coord) => [coord[1], coord[0]]
    );

    res.status(200).json({
      distance: response.data.routes[0].distance,
      duration: response.data.routes[0].duration,
      route: routeCoords,
    });
  } catch (error) {
    console.error("Error fetching route:", error.message);
    res.status(500).json({ message: "Error fetching route" });
  }
};

module.exports = { getRoute };
