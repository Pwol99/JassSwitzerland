import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GenericInput } from "../InputComponent";
import { Card, Button, CardContent, Typography } from "@mui/material";
import "../../Styles.css";
import { HeaderComponent } from "../HeaderComponent";
import { FooterComponent } from "../FooterComponent";

export const LoginComponent = (props) => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    gameCode: null,
  });

  const handleUserChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    const stateName = name === "Name" ? "username" : name;

    setCredentials((prevCredentials) => ({ ...prevCredentials, [stateName]: value }));
  };

  const generateGameCode = () => {
    // Zufälligen 6-stelligen Gamecode generieren
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleNewRoomClick = () => {
    const newGameCode = generateGameCode();
    setCredentials((prevCredentials) => ({ ...prevCredentials, gameCode: newGameCode }));
    navigate("/new-room", { state: { gameCode: newGameCode } }); // Navigiere zur Route "/new-room" mit der neuen Game-ID
  };

  const handleJoinRoomClick = () => {
    navigate("/join-room"); // Navigiere zur Route "/join-room", um einem bestehenden Raum beizutreten
  };

  return (
    <>
      <HeaderComponent username={props.user.username} />
      <div className="PageWrapper">
        <div className="LoginWrapper">
          <Card sx={{ width: 400, padding: 1 }}>
            <Typography variant="h5">Gebe deinen Namen ein:</Typography>
            <CardContent>
              <GenericInput
                value={credentials.username}
                onChange={handleUserChange}
                name="Name"
              />
            </CardContent>
            <Button
              disabled={!credentials.username}
              variant="contained"
              onClick={handleNewRoomClick}
            >
              Neuer Raum
            </Button>
            <Button
              disabled={!credentials.username}
              variant="contained"
              onClick={handleJoinRoomClick}
            >
              Bestehendem Raum beitreten
            </Button>
          </Card>
        </div>
      </div>
      <FooterComponent gameCode={credentials.gameCode} /> {/* Übergebe die Game-ID als Prop an den Footer */}
    </>
  );
};
