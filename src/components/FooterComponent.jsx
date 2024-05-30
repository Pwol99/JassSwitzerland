import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../Styles.css";

export const FooterComponent = ({ gameCode }) => { // Empfange die Game-ID als Prop
  const navigate = useNavigate();
  return (
    <footer className="FooterContainer"> {/* Füge eine Klasse hinzu, um den Footer zu positionieren */}
      <div className="FooterButtons"> {/* Container für die Buttons */}
        <Button
          id="BackButton"
          variant="outlined"
          onClick={() => {
            navigate("/form");
          }}
        >
          Back
        </Button>
        <Button
          id="LogoutButton"
          variant="outlined"
          onClick={() => {
            navigate("/logout");
          }}
        >
          Logout
        </Button>
      </div>
      {gameCode && ( // Zeige die Game-ID nur an, wenn sie vorhanden ist
        <div className="GameCode"> {/* Container für die Game-ID */}
          Game-ID: {gameCode}
        </div>
      )}
    </footer>
  );
};
