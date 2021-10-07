import Tab from "@mui/material/Tab";

export function YDTab({ style, ...rest }) {
  return (
    <Tab
      disableRipple
      sx={{
        ...style,
        width: "100%",
        fontSize: "22px",
        margin: "0px",
        padding: "0px",
        textTransform: "none",
        color: "#777777",
        "&.Mui-selected": {
          color: "#F88A12",
          border: "1px solid #F88A12",
        },
      }}
      {...rest}
    />
  );
}
