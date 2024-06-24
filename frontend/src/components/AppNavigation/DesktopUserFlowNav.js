import React from 'react';
import { 
  Avatar,
  Badge,
  Button,
  Grid,
  IconButton,
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { navigationOptions } from "./menuOptions";
import { Link, useNavigate } from 'react-router-dom';
import LoginButton from '../LoginButton';
import { UserProfilePictureButton } from './styled';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function DesktopUserFlowNav({
  logout,
  open,
  setOpen,
  isAuthenticated,
  userInfo
}){

  const navigate = useNavigate();

  const cartItems = useSelector((state) => state?.cartInfo.cartItems);

  return (
    <Grid 
      container 
      sx={{
        display: 'flex', 
        width: '100%', 
        justifyContent: 'space-between', 
        height: '75%'
      }}
    >
      <List 
        sx={{
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-start', 
          alignItems: 'center',
          width: '100%',
        }}
      >
        {
          navigationOptions.map((option, index) => (
            <ListItem 
              key={option?.id} 
              disablePadding 
              sx={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '4rem', 
                width: '100%!important'
              }}
            >
              <Tooltip title={option.name} placement='right'>
                <ListItemButton 
                  disableGutters 
                  component={Link}
                  to={option?.link}
                  onClick={() => setOpen(false)}
                  sx={{
                    height: '5rem',
                    width: '5rem', 
                    flex: '1',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                  }}
                >
                    <ListItemIcon 
                      sx={{
                        justifyContent: 'center', 
                        width: !open && '100%'
                      }}
                    >
                      {option?.name === "Cart" ?
                        <Badge badgeContent={cartItems.length} color="secondary">
                          {option?.icon}
                        </Badge> :
                        option?.icon
                      } 
                    </ListItemIcon>
                    <ListItemText
                      primary = {option?.name}
                      sx = {{
                        opacity: open ? 1 : 0,
                        flex: open ? '2' : '0',
                      }}
                    />
                
                </ListItemButton>
              </Tooltip>

            </ListItem>
          ))
        }
        {
					userInfo?.isAdmin && (
            <ListItem 
              key={100} 
              disablePadding 
              sx={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '4rem', 
                width: '100%!important'
              }}
            >
              <Tooltip title={'Admin'} placement='right'>
                <ListItemButton 
                  disableGutters 
                  component={Link}
                  to={'/admin'}
                  onClick={() => setOpen(false)}
                  sx={{
                    height: '5rem',
                    width: '5rem', 
                    flex: '1',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                  }}
                >
                    <ListItemIcon 
                      sx={{
                        justifyContent: 'center', 
                        width: !open && '100%'
                      }}
                    >

                      <Badge badgeContent={cartItems.length} color="secondary">
                        <AdminPanelSettingsIcon />
                      </Badge> 
                    </ListItemIcon>
                    <ListItemText
                      primary = {'Admin'}
                      sx = {{
                        opacity: open ? 1 : 0,
                        flex: open ? '2' : '0',
                      }}
                    />
                
                </ListItemButton>
              </Tooltip>

            </ListItem>
					)
				}
      </List>
      {
        isAuthenticated ? (
          <Grid sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%'}}>
            <ListItem 
              sx={{
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                flex: '1'
              }}
            >
              <UserProfilePictureButton 
                onClick={() => {
                  navigate('/profile/info');
                  setOpen(false)
                }}
              >
                <Avatar alt={userInfo?.name?.split('')[0]} src={userInfo?.picture} />
              </UserProfilePictureButton>
              <ListItemText 
                primary={'Profile'} 
                sx={{ 
                  opacity: open ? 1 : 0, 
                  flex: open ? '2' : '0',
                }} 
                component="a" 
                href={'/profile/info'}
              />
            </ListItem>
            <ListItem 
              sx={{
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                flex: '1'
              }}
            >
              {
                open ? (
                  <Button 
                    variant='contained'
                    color='secondary'
                    onClick={() => logout()}
                  >
                    Log Out
                  </Button>
                ) : (
                  <Tooltip title='Logout'>
                    <IconButton 
                      onClick={() => logout()}
                      sx={{
                        border: '1px solid gray'
                      }}
                    >
                      <LogoutIcon />
                    </IconButton>
                  </Tooltip>
                )
              }
            </ListItem>
            
          </Grid>
        ) : (
          <ListItem sx={{padding:'0!important'}}>
            <ListItemButton sx={{padding: '0!important'}}>
              <LoginButton />
            </ListItemButton>
          </ListItem>
        )
      }
    </Grid>
  )
};

export default DesktopUserFlowNav;