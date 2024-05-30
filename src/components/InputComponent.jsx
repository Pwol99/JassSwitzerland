import TextField from "@mui/material/TextField";
import "../Styles.css";

export const GenericInput = ({ value, onChange, name, width }) => (
  <TextField
    label={name}
    name={name}
    value={value}
    onChange={onChange}
    variant="outlined"
    style={{ width: width ? width : 250 }}
  />
);
