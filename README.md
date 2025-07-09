#  Spots Alert

 [**Live Demo**](https://spots-alert.netlify.app/)

A **React-based web app** that helps users discover **nearby adventure spots** such as parks, playgrounds, water parks, cliffs, and hiking trails using their **live geolocation**.

---

##  Features

-  Detects user's live **geolocation**
-  Fetches and displays **nearby adventure spots** via **Geoapify Places API**
-  Displays current **network connection status**
- Interactive map view with **Leaflet**
- Live **route preview** drawn on canvas
- Launch **Google Maps directions** with one click
- Fully **mobile-responsive** and interactive UI
- Uses browser **Notification API** to alert user when starting navigation

---

## APIs Used (5)

| API Name                      | Description                                                        |
|-------------------------------|--------------------------------------------------------------------|
| **Geoapify Places API**     | Fetches nearby places based on category & geolocation              |
| **Geolocation API**         | Gets the user's current coordinates                                |
| **Notification API**        | Sends a browser notification when navigation starts                |
| **Network Information API** | Detects the user’s current connection type (e.g., 4g, wifi)         |
| **Google Maps Directions**  | Opens Google Maps for turn-by-turn directions from user to spot     |

---

## Tech Stack

- **React.js**
- **Tailwind CSS** – For clean, responsive UI
- **Leaflet** – Map integration and route display
- **Geoapify Places API** – Location search
- **Browser APIs**:
  - `Geolocation`
  - `Notification`
  - `Network Information`

---

## Screenshots

### Nearby Places View
![Nearby Places](https://github.com/B2Kumar03/project_Image/blob/main/Screenshot%202025-07-09%20150946.png?raw=true)

### Place Details with Info + Navigation
![Place Details](https://github.com/B2Kumar03/project_Image/blob/main/Screenshot%202025-07-09%20150959.png?raw=true)

### Interactive Map with Route
![Map View](https://github.com/B2Kumar03/project_Image/blob/main/Screenshot%202025-07-09%20151012.png?raw=true)

---

## Folder Highlights

- `/pages/NearbyPlaces.jsx` – Fetches and renders nearby spots
- `/pages/PlaceDetails.jsx` – Shows details and map with navigation
- `/hooks/useGeolocation.js` – Custom hook for getting user location

---

