import "../Styles.css";
import logog2022 from "../data/geomaticlogo.png";

export const FooterComponent = () => {
  return (
    <footer className="FooterContainer">
      <a href="https://geomatik-2022.clubdesk.com/" target="_blank" rel="noopener noreferrer">
        <img className="Logo" src={logog2022} alt="logo" />
      </a>
      <div className="footer-copyright">
        © 2024 G.Schmid, S.Kägi, V.Pereira, P.Würsten
      </div>
    </footer>
  );
};
