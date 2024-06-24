import { Grid, Paper, styled } from "@mui/material";

const MainContentArea = styled(Grid)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  flexDirection: 'column',
  minHeight: '75dvh',
  maxHeight: '-webkit-fill-available',
  height: '100%',
  width: '55rem',
  maxWidth: '85dvw',
  borderRadius: '1.5rem',
  flex: '6',
  backgroundColor: `${theme.palette.whites.main}`,
  [theme.breakpoints.down('sm')]: {
    maxWidth: '95vw',
  },
}));

const InnerContentGrid = styled(Grid)(({theme}) => ({
  width: '100%',
  minHeight: '20rem',
  height: '100%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  }
}));

export { MainContentArea, InnerContentGrid };