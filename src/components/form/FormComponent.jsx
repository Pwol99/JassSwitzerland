import React, {useEffect, useState} from 'react';
import "../../Styles.css";
import { HeaderComponent } from "../HeaderComponent";
import { FooterComponent } from "../FooterComponent";
import { MapContainer, TileLayer, useMap, Popup, Marker, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import cantonsGeoJSON from "./../../data/kantone.json";


export const FormComponent = (props) => {
 /* useEffect(() => {
    console.log("fetching...");
    const pfad = "./data/kantone.geojson";
    fetch(pfad)
     .then(res => res.json())
     .then(json => {
      // console.log(json);
      // const cantonsGeoJSON = json;
      // console.log(cantonsGeoJSON)
      setData(json)
     })
  }, [])

  console.log(cantonsGeoJSON);*/

  return (
    <>
      <HeaderComponent username={props.username} />
    <MapContainer center={[46, 7]} zoom={3} scrollWheelZoom={true} style={{ width: "100%", height: "500px" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a>, USGS, NOAA'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}"
      />
     <GeoJSON data={cantonsGeoJSON} />
    </MapContainer>

      <FooterComponent />
    </>
  );
};

export default FormComponent;