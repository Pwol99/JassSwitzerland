import { HeaderComponent } from "../HeaderComponent";
import { FooterComponent } from "../FooterComponent";
import "../../Styles.css";

export const ImpressumComponent = (props) => {
  const username = props.user?.username || ""; // Überprüfen, ob props.user existiert

  return (
    <>
      <HeaderComponent username={username} />
      <FooterComponent />
    </>
  );
};
