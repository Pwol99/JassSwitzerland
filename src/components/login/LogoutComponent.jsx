import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import "../../Styles.css";
import { HeaderComponent } from "../HeaderComponent";
import { FooterComponent } from "../FooterComponent";

export const LogoutComponent = (props) => {
  return (
    <>
      <HeaderComponent user={props.username} />
      <div className="PageWrapper">
        <div className="LoginWrapper">
          <Typography variant="h5">Du bist abgemeldet</Typography>
          <Link to="/">Zurück zum Login</Link>
        </div>
      </div>
      <FooterComponent></FooterComponent>
    </>
  );
};
