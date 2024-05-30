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
  const noUser = { username: "", password: "" };
  const [user, setUser] = useState(noUser);
  const [tableData, setTableData] = useState(defaultData);

  const handleLogout = () => setUser(noUser);

  const addToTableData = (newData) => setTableData([newData, ...tableData]);

  return (
    <Routes>
      <Route
        path="/"
        element={<LoginComponent user={user} setUser={setUser} />}
      />
      <Route
        path="/form"
        element={
          <FormComponent
            username={user.username}
            addToTableData={addToTableData}
          />
        }
      />
      <Route
        path="/impressum"
        element={
          <ImpressumComponent
            username={user.username}
            addToTableData={addToTableData}
          />
        }
      />
      <Route
        path="/main"
        element={<Main username={user.username} tableData={tableData} />}
      />
      <Route
        path="/logout"
        element={
          <LogoutComponent
            handleLogout={handleLogout}
            username={user.username}
          />
        }
      />
    </Routes>
  );
}

export default App;
