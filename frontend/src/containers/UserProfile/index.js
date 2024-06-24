import React from 'react'
import { useSelector } from 'react-redux';
import { 
  AvatarContainer               , 
  MainContentArea               ,   
  MainContentAreaChildGrid,   
  TabsAndPanelsParentBox 
} from './styled';
import { 
  Avatar        , 
  Typography 
} from '@mui/material';


function UserProfile() {


  const userInfo = useSelector((state) => state.userData.loginInfo);
  
  return (
    <MainContentArea elevation={0}>
      <MainContentAreaChildGrid container >
        <AvatarContainer container>
          <Avatar sx={{margin: '1rem'}} alt={userInfo?.name} src={userInfo?.picture} />
          <Typography>{userInfo?.name}</Typography>
        </AvatarContainer>
        <TabsAndPanelsParentBox>

        </TabsAndPanelsParentBox>
      </MainContentAreaChildGrid>
    </MainContentArea>
  );
}

export default UserProfile;