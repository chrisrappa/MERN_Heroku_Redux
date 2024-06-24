import { 
  styled,
  ListItemIcon,
  Menu,
  Button,
  Typography,
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  AppBar,
  Toolbar
} from "@mui/material";

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const UserProfilePictureButton = styled(ListItemIcon)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  '&:hover': {
    cursor: 'pointer'
  },
}));

const UserAccountDropdown = styled(Menu)(() => ({
  overflow: 'visible',
  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
  mt: 1.5,
  '& .MuiAvatar-root': {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1,
  },
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    bgcolor: 'background.paper',
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 0,
  },
}));

const MobileUserFlowButtons = styled(Button)(({theme}) => ({
  flex: '1', 
  margin: '0.5rem', 
  borderRadius: '1rem', 
  padding: '0, 1rem',
  [theme.breakpoints.up('md')]: {
    width: '6rem'
  },
  [theme.breakpoints.down('md')]: {
    width: '5.25rem'
  }
}));

const SecondaryTypography = styled(Typography)(({theme}) => ({
  color: 'white',
  fontFamily: `${theme.typography.secondary.fontFamily}`
}));

const PrimaryTypography = styled(Typography)(({theme}) => ({
  fontFamily: `${theme.typography.primary.fontFamily}`,
  fontSize: '1.5rem'
}));

const drawerWidth = 200;

export const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

export const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: '5rem'
});

const DesktopDrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DesktopAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DesktopDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    display: { xs: 'none', sm: 'flex' },
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    zIndex: theme.zIndex.drawer + 1,
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const MobileBottomAppBar = styled(AppBar)(({theme}) => ({
  top: 'auto', 
  bottom: 0,  
  backgroundColor: 'rgba(19,21,21, 0.75)', 
  height: `${theme.toolbars.mobileNav.height}`, 
  maxHeight: '-webkit-fill-available'
}));

const MobileTopToolbar = styled(Toolbar)(({theme}) => ({
  display: 'flex', 
  width: '100%', 
  justifyContent: 'space-between', 
  alignItems: 'center',
  backgroundColor: `${theme.palette.whites.main}`,
  [theme.breakpoints.down('md')]: {
    maxHeight: `${theme.toolbars.mobileTopToolbar.height}`
  }
}));

export {
  DrawerHeader,
  UserProfilePictureButton,
  UserAccountDropdown,
  MobileUserFlowButtons,
  SecondaryTypography,
  PrimaryTypography,
  DesktopDrawerHeader,
  DesktopAppBar,
  DesktopDrawer,
  MobileBottomAppBar,
  MobileTopToolbar
};