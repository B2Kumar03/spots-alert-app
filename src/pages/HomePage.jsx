import useGeolocation from "../hooks/useGeolocation";
import { FaMapMarkedAlt } from "react-icons/fa";

function HomePage() {
  const { location, error } = useGeolocation();

  return (
    <div className="p-6 text-center space-y-4">
      <h1 className="text-3xl font-bold text-blue-900 flex justify-center items-center gap-2">
        <FaMapMarkedAlt className="text-green-600" /> Welcome to <span className="underline md:text-2xl text-xl">Spots Alert</span>
      </h1>

      {location ? (
        <p className="text-lg text-gray-700">
          📍 Your Location: <span className="font-semibold">{location.lat.toFixed(4)}, {location.lon.toFixed(4)}</span>
        </p>
      ) : (
        <p className="text-gray-500 animate-pulse">{error || "Getting location..."}</p>
      )}
    </div>
  );
}

export default HomePage;
