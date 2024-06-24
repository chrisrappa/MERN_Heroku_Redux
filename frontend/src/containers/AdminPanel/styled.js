import { 
  Box, 
  Container, 
  Grid, 
  Paper, 
  Tabs, 
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

const CustomTabsComponent = styled(Tabs)(({theme}) => ({
  width: '100%',
  flex: '5',
  overflowX: 'auto',
  '.MuiTabs-scrollButtons': {
    color: `${theme.palette.primary.main}`
  },
  '.MuiTabs-scrollButtons.Mui-disabled': {
    opacity: 0.3
  },
  '& .Mui-selected': {
    color: `${theme.palette.secondary.main}!important`
  }
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

const TabPanelChildrenContainer = styled(Container)(({theme}) => ({
  height: '100%',
  [theme.breakpoints.down('md')]: {
    padding: '0!important'
  }
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
  CustomTabsComponent,
  TabsAndPanelsParentBox,
  TabPanelChildrenContainer,
  AvatarContainer
};