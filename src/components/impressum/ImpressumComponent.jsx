import React, {useState, useEffect} from 'react';
import { HeaderComponent } from "../HeaderComponent";
import { FooterComponent } from "../FooterComponent";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, Box, Typography, Grid, Avatar } from "@mui/material";
import "../../Styles.css";

export const ImpressumComponent = (props) => {
  const playername = props.playername || "";
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [avatarColor, setAvatarColor] = useState('');
  
  useEffect(() => {
    const colors = ['#1976D2', '#388E3C', '#FBC02D', '#D32F2F', '#7B1FA2', '#FF5722'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setAvatarColor(randomColor);
  }, []);

  const handleGameEnd = () => {
    // Zurücksetzen des Spielernamens oder andere Aktionen für das Spielende
    navigate("/");
  };

  const handleScoreboard = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false); // Schließen des Modal-Fensters
  };

  const renderAvatar = () => {
    if (playername) {
      const initials = playername.charAt(0).toUpperCase();
      return (
        <Avatar sx={{ bgcolor: avatarColor, marginRight: '10px' }}>{initials}</Avatar>
      );
    }
    return null;
  };

  // Beispiel-Daten für das Scoreboard
  const scoreboardData = [
    { name: 'Spieler 1', points: 100 },
    { name: 'Spieler 2', points: 80 },
    { name: 'Spieler 3', points: 120 },
    { name: 'Spieler 4', points: 90 },
  ];

  const sortedPlayers = scoreboardData.sort((a, b) => b.points - a.points);
  

  return (
    <>
      <HeaderComponent playername={playername} />
      <div className="ImpressumWrapper" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '20px', position: 'relative' }}>
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
          <section>
            <h2>Geodaten</h2>
            <p>Die verwendeten Geodaten wurden auf <a href="https://data.opendatasoft.com/explore/dataset/georef-switzerland-kanton%40public/export/?disjunctive.kan_code&disjunctive.kan_name&sort=year" target="_blank" rel="noopener noreferrer">opendatasoft</a> bezogen.</p>
          </section>
        </div>
        <div style={{ paddingTop: '20px', marginTop: '50px' }}>
          <section>
            <h2>Bilder</h2>
            <p>Die verwendeten Bilder sind mit AI generiert.<br />
            Die verwendeten Kantonswappen sind von <a href="https://commons.wikimedia.org/wiki/Flags_of_cantons_of_Switzerland" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a><br />
            Die Jasskarten entstammen der Sammlung von <a href="https://www.jassportal.ch" target="_blank" rel="noopener noreferrer">Jassportal.ch</a> </p>
          </section>
          <section>
            <h2>Warum jassen?</h2>
            <p>Das Problem beim jassen mit Personen aus unterschiedlichen Kantonen ist altbekannt, gewisse jassen mit Deutschschweizerkarten andere mit Französischen. Diesem Problem wollen wir Abhilfe schaffen. Aktuell wird noch gegen einen Computer gespielt, toll wäre eine weitere Entwicklung gegen echte Spieler und jeder Spieler sieht die Karten mit denen er am meisten vertraut ist.</p>
          </section>
        </div>
        <div style={{ position: 'absolute', top: '100px', right: '50px'}}>
          <Button variant="contained" onClick={handleGameEnd} style={{ marginBottom: '10px' }}>Spiel beenden</Button>
          <Button variant="contained" onClick={handleScoreboard} style={{ height: '36px' }}>Scoreboard</Button>
        </div>
        <div style={{ position: 'absolute', top: '0', left: '0', margin: '10px', transform: 'translateX(-100%)' }}>
          {renderAvatar()} {/* Avatar anzeigen */}
        </div>
      </div>
      <FooterComponent />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} // Zentrieren des Modal-Fensters
      >
        <Box sx={{ width: 400, bgcolor: 'background.paper', p: 3, borderRadius: '8px' }}>
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Scoreboard
          </Typography>
          {/* Scoreboard-Tabelle */}
          <Grid container spacing={2}>
            {sortedPlayers.map((player, index) => (
              <Grid item xs={12} key={index}>
                <Typography variant="body1">
                  {index + 1}. Platz: {player.name} - {player.points} Punkte
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default ImpressumComponent;
