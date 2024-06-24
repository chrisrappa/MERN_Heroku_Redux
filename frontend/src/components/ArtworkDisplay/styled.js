import { Grid, styled } from "@mui/material";

const FocusedWorkContainer = styled(Grid)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  flexDirection: 'column',
  flex: '1',
  width: '100%',
  maxHeight: '40dvh',
  objectFit: 'contain',
  position: 'relative',
}));

export { FocusedWorkContainer };