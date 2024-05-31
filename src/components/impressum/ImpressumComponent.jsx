import React, { useState, useEffect } from 'react';
import { HeaderComponent } from "../HeaderComponent";
import { FooterComponent } from "../FooterComponent";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Typography, Grid, List, ListItem, ListItemText, ListItemIcon, Avatar, Modal } from "@mui/material";
import { PersonOutline, Build, BeachAccess, Public, Image, SportsEsports } from '@mui/icons-material';
import "../../Styles.css";

export const ImpressumComponent = (props) => {
  const playername = props.playername || "";

  return (
    <>
      <HeaderComponent playername={playername} />
      <div className="ImpressumWrapper" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '20px', position: 'relative' }}>
        <div>
          <Typography variant="h4" gutterBottom>Impressum</Typography>
          <section>
            <ListItem>
              <ListItemIcon>
                <PersonOutline />
              </ListItemIcon>
              <ListItemText primary="Autoren" secondary="Studierende 4. Semester Geomatik Bsc. Gian Luca Schmid, Sina Kägi, Vania Pereira, Patrick Würsten" />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <Build />
              </ListItemIcon>
              <ListItemText 
                primary="Gestaltung" 
                secondary={
                  <span>
                    Das Projekt wurde mit node-js React umgesetzt und ist auf 
                    <a href='https://github.com/Pwol99/JassSwitzerland' target='_blank' rel='noopener noreferrer'>Github</a> gehostet.
                  </span>
                } 
              />
            </ListItem>

            <section>
              <ListItem>
                <ListItemIcon>
                  <BeachAccess />
                </ListItemIcon>
                <ListItemText primary="Entstehung" secondary="GeoHackathon 2024, FHNW Muttenz" />
              </ListItem>
            </section>

            <section>
              <ListItem>
                <ListItemIcon>
                  <Build />
                </ListItemIcon>
                <ListItemText 
                  primary="Gestaltung" 
                  secondary={
                    <span>
                      Die verwendeten Geodaten wurden auf
                      <a href='https://data.opendatasoft.com/explore/dataset/georef-switzerland-kanton%40public/export/?disjunctive.kan_code&disjunctive.kan_name&sort=year' target='_blank' rel='noopener noreferrer'> opendatasoft</a> bezogen.
                    </span>
                  } 
                />
              </ListItem>
            </section>
          </section>
        </div>
        
        <div style={{ paddingTop: '20px', marginTop: '50px' }}>
          <section>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Image />
                </ListItemIcon>
                <ListItemText 
                  primary="Bilder"
                  secondary={
                    <span>
                      Die verwendeten Bilder sind mit AI generiert.<br />
                      Die verwendeten Kantonswappen sind von <a href="https://commons.wikimedia.org/wiki/Flags_of_cantons_of_Switzerland" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a><br />
                      Die Jasskarten entstammen der Sammlung von <a href="https://www.jassportal.ch" target="_blank" rel="noopener noreferrer">Jassportal.ch</a>
                    </span>
                  }
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <SportsEsports />
                </ListItemIcon>
                <ListItemText primary="Warum jassen?" secondary="Das Problem beim jassen mit Personen aus unterschiedlichen Kantonen ist altbekannt, gewisse jassen mit Deutschschweizerkarten andere mit Französischen. Diesem Problem wollen wir Abhilfe schaffen. Aktuell wird noch gegen einen Computer gespielt, toll wäre eine weitere Entwicklung gegen echte Spieler und jeder Spieler sieht die Karten mit denen er am meisten vertraut ist." />
              </ListItem>
            </List>
          </section>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default ImpressumComponent;
