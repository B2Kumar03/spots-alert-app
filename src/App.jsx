import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import NearbyPlaces from "./pages/NearbyPlaces";
import PlaceDetails from "./pages/PlaceDetails";

function App() {
  return (
    <>
      <Navbar />
      <HomePage />
      
      
        <Routes>
          <Route path="/" element={<NearbyPlaces />} />
          <Route path="/place/:id" element={<PlaceDetails />} />
        </Routes>
      
    </>
  );
}

export default App;
