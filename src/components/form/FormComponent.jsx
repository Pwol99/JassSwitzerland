import React from 'react';
import ReactDOMServer from 'react-dom/server';
import "../../Styles.css";
import { HeaderComponent } from "../HeaderComponent";
import { FooterComponent } from "../FooterComponent";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import cantonsGeoJSON from "./../../data/kantone.json";
import { useNavigate } from "react-router-dom";

export const FormComponent = (props) => {
  const navigate = useNavigate();

  const handleMainPageNavigation = () => {
    console.log("Button clicked");
    navigate("/main");
  };

  const PopupContent = ({ feature }) => {
    const kanType = feature.properties.Jasskarten_typ;
    const language = kanType === 'ger' ? 'Deutsch' : 'Französisch';

    return (
      <div>
        <b>Kanton:</b> {feature.properties.NAME}<br/>
        <b>Jasskarten Typ:</b> {language}<br/>
        <button onClick={handleMainPageNavigation}>Zur Hauptseite</button>
      </div>
    );
  };

  const geoJsonStyle = {
    color: '#000000',
    weight: 1,
    fill: true, // Fill the area
    fillOpacity: 0.5, // Set fill opacity to make the area clickable
    fillColor: '#FFFFFF',
    interactive: true // Enable mouse events on the entire polygon area
  };

  return (
    <>
      <HeaderComponent playername={props.playername} />
      <div style={{ height: "calc(100vh - 135px)" }}>
        <MapContainer
          center={[46.8182, 8.2275]}
          zoom={8}
          scrollWheelZoom={false} // Disable scroll wheel zoom
          dragging={false} // Disable dragging
          touchZoom={false} // Disable touch zoom
          doubleClickZoom={false} // Disable double click zoom
          tap={false} // Disable tap
          style={{ width: "100%", height: "100%" }}
          minZoom={8}
          maxZoom={8}
          maxBounds={[[45.8182, 5.2275], [47.8182, 11.2275]]}
          zoomControl={false}
          preferCanvas={true} // Prefer canvas rendering
        >
          <TileLayer
            attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a>, USGS, NOAA'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}"
          />
          <GeoJSON
            data={cantonsGeoJSON}
            style={geoJsonStyle}
            onEachFeature={(feature, layer) => {
              if (feature.properties && feature.properties.NAME) {
                const popupContent = <PopupContent feature={feature} />;
                layer.bindPopup(ReactDOMServer.renderToString(popupContent)); // Bind popup to each feature
              }
            }}
          />
        </MapContainer>
      </div>
      <FooterComponent />
    </>
  );
};

export default FormComponent;
