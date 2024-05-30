import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../Jasslogo.png";
import fhnw from "../logofhnw.png";
import "../Styles.css";

export const HeaderComponent = (props) => {
  console.log(props.playername);
  return (
    <AppBar position="static">
      <Toolbar className="App-header">
        <Link to="/">
          <img style={{ height: 60 }} src={logo} alt="logo" />
        </Link>
        <a href="https://www.fhnw.ch/de/die-fhnw/hochschulen/architektur-bau-geomatik/institute/institut-geomatik" target="_blank" rel="noopener noreferrer">
          <img style={{ height: 60, marginLeft: '40px' }} src={fhnw} alt="fhnw" />
        </a>
        <div className="HeaderText" style={{ marginLeft: '200px' }}>
          Das Schweizer Jassgame
        </div>
        <div className="HeaderText" id="Username">
          <Typography variant="subtitle1">{props.username}</Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};
