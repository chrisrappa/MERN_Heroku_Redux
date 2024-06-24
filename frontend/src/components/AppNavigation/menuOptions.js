import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export const navigationOptions = [
  {id: 1, name: "New Temp Tat", link: '/createTat/0', icon: <AutoAwesomeIcon sx={{fontSize: '1.5rem'}} />}, 
  // {id: 5, name: "Saved Tats", link: '/profile/saved-artwork', icon: <FolderSpecialIcon sx={{fontSize: '1.5rem'}} />}, 
  {id: 7, name: "Track Orders", link: '/profile/track-orders', icon: <LocalShippingIcon sx={{fontSize: '1.5rem'}} />},       
  {id: 9, name: "Cart", link: '/cart', icon: <ShoppingCartIcon sx={{fontSize: '1.5rem'}} />},       
  {id: 10, name: "Support", link: '/support', icon: <ContactSupportIcon sx={{fontSize: '1.5rem'}} /> }
];
