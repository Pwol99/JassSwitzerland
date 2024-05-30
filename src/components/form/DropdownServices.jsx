import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const DropdownServices = (props) => {
  const services = ["WMS", "WMTS", "WFS"];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="dropdown-service-label">service</InputLabel>
        <Select
          id="dropdown-service"
          className="Dropdown"
          name="service"
          label="Service"
          onChange={props.handleDataChange}
        >
          {services.map((service, index) => (
            <MenuItem key={index} value={service}>
              {service}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
