import { useEffect, useState } from "react";
import useGeolocation from "../hooks/useGeolocation";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCompass } from "react-icons/fa";

function NearbyPlaces() {
  const { location, error } = useGeolocation();
  const [nearby, setNearby] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGeoapifySpots = async () => {
      const categories = [
        "entertainment.activity_park.climbing",
        "entertainment.theme_park",
        "entertainment.water_park",
        "leisure.playground",
        "camping.camp_site",
        "camping.summer_camp",
        "natural.mountain.peak",
        "natural.mountain.cliff"
      ].join(",");

      const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${location.lon},${location.lat},5000&bias=proximity:${location.lon},${location.lat}&limit=10&apiKey=aaee6e859eb24231824962b63410ece9`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        const spots = data.features.map((place) => ({
          id: place.properties.place_id,
          name: place.properties.name || place.properties.address_line1 || "Unnamed Place",
          lat: place.geometry.coordinates[1],
          lon: place.geometry.coordinates[0],
          category: place.properties.categories?.join(", "),
          distance: (place.properties.distance / 1000).toFixed(2), // km
        }));
        setNearby(spots);
      } catch (err) {
        console.error("Failed to fetch Geoapify places:", err);
      }
    };

    if (location) {
      fetchGeoapifySpots();
    }
  }, [location]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!location) return <p className="text-gray-600 animate-pulse">📍 Fetching your location...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2">
        <FaCompass /> Nearby Adventure Spots
      </h2>

      {nearby.length === 0 ? (
        <p className="text-gray-500">⏳ Loading nearby places...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearby.map((spot) => (
            <div
              key={spot.id}
              className="p-5 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200"
            >
              <h3 className="text-lg font-bold text-blue-700">{spot.name}</h3>

              <div className="flex flex-wrap gap-2 mt-1">
                {spot.category?.split(",").slice(0, 2).map((cat, i) => (
                  <span
                    key={i}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
                  >
                    {cat.trim()}
                  </span>
                ))}
              </div>

              <p className="mt-3 text-sm text-gray-600 flex items-center gap-1">
                <FaMapMarkerAlt className="text-red-500" />
                {spot.distance} km away
              </p>

              <button
                onClick={() =>
                  navigate(`/place/${spot.id}`, {
                    state: { spot },
                  })
                }
                className="mt-4 w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NearbyPlaces;
