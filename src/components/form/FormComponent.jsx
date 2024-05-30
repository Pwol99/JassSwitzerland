import React from 'react';
import "../../Styles.css";
import { HeaderComponent } from "../HeaderComponent";
import { FooterComponent } from "../FooterComponent";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import cantonsGeoJSON from "./../../data/kantone.json";
import L from 'leaflet';

export const FormComponent = (props) => {
  // Funktion, um Popup-Fenster zu jedem Kanton hinzuzufügen und Maus-Interaktionen zu definieren
  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.kan_name) {
      let originalStyle = null;
      layer.on({
        mouseover: (event) => {
          originalStyle = event.target.options.style;
          layer.setStyle({
            fillOpacity: 0.2
          });

          // Popup zentrieren und ohne Close-Button anzeigen
          const popup = L.popup({
            autoPan: true,
            autoPanPadding: [100, 100], // Padding to keep the popup in the center
            closeButton: false // Kein Close-Button anzeigen
          })
            .setLatLng(layer.getBounds().getCenter())
            .setContent(props.language === 'Ger' ? generatePopupContentGer(feature) : generatePopupContentFra(feature))
            .openOn(layer._map);
        },
        mouseout: (event) => {
          event.target.setStyle(originalStyle);
          layer._map.closePopup();
        }
      });
    }
  };

  // Funktion zur Generierung des Popup-Inhalts auf Deutsch
  const generatePopupContentGer = (feature) => {
    return `<b>Kanton:</b> ${feature.properties.kan_name}<br/><b>Jasskarten Typ:</b> ${feature.properties.Jasskarten_typ}`;
  };

  // Funktion zur Generierung des Popup-Inhalts auf Französisch
  const generatePopupContentFra = (feature) => {
    return `<b>Kanton:</b> ${feature.properties.kan_name}<br/><b>Jasskarten Typ:</b> ${feature.properties.Jasskarten_typ}`;
  };

  const geoJsonStyle = {
    color: '#000000',
    weight: 1,
    fillOpacity: 0
  };

  return (
    <>
      <HeaderComponent username={props.username} />
      <div style={{ height: "calc(100vh - 135px)" }}>
        <MapContainer
          center={[46.8182, 8.2275]}
          zoom={8}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100%" }}
          minZoom={8}
          maxZoom={8}
          maxBounds={[[45.8182, 5.2275], [47.8182, 11.2275]]}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a>, USGS, NOAA'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}"
          />
          <GeoJSON data={cantonsGeoJSON} style={geoJsonStyle} onEachFeature={onEachFeature} />
        </MapContainer>
      </div>
      <FooterComponent />
    </>
  );
};

export default FormComponent;
