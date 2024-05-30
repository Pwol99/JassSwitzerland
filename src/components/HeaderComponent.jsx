import { AppBar, Toolbar, Typography } from "@mui/material";
import logo from "../Jasslogo.png";
import "../Styles.css";

export const HeaderComponent = (props) => {
  console.log(props.username);
  return (
    <AppBar position="static">
      <Toolbar className="App-header">
        <img style={{ height: 40,}} src={logo} alt="logo" />
        <div className="HeaderText">Das Schweizer Jassgame</div>
        <div className="HeaderText" id="Username">
          <Typography variant="subtitle1">{props.username}</Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};
