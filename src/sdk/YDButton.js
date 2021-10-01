import ButtonUnstyled from "@mui/core/ButtonUnstyled";
import { styled } from "@mui/material/styles";

const Test = styled(ButtonUnstyled)(
  `
    background: linear-gradient(180deg, #F88A12 0%, #CD2D05 100%);
    width: 100%;
    color: white;
    border: none;
    border-radius:4px;
    &:hover {
    background-color: #0059b2;
  }
  `
);

export const YDPrimaryButton = ({ style, ...rest }) => {
  return (
    <ButtonUnstyled sx={{ ...style }} {...rest} component={Test}>
      {style.value}
    </ButtonUnstyled>
  );
};
