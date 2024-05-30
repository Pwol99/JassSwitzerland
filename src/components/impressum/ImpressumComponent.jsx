import React from 'react';
import { HeaderComponent } from "../HeaderComponent";
import { FooterComponent } from "../FooterComponent";
import "../../Styles.css";

export const ImpressumComponent = (props) => {
  const playername = props.playername || "";

  return (
    <>
      <HeaderComponent playername={playername} />
      <div className="ImpressumWrapper" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '20px' }}>
        <div>
          <h1>Impressum</h1>
          <section>
            <h2>Autoren</h2>
            <p>Studierende 4. Semester Geomatik Bsc.<br />
            Gian Luca Schmid, Sina Kägi, Vania Pereira, Patrick Würsten</p>
          </section>
          <section>
            <h2>Gestaltung</h2>
            <p>Das Projekt wurde mit node-js React umgesetzt <br/>
            und ist auf <a href="https://github.com/Pwol99/JassSwitzerland" target="_blank" rel="noopener noreferrer">Github</a> gehostet.</p>
          </section>
          <section>
            <h2>Entstehung</h2>
            <p>GeoHackathon 2024, FHNW Muttenz</p>
          </section>
        </div>
        <div style={{ paddingTop: '20px', marginTop: '50px' }}>
          <section>
            <h2>Bilder</h2>
            <p>Die verwendeten Bilder sind alle mit AI generiert.<br />
            Die Jasskarten entstammen der Sammlung von <a href="https://www.jassportal.ch" target="_blank" rel="noopener noreferrer">Jassportal.ch</a>.</p>
          </section>
          <section>
            <h2>Warum jassen?</h2>
            <p>Das Problem beim jassen mit Personen aus unterschiedlichen Kantonen ist altbekannt, gewisse jassen mit Deutschschweizerkarten andere mit Französischen. Diesem Problem wollen wir Abhilfe schaffen. Aktuell wird noch gegen einen Computer gespielt, toll wäre eine weitere Entwicklung gegen echte Spieler und jeder Spieler sieht die Karten mit denen er am meisten vertraut ist.</p>
          </section>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default ImpressumComponent;
