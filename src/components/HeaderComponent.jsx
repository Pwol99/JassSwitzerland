import { AppBar, Toolbar, Typography } from "@mui/material";
import logo from "../geoharvester.png";
import "../Styles.css";

export const HeaderComponent = (props) => {
  console.log(props.username);
  return (
    <AppBar position="static">
      <Toolbar className="App-header">
        <img style={{ height: 40, marginLeft: -40 }} src={logo} alt="logo" />
        <div className="HeaderText">Eine Katalog für Schweizer Geodienste</div>
        <div className="HeaderText" id="Username">
          <Typography variant="subtitle1">{props.username}</Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};
