import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GenericInput } from "../InputComponent";
import { Card, Button, CardContent, Typography } from "@mui/material";
import "../../Styles.css";
import { HeaderComponent } from "../HeaderComponent";

export const LoginComponent = (props) => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleUserChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setCredentials(() => ({ ...credentials, [name]: value }));
  };

  return (
    <>
      <HeaderComponent username={props.user.username} />
      <div className="PageWrapper">
        <div className="LoginWrapper">
          <Card sx={{ width: 400, padding: 1 }}>
            <Typography variant="h5">Login</Typography>
            <CardContent>
              <GenericInput
                value={credentials.username}
                onChange={handleUserChange}
                name="username"
              />
              <GenericInput
                value={credentials.password}
                onChange={handleUserChange}
                name="password"
              />
            </CardContent>
            <Button
              disabled={!credentials.username || !credentials.password}
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
    </>
  );
};
