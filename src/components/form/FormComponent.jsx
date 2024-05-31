import React, { useState, useEffect } from 'react';
import "../../Styles.css";
import { HeaderComponent } from "../HeaderComponent";
import { FooterComponent } from "../FooterComponent";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import cantonsGeoJSON from "./../../data/kantone.json";
import { useNavigate } from "react-router-dom";
import frbild from "./../../data/französisch.png";
import grbild from "./../../data/Deutsche.png";
import franz1 from "./../../data/Franzoesisch_1.json";
import franz2 from "./../../data/Franzoesisch_2.json";
import franz3 from "./../../data/Franzoesisch_3.json";
import german from "./../../data/Deutsch.json";


const importImages = (name) => {
  try {
    return require(`../../data/${name}.png`);
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
      
      <div 
      className="popup-content" 
      style={{
        display: "flex"

        }}>
        <div className="popup-text">
          <b>Kanton:</b> {popupData.NAME}<br/>
          <b>Karten-Typ:</b> {language}<br/>
          <button onClick={handleMainPageNavigation}>Zum Spiel</button>
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
  const franzstyle = {
    color: '#000000',
    weight: 1,
    fill: true,
    fillOpacity: 0.5,
    fillColor: '#666666', // Leichtes Grau als Füllfarbe
    interactive: true
  };

  return (
    <>
      <HeaderComponent playername={props.playername} />
      <div style={{ height: "calc(100vh - 135px)", position: "relative" }}>
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
            data={franz1}
            style={franzstyle}
          />
          <GeoJSON
            data={franz2}
            style={franzstyle}
          />
          <GeoJSON
            data={franz3}
            style={franzstyle}
          />
           <GeoJSON
            data={cantonsGeoJSON}
            style={geoJsonStyle}
            onEachFeature={(feature, layer) => {
              layer.on('click', () => handleFeatureClick(feature));
            }}
          />

          {/* Hier wird das Bild an der WGS 84-Koordinate (47.6021, 8.9769) platziert */}
          <img 
            src={frbild} 
            alt="Französisch" 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 999,
              pointerEvents: 'none',
              // WGS 84-Koordinate (47.6021, 8.9769)
              // Mit Hilfe der leaflet Methode latLngToLayerPoint umgewandelt
              top: 'calc(50% + 50px)', // Beispielwerte
              left: 'calc(50% + 220px)', // Hier wird das Bild um 100px nach links verschoben
              width: '200px', // halbe Breite
              height: 'auto' // Höhe entsprechend anpassen
            }} 
          />
          <img 
            src={frbild} 
            alt="Französisch" 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 999,
              pointerEvents: 'none',
              // WGS 84-Koordinate (47.6021, 8.9769)
              // Mit Hilfe der leaflet Methode latLngToLayerPoint umgewandelt
              top: 'calc(50% + 20px)', // Beispielwerte
              left: 'calc(50% - 175px)', // Hier wird das Bild um 100px nach links verschoben
              width: '200px', // halbe Breite
              height: 'auto' // Höhe entsprechend anpassen
            }} 
          />
          <img 
            src={frbild} 
            alt="Französisch" 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 999,
              pointerEvents: 'none',
              // WGS 84-Koordinate (47.6021, 8.9769)
              // Mit Hilfe der leaflet Methode latLngToLayerPoint umgewandelt
              top: 'calc(50% - 205px)', // Beispielwerte
              left: 'calc(50% + 170px)', // Hier wird das Bild um 100px nach links verschoben
              width: '100px', // halbe Breite
              height: 'auto' // Höhe entsprechend anpassen
            }} 
          />
          <img 
            src={grbild} 
            alt="Deutsch" 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 999,
              pointerEvents: 'none',
              // WGS 84-Koordinate (47.6021, 8.9769)
              // Mit Hilfe der leaflet Methode latLngToLayerPoint umgewandelt
              top: 'calc(50% - 70px)', // Beispielwerte
              left: 'calc(50% + 90px)', // Hier wird das Bild um 100px nach links verschoben
              width: '200px', // halbe Breite
              height: 'auto' // Höhe entsprechend anpassen
            }} 
          />
        </MapContainer>
        <Popup open={!!popupData} closeOnDocumentClick onClose={() => setPopupData(null)} >
          <PopupContent />
        </Popup>
      </div>
      <FooterComponent />
    </>
  );
};

export default FormComponent;
