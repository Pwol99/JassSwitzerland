// App.jsx
import "./App.css";
import io from 'socket.io-client';
import { useState } from "react";
import { Routes, Route } from "react-router-dom"; // BrowserRouter entfernt

// Importiere die Komponenten
import { Main } from "./components/main/Main";
import { LoginComponent } from "./components/login/LoginComponent";
import { FormComponent } from "./components/form/FormComponent";
import { ImpressumComponent } from "./components/impressum/ImpressumComponent";
const socket = io('https://jass-schweiz.vercel.app/api');


function App() {
  const [playername, setplayername] = useState(""); // Standardwert als leerer String
  const [jasskarten_typ, setJasskartentyp] = useState("");

  return (
    <Routes>
      <Route
        path="/"
        element={<LoginComponent playername={playername} setplayername={setplayername} />}
      />
      <Route
        path="/form"
        element={<FormComponent playername={playername} jasskarten_typ={jasskarten_typ} setJasskartentyp={setJasskartentyp} />}
      /> 
      <Route
        path="/impressum"
        element={<ImpressumComponent playername={playername} />}
      />
      <Route
        path="/main"
        element={
          <Main
            playername={playername} setplayername={setplayername} jasskarten_typ={jasskarten_typ}
          />
        }
      />
    </Routes>
  );
}

export default App;
