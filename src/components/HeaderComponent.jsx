import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../data/Jasslogo.png";
import "../Styles.css";

export const HeaderComponent = ({playername}) => {
  console.log({playername});
  return (
    <AppBar position="static">
      <Toolbar className="App-header">
        <Link to="/">
          <img style={{ height: 60 }} src={logo} alt="logo" />
        </Link>
        <div className="footer-content">
          Das Schweizer Jassgame
        </div>
        <div className="HeaderText" id="Username">
          <Typography variant="subtitle1">{playername}</Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};
