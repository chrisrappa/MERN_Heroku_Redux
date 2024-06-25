import React from 'react';
import { 
	Button,
  Divider, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
	useTheme
} from "@mui/material";
import { navigationOptions } from "./menuOptions";
import { Link } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function MobileDrawer({ 
	open, 
	setOpen, 
	logout,
	isAuthenticated,
	isAdmin
}){

	const theme = useTheme();

  return (
    <>
			<Divider />
			<List sx={{paddingTop: '0', display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
				{navigationOptions.map((option, index) => (
					<ListItem
						disablePadding 
						sx={{ display: 'block', flex: '1' }}
						component={Link}
						to={option?.link ?? '/'}
						key={option?.id}
						divider
						button
					>
						<ListItemButton
							onClick={() => setOpen(false)}
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5,
								height: '100%'
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center',
								}}
							>
								{option?.icon}
							</ListItemIcon>
							<ListItemText 
								primary={option?.name} 
								sx={{ 
									opacity: open ? 1 : 0, 
									fontFamily: `${theme.typography.secondary.fontFamily}`, 
									color: '#C6C6C6'
								}} 
							/>
						</ListItemButton>
					</ListItem>
				))}
				{
					isAdmin && (
						<ListItem
							disablePadding 
							sx={{ display: 'block', flex: '1' }}
							component={Link}
							to={'/admin'}
							key={100}
							divider
							button
						>
							<ListItemButton
								onClick={() => setOpen(false)}
								sx={{
									minHeight: 48,
									justifyContent: open ? 'initial' : 'center',
									px: 2.5,
									height: '100%'
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : 'auto',
										justifyContent: 'center',
									}}
								>
									<AdminPanelSettingsIcon />
								</ListItemIcon>
								<ListItemText 
									primary='Admin'
									sx={{ 
										opacity: open ? 1 : 0, 
										fontFamily: `${theme.typography.secondary.fontFamily}`,
										color: '#C6C6C6'
									}} 
								/>
							</ListItemButton>
						</ListItem>
					)
				}

				<ListItem sx={{flex: '6', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
					<Button 
						color="secondary" 
						onClick={() => logout()}
						sx={{display: isAuthenticated ? 'block' : 'none'}}
					>
						Log Out
					</Button>
				</ListItem>
			</List>
    </>
  )
};

export default MobileDrawer;