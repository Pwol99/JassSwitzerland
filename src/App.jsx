import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Main } from "./components/main/Main";
import { LoginComponent } from "./components/login/LoginComponent";
import { LogoutComponent } from "./components/login/LogoutComponent";
import { FormComponent } from "./components/form/FormComponent";
import { defaultData } from "./data/tableData";
import { ImpressumComponent } from "./components/impressum/ImpressumComponent";

function App() {
  // const noUser = { username: "", password: "" };
  const [playername, setplayername] = useState()
  //const [user, setUser] = useState(noUser);
  //const [tableData, setTableData] = useState(defaultData);

 // const handleLogout = () => setUser(noUser);

 // const addToTableData = (newData) => setTableData([newData, ...tableData]);

  return (
    <Routes>
      <Route
        path="/"
        element={<LoginComponent playername={playername} setplayername={setplayername} />}
      />
      <Route
        path="/form"
        element={
          <FormComponent
            playername={playername}
          />
        }
      />
      <Route
        path="/impressum"
        element={
          <FormComponent
            playername={playername}
          />
        }
      />
      <Route
        path="/main"
        element={
          <FormComponent
            playername={playername}
          />
        }
      />
    </Routes>
  );
}

export default App;
