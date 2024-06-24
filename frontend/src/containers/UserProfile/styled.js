import { 
  Box,  
  Grid, 
  Paper, 
  styled 
} from "@mui/material";

const MainContentArea = styled(Paper)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  height: '100%',
  width: '100%',
  marginTop: '1rem',
  flexWrap: 'wrap',
  maxHeight: '80dvh'
}));

const AvatarContainer = styled(Grid)(({theme}) => ({
  ...theme.flexBox.justifyStartAlignCenter,
  flex: '0.5',
  backgroundColor: `${theme.palette.whites.main}`,
  padding: '0!important',
  width: '100%',
}));

const TabsAndPanelsParentBox = styled(Box)(({theme}) => ({
  display: 'flex', 
  flexDirection: 'column', 
  width: '100%', 
  flex: '4', 
  height: '100%',
  overflow: 'auto',
  backgroundColor: `${theme.palette.whites.main}`
}));

const MainContentAreaChildGrid = styled(Grid)(() => ({
  width: '100%'           , 
  height: '100%'          ,
  display: 'flex'         ,
  flexDirection: 'column' ,
  flexWrap: 'nowrap'      ,
}));

export { 
  MainContentArea,
  MainContentAreaChildGrid,
  AvatarContainer,
  TabsAndPanelsParentBox
};