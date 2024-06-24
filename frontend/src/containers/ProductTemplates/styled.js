import { 
  Grid,
  Container, 
  styled,
  Button, 
} from "@mui/material";

const FocusedWorkContainer = styled(Grid)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  flex: '1',
}));

const CircularLoadingContainer = styled(Container)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  height: '100%', 
  width: '100%', 
}));

const TemplateCardContainer = styled(Grid)(({theme}) => ({
  ...theme.flexBox.justifyStartAlignCenter,
  height: '100%', 
  width: '100%',
  flexDirection: 'row', 
  flexWrap: 'wrap',
  maxWidth: 'none!important',
  overflow: 'scroll',
  boxShadow: 'inset 0 0 10px #f8a100'
}));

const SelectOptionNavigationButton = styled(Button)(() => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  zIndex: '20',
  minWidth: '0'
}));

const MenuOptionRow = styled(Grid)(({theme}) => ({
  ...theme.flexBox.justifyStartAlignCenter,
  flex: '3',
  height: '100%',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  minHeight: '13rem',
  '-ms-overflow-style': 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'transparent',
  },
  padding: '0 3rem',
  boxShadow: `inset 0 0 5px 5px rgba(203,203,203, 0.75)`, 
  borderRadius: '1rem'
}));

const HeaderContainer = styled(Grid)(({theme}) => ({
  ...theme.flexBox.justifyStartAlignCenter,
  flex: '0.25'
}));

const OptionSectionContainer = styled(Grid)(() => ({
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start'
}));

const CardGridContainer = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  padding: '1rem',
}));

const CardIconContainer = styled(Grid)(() => ({
  position: 'absolute', 
  top: '0', 
  right: '0',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '100%',
  marginTop: '0.5rem',
  marginRight: '0.5rem'
}));

const CardImageContainer = styled(Grid)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  flex: '3'
}));

const ParentContainer = styled(Grid)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  flexDirection: 'column',
  maxHeight: '90dvh',
  width: '100%',
  marginTop: '1rem',
  flexWrap: 'nowrap',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    marginTop: `${theme.toolbars.mobileTopToolbar.height}`
  }
}));

export {
  FocusedWorkContainer,
  CircularLoadingContainer,
  TemplateCardContainer,
  SelectOptionNavigationButton,
  MenuOptionRow,
  HeaderContainer,
  OptionSectionContainer,
  CardGridContainer,
  CardIconContainer,
  CardImageContainer,
  ParentContainer
}