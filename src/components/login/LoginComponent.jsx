import { useNavigate } from "react-router-dom";
import { GenericInput } from "../InputComponent";
import { Card, Button, CardContent, Typography } from "@mui/material";
import "../../Styles.css";
import { HeaderComponent } from "../HeaderComponent";
import { FooterComponent } from "../FooterComponent";
import backgroundpicture from "../../data/Backgroundpicture.jpeg";

export const LoginComponent = ({ playername, setplayername }) => {
  const navigate = useNavigate();

  const handleUserChange = (event) => {
    setplayername(event.target.value);
  };

  const handleNewRoomClick = () => {
    console.log("Playername:", playername); 
    navigate("/form");
  };

  const handleImpressumClick = () => {
    navigate("/impressum");
  };

  return (
    <>
      <HeaderComponent playername={playername} />
      <div className="PageWrapper" style={{ 
        backgroundImage: `url(${backgroundpicture})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
        minHeight: '100vh',  
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
        <div className="LoginWrapper">
          <Card sx={{ height: 450, width: 400, padding: 1 }}>
            <Typography variant="h5" style={{ marginTop: '10px', marginBottom: '10px' }}>
              Gebe deinen Namen ein:
            </Typography>
            <CardContent>
              <GenericInput
                value={playername}
                onChange={handleUserChange}
                name="Name"
              />
            </CardContent>
            <Button
              disabled={!playername}
              variant="contained"
              onClick={handleNewRoomClick}
              style={{ marginTop: '10px' }}
            >
              Spielkarten auswählen
            </Button>
            <div style={{ marginTop: '20px', textAlign: 'left' }}>
              <Typography variant="body2" style={{ textAlign: 'left' }}>
                Willkommen beim Jassen, dem beliebten Kartenspiel, das in der ganzen Schweiz und in anderen alemannischen Regionen gespielt wird! Mit 36 Karten und vier Spielern bringt Jassen Menschen zusammen und ist ein wichtiger Teil unserer kulturellen Tradition. Aus diesem Grund kann man hier je nach Kanton, in dem man lebt oder aufgewachsen ist, die entsprechenden Karten wählen und die Regeln anpassen. Also, schnapp dir deine Karten und lass die Spiele beginnen – Jassen verbindet und begeistert!
              </Typography>
            </div>
            <div style={{ marginTop: '40px' }}>
              <Typography variant="body2" onClick={handleImpressumClick} style={{ cursor: 'pointer' }}>
                Impressum
              </Typography>
            </div>
          </Card>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default LoginComponent;
