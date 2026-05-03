import React from "react";

import {
  GoogleMap,
  LoadScript,
  Marker
} from "@react-google-maps/api";

export function DeliveryMap() {

  const containerStyle = {
    width: "100%",
    height: "400px"
  };

  // BANGALORE LOCATION
  const center = {
    lat: 12.9716,
    lng: 77.5946
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 mt-6">

      <h2 className="text-2xl font-bold text-orange-700 mb-4">
        Live Delivery Tracking 🗺️
      </h2>

      <LoadScript
        googleMapsApiKey="AIzaSyCzSFn7KMeKEZ40Xg-7qhfHBi2GEujLdKc"
      >

        <GoogleMap
          mapContainerStyle={
            containerStyle
          }
          center={center}
          zoom={10}
        >

          {/* MARKER */}
          <Marker
            position={center}
          />

        </GoogleMap>

      </LoadScript>

    </div>
  );
}