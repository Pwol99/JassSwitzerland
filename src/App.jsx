// App.jsx
import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom"; // BrowserRouter entfernt

// Importiere die Komponenten
import { Main } from "./components/main/Main";
import { LoginComponent } from "./components/login/LoginComponent";
import { FormComponent } from "./components/form/FormComponent";
import { ImpressumComponent } from "./components/impressum/ImpressumComponent";

function App() {
  const [playername, setplayername] = useState(""); // Standardwert als leerer String

  return (
    <Routes>
      <Route
        path="/"
        element={<LoginComponent playername={playername} setplayername={setplayername} />}
      />
      <Route
        path="/form"
        element={<FormComponent playername={playername} />}
      />
      <Route
        path="/impressum"
        element={<ImpressumComponent playername={playername} />}
      />
      <Route
        path="/main"
        element={<Main playername={playername} />}
      />
    </Routes>
  );
}

export default App;
