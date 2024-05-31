import React, { useState } from 'react';
import "../../Styles.css";
import { HeaderComponent } from "../HeaderComponent";
import { FooterComponent } from "../FooterComponent";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import cantonsGeoJSON from "./../../data/kantone.json";
import { useNavigate } from "react-router-dom";

const importImages = (name) => {
  try {
    return require(`../../data/Flag_of_Canton_of_${name}.png`);
  } catch (error) {
    return require(`../../data/default.png`);
  }
};

export const FormComponent = (props) => {
  const navigate = useNavigate();
  const [popupData, setPopupData] = useState(null);

  const handleMainPageNavigation = () => {
    console.log("Button clicked");
    navigate("/main");
    // Übergeben Sie jasskarten_typ an App.jsx
    if (popupData) {
      props.setJasskartentyp(popupData.Jasskarten_typ);
      console.log("jasskarten_typ:", popupData.Jasskarten_typ);
    }
  };

  const handleFeatureClick = (feature) => {
    setPopupData(feature.properties);
  };

  const PopupContent = () => {
    if (!popupData) return null;
    const kanType = popupData.Jasskarten_typ;
    const language = kanType === 'ger' ? 'Deutsch' : 'Französisch';
  
    return (
      <div className="popup-content">
        <div className="popup-text">
          <b>Kanton:</b> {popupData.NAME}<br/>
          <b>Jasskarten Typ:</b> {language}<br/>
          <button onClick={handleMainPageNavigation}>Zur Hauptseite</button>
        </div>
        <div className="popup-flag">
          <img src={importImages(popupData.NAME)} width="100" alt={popupData.NAME} />
        </div>
      </div>
    );
  };
  

  const geoJsonStyle = {
    color: '#000000',
    weight: 1,
    fill: true,
    fillOpacity: 0.5,
    fillColor: '#FFFFFF',
    interactive: true
  };

  return (
    <>
      <HeaderComponent playername={props.playername} />
      <div style={{ height: "calc(100vh - 135px)" }}>
        <MapContainer
          center={[46.8182, 8.2275]}
          zoom={8}
          scrollWheelZoom={false}
          dragging={false}
          touchZoom={false}
          doubleClickZoom={false}
          tap={false}
          style={{ width: "100%", height: "100%" }}
          minZoom={8}
          maxZoom={8}
          maxBounds={[[45.8182, 5.2275], [47.8182, 11.2275]]}
          zoomControl={false}
          preferCanvas={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a>, USGS, NOAA'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}"
          />
          <GeoJSON
            data={cantonsGeoJSON}
            style={geoJsonStyle}
            onEachFeature={(feature, layer) => {
              layer.on('click', () => handleFeatureClick(feature));
            }}
          />
        </MapContainer>
        <Popup open={!!popupData} closeOnDocumentClick onClose={() => setPopupData(null)} style={{ width: "100px", height: "150px" }}>
          <PopupContent />
        </Popup>
      </div>
      <FooterComponent />
    </>
  );
};

export default FormComponent;
