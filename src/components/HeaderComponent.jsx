import { AppBar, Toolbar, Typography } from "@mui/material";
import logo from "../Jasslogo.png";
import fhnw from "../logofhnw.png";
import "../Styles.css";

export const HeaderComponent = (props) => {
  console.log(props.username);
  return (
    <AppBar position="static">
      <Toolbar className="App-header">
        <img style={{ height: 60 }} src={logo} alt="logo" />
        <img style={{ height: 60, marginLeft: '40px'}} src={fhnw} alt="fhnw" />
        <div className="HeaderText" style={{ marginLeft: '200px' }}>Das Schweizer Jassgame</div>
        <div className="HeaderText" id="Username">
          <Typography variant="subtitle1">{props.username}</Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};
