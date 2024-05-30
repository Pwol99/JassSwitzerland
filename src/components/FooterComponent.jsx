import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../Styles.css";

export const FooterComponent = () => {
  const navigate = useNavigate();
  return (
    <footer>
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
    </footer>
  );
};
