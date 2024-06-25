import React, { useState, useEffect, useMemo } from 'react';
import {
	useTheme,
	useMediaQuery,
	Typography,
	Avatar,
	IconButton,
	Divider,
	ListItem,
	ListItemButton,
	Box,
	Drawer,
	AppBar,
	Grid
} from '@mui/material';
import {
	DesktopDrawer,
	DesktopDrawerHeader,
	DrawerHeader,
	MobileTopToolbar,
	PrimaryTypography,
	UserProfilePictureButton
} from './styled';
import LoginButton from '../LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MobileDrawer from './MobileDrawer';
import DesktopUserFlowNav from './DesktopUserFlowNav';
import { saveUserInfo } from '../../actions/userActions';

function AppNavigation(props) {
	
	const theme 		=	useTheme();
	const dispatch 	=	useDispatch();
	const navigate 	= useNavigate();
	const { 
		user, 
		isAuthenticated, 
		getAccessTokenSilently,
		logout
	} = useAuth0();

	const userInfo = useSelector((state) => state?.userData?.loginInfo);

	// const iOS = process?.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
	const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
	const drawerWidth = 240;
	const { windowProps } = props;
	const container = windowProps !== undefined ? () => windowProps().document.body : undefined;
	
  const [open, setOpen] 													= useState(false)	;
	const [value, setValue]       									= useState(0)			;
	const [desktopDrawerOpen, setDesktopDrawerOpen] = useState(false) ;

	const handleDrawerToggle = () => {
    setOpen(!open);
  };

	const handleDesktopDrawerOpen = () => {
    setDesktopDrawerOpen(true);
  };

  const handleDesktopDrawerClose = () => {
    setDesktopDrawerOpen(false);
  };
	
	useMemo(() => {
		if(user){
			const getUserMetadata = async () => {
						
				const domain = "dev-q4q12mtcytgjyi8s.us.auth0.com";
		
				try {
					const accessToken = await getAccessTokenSilently({
						authorizationParams: {
							audience: `https://${domain}/api/v2/`,
							scope: "read:current_user",
						},
					});
		
					const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
					const metadataResponse = await fetch(userDetailsByIdUrl, {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					});
		
					const user_metadata = await metadataResponse.json();

					console.log('user_metadata', user_metadata);
					
					if(user_metadata){
						dispatch(saveUserInfo(user_metadata, dispatch));
					};
					
		
				} catch (e) {
					console.error('Error: ', e.message);
				}
			};

			getUserMetadata();

		};

	// eslint-disable-next-line
	}, [user]);

	useMemo(() => {
		if(window.location.pathname === '/' && (isAuthenticated)){
			navigate('/design');
		};

		//eslint-disable-next-line
	}, [window.location.pathname]);

	useEffect(() => {
		switch (window.location.pathname) {
			case '/':
				setValue(0)
				break;
			case '/create':
				setValue(1)
				break;
			case '/profile':
				setValue(2)
				break;
			default: return;
		}
	}, [value]);

	return (
		<Grid 
			container 
			sx={{
				flex: '1', 
				width: '5rem', 
				display: isAuthenticated ? 'flex' : 'none',
				backgroundColor: 'transparent',
				marginBottom: '3.75rem'
			}}
		>
			<AppBar position="fixed" open={open} elevation={0} sx={{backgroundColor: 'transparent'}}>
				<MobileTopToolbar disableGutters sx={{backgroundColor: 'transparent'}}>
					<Grid container sx={{ width: '100%' }}>
						<Grid 
							item 
							sx={{
								display: isMobile ? 'flex' : 'none', 
								flex: '1', 
								justifyContent: 'center'
							}}
						>
							<IconButton
								color='default'
								aria-label="open drawer"
								onClick={handleDrawerToggle}
								edge="start"
								sx={{
									// marginRight: 5,
									...(open && { display: 'none' }),
									display: isMobile ? 'block' : 'none',
								}}
							>
								<MenuIcon sx={{color: '#C6C6C6'}} />
							</IconButton>
						</Grid>
						<Grid 
							item 
							sx={{
								display: 'flex', 
								flex: isMobile ? '4' : '10', 
								justifyContent: 'flex-end', 
								marginRight: '1rem',
								alignItems: 'center'
							}}
						>
							<PrimaryTypography variant="h6" noWrap component="div" color="primary">
								GPT Organized
							</PrimaryTypography>
							<Typography 
								color={'secondary'} v
								ariant='h5' 
								sx={{
									fontWeight: '700', 
									marginLeft: '0.5rem'
								}}
							>
								Beta
							</Typography>
						</Grid>
					</Grid>
				</MobileTopToolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				<Drawer
					container={container}
					variant="temporary"
					open={open}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: `${theme.toolbars.mobileNav.backgroundColor}` },
					}}
				>
					<DrawerHeader>
						{
							isAuthenticated ? (
								<ListItem 
									sx={{
										display: 'flex', 
										justifyContent: 'flex-start',
										paddingLeft: '0.25rem',
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
									<Typography sx={{color: '#C6C6C6'}}>{userInfo?.name?.split(' ')[0]}</Typography>
								</ListItem>
							) : (
								<ListItem>
									<ListItemButton>
										<LoginButton />
									</ListItemButton>
								</ListItem>
							)
						}
						<IconButton onClick={handleDrawerToggle}>
							{theme.direction === 'rtl' ? <ChevronRightIcon sx={{color: '#C6C6C6'}} /> : <ChevronLeftIcon sx={{color: '#C6C6C6'}} />}
						</IconButton>
					</DrawerHeader>
					<MobileDrawer 
						open={open} 
						setOpen={setOpen} 
						logout={logout}
						isAuthenticated={isAuthenticated}
						isAdmin={userInfo?.isAdmin}
					/>
				</Drawer>
			</Box>
			{
				!isMobile && (
					<Box
						component="nav"
						sx={{ flexShrink: { sm: 0 }, height: '100%' }}
						aria-label="mailbox folders"
					>
						<DesktopDrawer
							variant="permanent"
							open={desktopDrawerOpen}
							bgColor={`${theme.toolbars.desktopNav.backgroundColor}`}
						>
							<DesktopDrawerHeader>
								{desktopDrawerOpen ? (
										<IconButton onClick={handleDesktopDrawerClose}>
											<ChevronLeftIcon sx={{color: '#C6C6C6'}} />
										</IconButton>
									) : (
										<IconButton onClick={handleDesktopDrawerOpen}>
											<ChevronRightIcon sx={{color: '#C6C6C6'}} />
										</IconButton>
									)
								}
							</DesktopDrawerHeader>
							<Divider />
							<DesktopUserFlowNav 
								logout={logout}
								open={desktopDrawerOpen}
								handleDesktopDrawerClose={handleDesktopDrawerClose}
								isAuthenticated={isAuthenticated}
								userInfo={userInfo}
								setOpen={setDesktopDrawerOpen}
							/>
						</DesktopDrawer>
					</Box>
				)
			}
		</Grid>
	)
}

export default AppNavigation;
