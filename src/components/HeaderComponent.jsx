import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // Stelle sicher, dass du react-router-dom installiert hast
import logo from "../Jasslogo.png";
import fhnw from "../logofhnw.png";
import "../Styles.css";

export const HeaderComponent = (props) => {
  console.log(props.username);
  return (
    <AppBar position="static">
      <Toolbar className="App-header">
        <Link to="/"> {/* Hier wird der Link auf die Startseite gesetzt */}
          <img style={{ height: 60 }} src={logo} alt="logo" />
        </Link>
        <a href="https://www.fhnw.ch" target="_blank" rel="noopener noreferrer"> {/* Hier wird der Link auf www.fhnw.ch gesetzt */}
          <img style={{ height: 60, marginLeft: '40px'}} src={fhnw} alt="fhnw" />
        </a>
        <div className="HeaderText" style={{ marginLeft: '200px' }}>Das Schweizer Jassgame</div>
        <div className="HeaderText" id="Username">
          <Typography variant="subtitle1">{props.username}</Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};
