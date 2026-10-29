'use client'
import React from 'react'
import {MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const CENTER = [50.5, 30.5]
function Map () {
  return (
    <div>
      <MapContainer
        center={CENTER}
        zoom={13}
        style={{ height: "300px", width: "800px" }}
      >
        <Marker position={CENTER}>
            <Popup>Order For Alemu</Popup>
        </Marker>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
}

export default Map