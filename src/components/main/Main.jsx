import JassGame, { TableComponent } from "./TableComponent";
import { HeaderComponent } from "../HeaderComponent";
import {FooterComponent} from "../FooterComponent"

export const Main = (props) => {
  return (
    <div className="App">
      <HeaderComponent playername={props.playername} />
      <JassGame playername={props.playername} setplayername={props.setplayername}/>
    </div>
  );
};
