import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GenericInput } from "../InputComponent";
import { Card, Button, CardContent, Typography, Slider } from "@mui/material";
import { DropdownCantons } from "./DropdownCantons";
import { DropdownServices } from "./DropdownServices";
import "../../Styles.css";
import { HeaderComponent } from "../HeaderComponent";
import { FooterComponent } from "../FooterComponent";

export const FormComponent = (props) => {
  const defaultData = {
    title: "",
    abstract: "",
    service: "",
    provider: "",
    metaquality: 0,
  };

  const [data, setData] = useState(defaultData);

  const handleDataChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(() => ({ ...data, [name]: value }));
  };

  const navigate = useNavigate();

  return (
    <>
      <HeaderComponent username={props.username} />
      <div className="PageWrapper">
        <Card sx={{ width: 1000, padding: 1 }}>
          <Typography variant="h5">Add data</Typography>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(data);
                props.addToTableData(data);
                setData(defaultData);
              }}
            >
              <div id="FormWrapper">
                <GenericInput
                  value={data.title}
                  onChange={handleDataChange}
                  name="title"
                />
                <DropdownCantons handleDataChange={handleDataChange} />
                <DropdownServices handleDataChange={handleDataChange} />
              </div>
              <GenericInput
                value={data.abstract}
                onChange={handleDataChange}
                name="abstract"
                width={980}
              />
              <div id="SliderWrapper">
                <Typography variant="subtitle1" gutterBottom>
                  Metaquality
                </Typography>
                <Slider
                  id="Slider"
                  name="metaquality"
                  step={25}
                  marks
                  min={0}
                  max={100}
                  value={data.metaquality}
                  onChange={handleDataChange}
                  valueLabelDisplay="auto"
                />
              </div>
              <div id="ButtonWrapper">
                <Button variant="contained" type="Submit">
                  Speichern
                </Button>
                <Button variant="outlined" onClick={() => navigate("/main")}>
                  Weiter
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <FooterComponent />
    </>
  );
};
