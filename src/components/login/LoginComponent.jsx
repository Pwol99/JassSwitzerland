import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GenericInput } from "../InputComponent";
import { Card, Button, CardContent, Typography } from "@mui/material";
import "../../Styles.css";
import { HeaderComponent } from "../HeaderComponent";
import { FooterComponent } from "../FooterComponent";
import backgroundpicture from "../../Backgroundpicture.jpeg";

export const LoginComponent = (props) => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: ""
  });

  const handleUserChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    const stateName = name === "Name" ? "username" : name;

    setCredentials((prevCredentials) => ({ ...prevCredentials, [stateName]: value }));
  };

  const handleNewRoomClick = () => {
    navigate("/new-room"); // Navigiere zur Route "/new-room" ohne einen Gamecode zu übergeben
  };

  const handleJoinRoomClick = () => {
    navigate("/join-room"); // Navigiere zur Route "/join-room", um einem bestehenden Raum beizutreten
  };

  return (
    <>
      <HeaderComponent username={props.user.username} />
      <div className="PageWrapper" style={{ 
        backgroundImage: `url(${backgroundpicture})`, 
        backgroundSize: 'contain', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // Hier wird die Hintergrundbefestigung auf 'fixed' gesetzt
        height: '80vh', // Hier wird die Höhe auf '100vh' festgelegt
      }}>
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
          </Card>
        </div>
      </div>
      <FooterComponent></FooterComponent>
    </>
  );
};
