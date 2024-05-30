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
  });

  const handleUserChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    const stateName = name === "Name" ? "username" : name;

    setCredentials((prevCredentials) => ({ ...prevCredentials, [stateName]: value }));
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
              onClick={() => {
                props.setUser(credentials);
                navigate("/form");
              }}
            >
              Login
            </Button>
          </Card>
        </div>
      </div>
      <FooterComponent></FooterComponent>
    </>
  );
};
