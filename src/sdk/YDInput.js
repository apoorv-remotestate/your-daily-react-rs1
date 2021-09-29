import TextField from "@mui/material/TextField";
import { InputAdornment, ThemeProvider, createTheme } from "@mui/material";
// import { orange } from "@mui/material/colors";

const theme = createTheme({ palette: { primary: { main: "#000" } } });

export const YDInput = ({something, style, ...rest}) => {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        {...rest}
        fullWidth
        sx={{ marginTop: 3 }}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="start"
              sx={{
                ...style,
              }}
            >
              {something}
            </InputAdornment>
          ),
        }}
      />
    </ThemeProvider>
  );
};
