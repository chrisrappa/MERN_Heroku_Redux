import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FolderIcon from '@mui/icons-material/Folder';

export const navigationOptions = [
  {id: 1, name: "AI Chat", link: '/app-home', icon: <AutoAwesomeIcon sx={{fontSize: '1.5rem', color: '#C6C6C6'}} />}, 
  {id: 2, name: "Folders", link: '/folders', icon: <FolderIcon sx={{fontSize: '1.5rem', color: '#C6C6C6'}} />}, 
  {id: 10, name: "Support", link: '/support', icon: <ContactSupportIcon sx={{fontSize: '1.5rem', color: '#C6C6C6'}} /> }
];
