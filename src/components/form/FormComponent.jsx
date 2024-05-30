import React, {useEffect, useState} from 'react';
import "../../Styles.css";
import { HeaderComponent } from "../HeaderComponent";
import { FooterComponent } from "../FooterComponent";
import { MapContainer, TileLayer, useMap, Popup, Marker, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import cantonsGeoJSON from "./../../data/kantone.json";


export const FormComponent = (props) => {
  return (
    <>
      <HeaderComponent username={props.username} />
      <div style={{ height: "calc(100vh - 135px)" }}>
        <MapContainer
          center={[46.8182, 8.2275]}
          zoom={8}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100%" }}
          minZoom={7}
          maxZoom={10}
          maxBounds={[[45.8182, 5.2275], [47.8182, 11.2275]]}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a>, USGS, NOAA'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}"
          />

          <GeoJSON data={cantonsGeoJSON} />
        </MapContainer>
      </div>
      <FooterComponent />
    </>
  );
};

export default FormComponent;