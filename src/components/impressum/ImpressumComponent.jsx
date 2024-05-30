import React from 'react';
import { HeaderComponent } from "../HeaderComponent";
import { FooterComponent } from "../FooterComponent";
import "../../Styles.css";

export const ImpressumComponent = (props) => {
  const username = props.user?.username || "";

  return (
    <>
      <HeaderComponent username={username} />
      <div className="ImpressumWrapper" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '20px' }}>
        <div>
          <h1>Impressum</h1>
          <section>
            <h2>Autoren</h2>
            <p>Studierende 4 Semester Geomatik Bsc.<br />
            Gian Luca Schmid, Sina Kägi, Vania Pereira, Patrick Würsten</p>
          </section>
          <section>
            <h2>Gestaltung</h2>
            <p>Das Projekt wurde mit node-js React umgesetzt <br/>
            und ist auf <a href="https://github.com/Pwol99/JassSwitzerland" target="_blank" rel="noopener noreferrer">Github</a> gehostet.</p>
          </section>
          <section>
            <h2>Entstehung</h2>
            <p>Hackathlon 2024, FHNW Muttenz</p>
          </section>
        </div>
        <div style={{ paddingTop: '20px', marginTop: '50px' }}>
          <section>
            <h2>Bilder</h2>
            <p>Die verwendeten Bilder sind alle mit AI Generiert.<br />
            Die Jasskarten entstammen der Sammlung von <a href="https://www.jassportal.ch" target="_blank" rel="noopener noreferrer">Jassportal.ch</a>.</p>
          </section>
          <section>
            <h2>Warum Jassen</h2>
            <p>Das Problem bei Jassen mit Personen aus unterschiedlichen Kantonen ist altbekannt, gewisse Jassen mit Deutschschweizerkarten andere mit Französischen. Diesem wollen wir abhilfe schaffen. Aktuell wird noch gegen einen Computer gespielt toll wäre eine weiter entwicklung gegen echte Spieler und jeder Spieler sieht die Karten die er besser spielen kann.</p>
          </section>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default ImpressumComponent;
