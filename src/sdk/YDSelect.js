import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const YDSelect = ({ style }) => {
  return (
    <Select sx={{ ...style }}>
      <MenuItem value={1}>1</MenuItem>
      <MenuItem>2</MenuItem>
    </Select>
  );
};
