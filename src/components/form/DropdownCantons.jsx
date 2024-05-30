import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const DropdownCantons = (props) => {
  const cantons = [
    { name: "Aargau", short: "KT_AG" },
    { name: "Bern", short: "KT_BE" },
    { name: "Freiburg", short: "KT_FR" },
    { name: "Glarus", short: "KT_GL" },
    { name: "Uri", short: "KT_UR" },
    { name: "Schaffhausen", short: "KT_SH" },
  ];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="dropdown-cantons-label">provider</InputLabel>
        <Select
          id="dropdown-cantons"
          className="Dropdown"
          label="Provider"
          name="provider"
          onChange={props.handleDataChange}
        >
          {cantons.map((provider, index) => (
            <MenuItem key={index} value={provider.short}>
              {provider.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
