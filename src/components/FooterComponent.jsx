import { useNavigate } from "react-router-dom";
import "../Styles.css";
import logog2022 from "../geomaticlogo.png";

export const FooterComponent = () => {
  return (
    <footer className="App-header FooterContainer">
      <a href="https://geomatik-2022.clubdesk.com/" target="_blank" rel="noopener noreferrer">
        <img className="Logo" src={logog2022} alt="logo" />
      </a>
      <div className="FooterText">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '100px' }}>
          Dies ist keine offizielle FHNW Website
        </div>
      </div>
      <div className="FooterText" style={{ paddingRight: '20px' }}>
        <div>
          © Copyright by G.Schmid, S.Kägi<br />
          <span style={{ paddingLeft: '20px' }}>V.Pereira, P.Würsten</span> 
        </div>
      </div>
    </footer>
  );
};
