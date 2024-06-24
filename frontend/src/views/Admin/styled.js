import { 
  Box, 
  Button, 
  Card, 
  Container, 
  Grid, 
  IconButton, 
  Paper, 
  Tabs, 
  ToggleButton, 
  Typography, 
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

const CreditBalanceGridItem = styled(Grid)(({theme}) => ({
  ...theme.flexBox.justifyStartAlignCenter,
  width: '100%'
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

const InformationCard = styled(Card)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  width: '100%', 
  height: '100%',
  minHeight: '10rem',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row'
  }
}));

const ActiveOrderInfoCard = styled(Card)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  width: '100%', 
  height: '100%',
  minHeight: '10rem',
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }
}));

const CardGridContainer = styled(Grid)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))',
  gridGap: '1rem',
  width: '100%',
  minHeight: '13rem'
}));

const InfoGrid = styled(Grid)(() => ({
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  flexDirection: 'column',
  width: '100%', 
  height: '100%'
}));

const OrderItemTitleGridContainer = styled(Grid)(() => ({
  display: 'flex', 
  width: '100%', 
  margin: '0.5rem', 
  flexDirection: 'column',
}));

const OrderItemTitleGridItem = styled(Grid)(({theme}) => ({
  ...theme.flexBox.justifyStartAlignCenter,
  flex: '1', 
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center'
  }
}));

const OrderItemDetailsContainer = styled(Container)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  flexDirection: 'column', 
  marginBottom: '0.5rem',
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  }
}));

const CardImageGridContainer = styled(Grid)(() => ({
  display: 'flex', 
  justifyContent: 'space-evenly', 
  alignItems: 'center', 
  width: '100%'
}));

const CardInfoTypography = styled(Typography)(({theme}) => ({
  width: '100%', 
  textAlign: 'center',
  fontSize: '1.25rem',
  fontWeight: '500',
  fontFamily: `${theme.typography.secondary.fontFamily}`
}));

const AddInfoCard = styled(Card)(({ theme }) => ({
  ...theme.flexBox.justifyAlignCenter,
  margin: '1rem', 
}));

const AddInfoButton = styled(IconButton)(({theme}) => ({
  display: 'flex', 
  justifyContent: 'space-evenly', 
  width: '100%',
  height: '100%',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'column',
  }
}));

const DeleteButtonContainer = styled(Container)(() => ({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'flex-end',
  paddingRight: '0',
  top: '0',
  right: '0',
  zIndex: '20'
}));

const DeleteButton = styled(Button)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  width: '2rem',
  height: '2rem',
  borderRadius: '50%',
  backgroundColor: 'red',
  color: 'white',
  cursor: 'pointer',
  fontWeight: 'bold',
  minWidth: '0'
}));

const BaseButtonOption = styled(ToggleButton)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  flex: '1',
  height: '100%',
  width: '6rem',
  maxHeight: '250px',
  margin: '0',
  boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
  '&:hover': {
    backgroundColor: 'lightblue',
    cursor: 'pointer'
  }
}));

const LogosPlaceHolderTextContainer = styled(Container)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  width: '100%',
  textWrap: 'nowrap',
  color: 'gray',
  marginLeft: '1rem'
}));

const ButtonContainer = styled(Container)(({theme}) => ({
  position: 'relative',
  padding: '0.5rem',
  display: 'flex',
  width: '20rem',
  height: '20rem'
}));

const MenuOptionRow = styled(Grid)(({theme}) => ({
  ...theme.flexBox.justifyStartAlignCenter,
  flexDirection: 'column',
  height: '100%',
  overflow: 'scroll',
  scrollbarWidth: 'none',
  'msOverflowStyle': 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'transparent',
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
}));

const SecondaryTypography = styled(Typography)(({theme}) => ({
  fontFamily: `${theme.typography.secondary.fontFamily}`,
  [theme.breakpoints.down('md')]: {
    maxWidth: '80%',
  }
}));

const EditProfileInfoLabelTypography = styled(Typography)(({theme}) => ({
  fontFamily: `${theme.typography.secondary.fontFamily}`,
  flex: '1', 
  textAlign: 'left',
  [theme.breakpoints.down('md')]: {
    maxWidth: '80%',
    textAlign: 'center'
  }
}));

const EditProfileInfoContainer = styled(Container)(({theme}) => ({
  display: 'flex'                , 
  flexDirection: 'row'           , 
  width: '100%'                  , 
  justifyContent: 'space-between', 
  alignItems: 'center'           , 
  marginTop: '1rem'              ,
  padding: '0 1rem!important'    ,
  [theme.breakpoints.down('md')]: {
    padding: '0!important'
  }
}));

const SubscriptionStatusContainer = styled(Grid)(({theme}) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  padding: '0 1rem',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'space-between'
  }
}));

const OrderDetailsText = styled(Typography)(({theme}) => ({
  fontFamily: `${theme.typography.secondary.fontFamily}`,
  width: '100%',
  textAlign: 'right',
  [theme.breakpoints.down('md')]: {
    maxWidth: '80%',
    textAlign: 'center'
  }
}));

const AddButtonCard = styled(Button)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  width: '100%', 
  height: '100%', 
  minHeight: '5rem', 
  margin: '0.5rem', 
  fontFamily: `${theme.typography.secondary.fontFamily}`,
  backgroundColor: `${theme.palette.primary.main}`,
  color: 'white'
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

const ProfileInfoDetailsCard = styled(Card)(() => ({
  width: '100%', 
  marginTop: '1rem', 
  paddingTop: '1rem', 
  paddingBottom: '1rem', 
  borderRadius: '1rem', 
  marginBottom: '1rem',
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column'
}));

const ProfileWalletCard = styled(Card)(() => ({
  width: '100%', 
  marginTop: '1rem', 
  paddingTop: '1rem', 
  paddingBottom: '1rem', 
  borderRadius: '1rem', 
  marginBottom: '1rem'
}));

const ProfileWalletContainer = styled(Container)(() => ({
  display: 'flex'               , 
  flexDirection: 'column'       , 
  width: '100%'                 , 
  justifyContent: 'space-evenly', 
  alignItems: 'center'          , 
  padding: '1rem'               ,
  paddingBottom: '0'            ,
  // minHeight: '15rem'            ,
  marginBottom: '1rem'          ,
}));

const CreditBalanceGridContainer = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flex: '4',
}));

const CreditAdditionButtons = styled(Grid)(() => ({
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center',
  width: '100%',
  height: '100%'
}));

const DialogueSelectionHeaderGrid = styled(Grid)(({theme}) => ({
  ...theme.flexBox.justifyStartAlignCenter,
  flex: '1', 
  marginBottom: '1rem',
  width: '100%'
}));

export { 
  MainContentArea,
  MainContentAreaChildGrid,
  ProfileInfoDetailsCard,
  CreditBalanceGridItem,
  DialogueSelectionHeaderGrid,
  CreditAdditionButtons,
  CreditBalanceGridContainer,
  ProfileWalletContainer,
  ProfileWalletCard,
  CustomTabsComponent,
  AvatarContainer,
  TabsAndPanelsParentBox,
  InformationCard,
  InfoGrid,
  SubscriptionStatusContainer,
  OrderItemTitleGridContainer,
  OrderItemTitleGridItem,
  OrderItemDetailsContainer,
  CardImageGridContainer,
  CardInfoTypography,
  AddInfoCard,
  EditProfileInfoContainer,
  DeleteButtonContainer,
  DeleteButton,
  BaseButtonOption,
  LogosPlaceHolderTextContainer,
  ButtonContainer,
  MenuOptionRow,
  SecondaryTypography,
  EditProfileInfoLabelTypography,
  AddButtonCard,
  CardGridContainer,
  AddInfoButton,
  TabPanelChildrenContainer,
  ActiveOrderInfoCard,
  OrderDetailsText
};