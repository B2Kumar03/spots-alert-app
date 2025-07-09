import { useLocation, useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaMapMarkerAlt, FaNetworkWired, FaDirections } from "react-icons/fa";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


function CanvasOverlay({ from, to }) {
  const canvasRef = useRef(null);
  const map = useMap();

  useMapEvent("move", drawLine);
  useMapEvent("zoom", drawLine);

  useEffect(() => {
    drawLine();
  }, [from, to]);

  function drawLine() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !from || !to) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const fromPoint = map.latLngToContainerPoint(from);
    const toPoint = map.latLngToContainerPoint(to);

    ctx.beginPath();
    ctx.moveTo(fromPoint.x, fromPoint.y);
    ctx.lineTo(toPoint.x, toPoint.y);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  return (
    <canvas
      ref={canvasRef}
      width={map.getSize().x}
      height={map.getSize().y}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 500,
      }}
    />
  );
}

function PlaceDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const [networkType, setNetworkType] = useState("detecting...");
  const [redirect, setRedirect] = useState(false);

  if (!state?.spot) return <p className="text-red-600">No place selected.</p>;

  const { name, category, lat, lon, distance } = state.spot;

  useEffect(() => {
    const connection =
      navigator.connection || navigator.webkitConnection || navigator.mozConnection;

    if (connection) {
      setNetworkType(connection.effectiveType);
      const handleChange = () => setNetworkType(connection.effectiveType);
      connection.addEventListener("change", handleChange);
      return () => connection.removeEventListener("change", handleChange);
    } else {
      setNetworkType("unknown");
    }
  }, []);

  const handleStart = () => {
    setRedirect(true);
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        const userCoords = [userLat, userLon];
        setUserLocation(userCoords);

        if (Notification.permission === "granted") {
          new Notification("Your adventure is starting!", {
            body: `Heading to ${name}`,
            icon: "/location-icon.png",
          });
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              new Notification("Your adventure is starting!", {
                body: `Heading to ${name}`,
                icon: "/location-icon.png",
              });
            }
          });
        }

        const gmapsURL = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLon}&destination=${lat},${lon}`;
        setRedirect(false);
        window.open(gmapsURL, "_blank");
      },
      () => {
        alert("Unable to retrieve your location.");
        setRedirect(false);
      }
    );
  };

  return (
    <div className="p-4 mt-2 border-t border-gray-300">
      <div className="flex flex-col md:flex-row gap-6">
   
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-3xl font-extrabold text-blue-900 flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" />
            {name}
          </h2>

          <p className="text-gray-700">
            <strong>Category:</strong> {category}
          </p>
          <p className="text-gray-700">
            <strong>Distance:</strong> {distance} km
          </p>

          <p className="text-gray-700 flex items-center gap-2">
            <FaNetworkWired /> <strong>Network:</strong> {networkType}
          </p>

     
          <div className="space-x-4 mt-3">
            <button
              onClick={handleStart}
              className={`px-6 py-2 rounded shadow text-white font-medium transition ${
                redirect ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
              disabled={redirect}
            >
              {redirect ? "Redirecting..." : "Start Journey"}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-400 text-white rounded shadow hover:bg-gray-500"
            >
              Back
            </button>
          </div>
        </div>

  
        <div className="md:w-1/2 h-[300px] md:h-[400px] w-full relative rounded overflow-hidden shadow border">
          <MapContainer
            center={[lat, lon]}
            zoom={15}
            style={{ height: "100%", width: "100%", zIndex: 1 }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            <Marker position={[lat, lon]}>
              <Popup>{name}</Popup>
            </Marker>
            {userLocation && (
              <>
                <Marker position={userLocation}>
                  <Popup>You are here</Popup>
                </Marker>
                <CanvasOverlay from={userLocation} to={[lat, lon]} />
              </>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default PlaceDetails;
