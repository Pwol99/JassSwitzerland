import { useNavigate } from "react-router-dom";
import "../Styles.css";
import logog2022 from "../geomaticlogo.png"

export const FooterComponent = () => {
  const navigate = useNavigate();
  return (
    <footer className="App-header FooterContainer">
      <img className="Logo" src={logog2022} alt="logo" />
      <div className="FooterText">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '100px' }}>
          Dies ist keine offizielle FHNW Website
        </div>
      </div>
      <div className="FooterText" style={{ paddingRight: '20px' }}>
        <div>
          © Copyright by G. Schmid, S.Kägi<br />
          <span style={{ paddingLeft: '20px' }}>V. Perreria, P.Würsten</span> 
        </div>
      </div>
    </footer>
  );
};
