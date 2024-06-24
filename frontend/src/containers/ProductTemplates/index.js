import React, 
{ 
  useEffect, 
  useMemo, 
  useRef, 
  useState 
} from 'react';
import { 
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CircularProgress, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  FormControl, 
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { 
  CardGridContainer, 
  CardIconContainer, 
  CardImageContainer, 
  HeaderContainer, 
  MenuOptionRow, 
  OptionSectionContainer, 
  ParentContainer, 
  SelectOptionNavigationButton, 
} from './styled';
import { useToast } from '../../libs/toast';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloudSyncIcon from '@mui/icons-material/CloudSync'; 
import SyncIcon from '@mui/icons-material/Sync';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Cancel } from '@mui/icons-material';

function ProductTemplates() {

  const dispatch = useDispatch();
  const toast    = useToast()   ;
  const syncedTemplatesRef  = useRef(null);
  const templateDraftsRef  = useRef(null);

  const userInfo = useSelector((state) => state?.userData?.loginInfo);

  const [scrollRighSyncedDisabled, setScrollRightSyncedDisabled] = useState(false);
  const [scrollRighTemplateDisabled, setScrollRightTemplateDisabled] = useState(false);
  const [isAtStartSyncedTemplates, setIsAtStartSyncedTemplates] = useState(true) ;
  const [isAtStartTemplateDrafts, setIsAtStartTemplateDrafts] = useState(true) ;
  const [shopIdInputOpen, setShopIdInputOpen] = useState(false);
  const [shopDomain, setShopDomain] = useState('');
  const [selectedView, setSelectedView] = useState('drafts');

  const viewOptions = [
    'drafts',
    'internal',
    'storefront'
  ];

  const syncedTemplates = [1, 2, 3, 4, 5];
  const templateDrafts = [1, 2, 3, 4, 5];
  const internalProducts = [1, 2, 3, 4, 5];

  const handleSyncedTemplateScroll = () => {
    const scrollLeft = syncedTemplatesRef.current.scrollLeft;
    setIsAtStartSyncedTemplates(scrollLeft === 0);
  };

  const handleTemplateDraftScroll = () => {
    const scrollLeft = templateDraftsRef.current.scrollLeft;
    setIsAtStartTemplateDrafts(scrollLeft === 0);
  };

  const handleScrollLeftSyncedTemplates = () => {
    syncedTemplatesRef.current.scrollBy({ 
      left: -150, behavior: 'smooth' 
    });
  };

  const handleScrollRightSyncedTemplates = () => {
    syncedTemplatesRef.current.scrollBy({ 
      left: 150, behavior: 'smooth' 
    });
  };

  const handleScrollLeftTemplateDrafts = () => {
    templateDraftsRef.current.scrollBy({ 
      left: -150, behavior: 'smooth' 
    });
  };

  const handleScrollRightTemplateDrafts = () => {
    templateDraftsRef.current.scrollBy({ 
      left: 150, behavior: 'smooth' 
    });
  };

  const handleSyncShopifyProducts = () => {
    // Assuming you have a function to get the current user's shop domain
    const authUrl = `${process.env.REACT_APP_API_PATH}api/shopify/auth?shop=${shopDomain}`;
    window.location.href = authUrl; // Redirect the user to your Node.js server route
  };

  const handleShopDomainChange = (event) => {
    setShopDomain(event.target.value);
  };

  const handleMenuView = () => {
    switch(selectedView){
      case 'drafts':
        return (
          <OptionSectionContainer container>
            <HeaderContainer item>
              <Typography variant='h5'>Product Drafts</Typography>
            </HeaderContainer>
            <Box position="relative" maxWidth="90dvw" sx={{width: '90dvw'}}>
              <SelectOptionNavigationButton 
                variant="contained"
                color='secondary'
                sx={{  left: '1%' }} 
                disabled={isAtStartTemplateDrafts}
                onClick={handleScrollLeftTemplateDrafts}
              >
                <KeyboardArrowLeftIcon />
              </SelectOptionNavigationButton>

              <MenuOptionRow 
                item
                onScroll={handleTemplateDraftScroll}
                ref={templateDraftsRef}
              >
                {
                  templateDrafts.map((index) => (
                    <Card 
                      sx={{
                        position: 'relative',
                        margin: '1rem',
                        minWidth: 'fit-content',
                      }}
                    >
                      <CardGridContainer container>
                        <CardIconContainer item >
                          <IconButton 
                            sx={{
                              backgroundColor: 'gray', 
                              color: 'white', 
                              marginRight: '0.5rem'
                            }}
                          >
                            <CloudSyncIcon />
                          </IconButton>
                          <IconButton 
                            sx={{
                              backgroundColor: 'gray', 
                              color: 'white', 
                              marginRight: '0.5rem'
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            sx={{
                              backgroundColor: 'gray', 
                              color: 'white'
                            }}
                          >
                            <InfoIcon />
                          </IconButton>
                          {/* This is pencil and info button, absolute position */}
                        </CardIconContainer>
                        <CardImageContainer item>
                          <img src='https://res.cloudinary.com/djrbfvpit/image/upload/v1709510964/upqfafzdgayhij2rkphy.jpg' alt='product and mockup' style={{border: '1px solid lightgray'}} height={150} width={150}/>
                        </CardImageContainer>
                        <Grid item sx={{ flex: '1' }}>
                          <Typography>$XX.XX ea.</Typography>
                          <Typography>Variant Name & Info</Typography>
                        </Grid>
                      </CardGridContainer>
                    </Card>
                  ))
                }

              </MenuOptionRow>

              <SelectOptionNavigationButton 
                variant="contained" 
                color='secondary'
                sx={{ right: '1%' }}
                onClick={handleScrollRightTemplateDrafts} 
                disabled={scrollRighTemplateDisabled}
              >
                <KeyboardArrowRightIcon />
              </SelectOptionNavigationButton>
            </Box>
          </OptionSectionContainer>

        );
      case 'internal': 
        return (
          <OptionSectionContainer container>
            <HeaderContainer item>
              <Typography variant='h5'>Internal Products</Typography>
            </HeaderContainer>
            <Box position="relative" maxWidth="90dvw" sx={{width: '90dvw'}}>
              <SelectOptionNavigationButton 
                variant="contained"
                color='secondary'
                sx={{  left: '1%' }} 
                disabled={isAtStartSyncedTemplates}
                onClick={handleScrollLeftSyncedTemplates}
              >
                <KeyboardArrowLeftIcon />
              </SelectOptionNavigationButton>

              <MenuOptionRow 
                item
                onScroll={handleSyncedTemplateScroll}
                ref={syncedTemplatesRef}
              >
                {
                  internalProducts?.map((product) => (
                    <Card 
                      sx={{
                        position: 'relative',
                        margin: '1rem',
                        minWidth: 'fit-content',
                      }}
                    >
                      <CardGridContainer container>
                        <CardIconContainer item >
                          <IconButton 
                            sx={{
                              backgroundColor: 'gray', 
                              color: 'white',
                              marginRight: '0.5rem'
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            sx={{
                              backgroundColor: 'gray', 
                              color: 'white'
                            }}
                          >
                            <InfoIcon />
                          </IconButton>
                          {/* This is pencil and info button, absolute position */}
                        </CardIconContainer>
                        <CardImageContainer item>
                          <img src='https://res.cloudinary.com/djrbfvpit/image/upload/v1709510964/upqfafzdgayhij2rkphy.jpg' alt='product and mockup' style={{border: '1px solid lightgray'}} height={150} width={150}/>
                        </CardImageContainer>
                        <Grid item sx={{ flex: '1' }}>
                          <Typography>$XX.XX ea.</Typography>
                          <Typography>Variant Name & Info</Typography>
                        </Grid>
                      </CardGridContainer>
                    </Card>
                  ))
                }
              </MenuOptionRow>

              <SelectOptionNavigationButton 
                variant="contained" 
                color='secondary'
                sx={{ right: '1%' }}
                onClick={handleScrollRightSyncedTemplates} 
                disabled={scrollRighSyncedDisabled}
              >
                <KeyboardArrowRightIcon />
              </SelectOptionNavigationButton>
            </Box>
            
          </OptionSectionContainer>

        );
      case 'storefront':
        return (
          <OptionSectionContainer container>
            <HeaderContainer item>
              <Typography variant='h5'>Storefront Products</Typography>
              {
                userInfo?.shopifyAccessToken && (
                  <Button 
                    variant='contained'
                    color='secondary'
                    sx={{marginLeft: '1rem'}}
                  >
                    <SyncIcon sx={{marginRight: '0.5rem'}} />
                    Update from Shopify
                  </Button>
                )
              }
            </HeaderContainer>
            <Box position="relative" maxWidth="90dvw" sx={{width: '90dvw'}}>
              <SelectOptionNavigationButton 
                variant="contained"
                color='secondary'
                sx={{  left: '1%' }} 
                disabled={isAtStartSyncedTemplates}
                onClick={handleScrollLeftSyncedTemplates}
              >
                <KeyboardArrowLeftIcon />
              </SelectOptionNavigationButton>

              <MenuOptionRow 
                item
                onScroll={handleSyncedTemplateScroll}
                ref={syncedTemplatesRef}
              >
                {
                  userInfo?.shopifyAccessToken ? (
                    syncedTemplates.map((index) => (
                      <Card 
                        sx={{
                          position: 'relative',
                          margin: '1rem',
                          minWidth: 'fit-content',
                        }}
                      >
                        <CardGridContainer container>
                          <CardIconContainer item >
                            <IconButton 
                              sx={{
                                backgroundColor: 'gray', 
                                color: 'white',
                                marginRight: '0.5rem'
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton 
                              sx={{
                                backgroundColor: 'gray', 
                                color: 'white'
                              }}
                            >
                              <InfoIcon />
                            </IconButton>
                            {/* This is pencil and info button, absolute position */}
                          </CardIconContainer>
                          <CardImageContainer item>
                            <img src='https://res.cloudinary.com/djrbfvpit/image/upload/v1709510964/upqfafzdgayhij2rkphy.jpg' alt='product and mockup' style={{border: '1px solid lightgray'}} height={150} width={150}/>
                          </CardImageContainer>
                          <Grid item sx={{ flex: '1' }}>
                            <Typography>$XX.XX ea.</Typography>
                            <Typography>Variant Name & Info</Typography>
                          </Grid>
                        </CardGridContainer>
                      </Card>
                    ))
                  ) : (
                    <Grid 
                      container 
                      sx={{
                        width: '100%', 
                        height: '100%', 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Button 
                        variant='outlined' 
                        color='secondary'
                        onClick={() => setShopIdInputOpen(true)}
                      >
                        Connect to Shopify Store
                      </Button>
                      <Dialog open={shopIdInputOpen}>
                        
                        <DialogTitle id="shop-domain-dialog-title">
                          Enter Your Shopify Shop Domain
                          <IconButton
                            aria-label="close"
                            onClick={() => setShopIdInputOpen(false)}
                            sx={{
                              position: 'absolute',
                              right: 8,
                              top: 8,
                              color: (theme) => theme.palette.grey[500],
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </DialogTitle>
                        <DialogContent dividers>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="shop-domain"
                            label="Shopify Shop Domain"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={shopDomain}
                            onChange={handleShopDomainChange}
                            color='secondary'
                          />
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography>Instructions</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography variant='body1'>
                                How to Find Your Shopify Shop Domain:
                              </Typography>
                              <Typography variant='body2'>
                                1. Log in to your Shopify admin panel.                     <br />
                                2. Go to Settings.                                         <br />
                                3. Look for the Store details section.                     <br />
                                4. Your shop domain is listed under the Store information. <br />
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleSyncShopifyProducts} variant='contained' color='secondary'>Submit</Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  )
                }

              </MenuOptionRow>

              <SelectOptionNavigationButton 
                variant="contained" 
                color='secondary'
                sx={{ right: '1%' }}
                onClick={handleScrollRightSyncedTemplates} 
                disabled={scrollRighSyncedDisabled}
              >
                <KeyboardArrowRightIcon />
              </SelectOptionNavigationButton>
            </Box>
            
          </OptionSectionContainer>

        );
      default: return (
        <OptionSectionContainer container>
          <HeaderContainer item>
            <Typography variant='h5'>Product Drafts</Typography>
          </HeaderContainer>
          <Box position="relative" maxWidth="90dvw" sx={{width: '90dvw'}}>
            <SelectOptionNavigationButton 
              variant="contained"
              color='secondary'
              sx={{  left: '1%' }} 
              disabled={isAtStartTemplateDrafts}
              onClick={handleScrollLeftTemplateDrafts}
            >
              <KeyboardArrowLeftIcon />
            </SelectOptionNavigationButton>

            <MenuOptionRow 
              item
              onScroll={handleTemplateDraftScroll}
              ref={templateDraftsRef}
            >
              {
                templateDrafts.map((index) => (
                  <Card 
                    sx={{
                      position: 'relative',
                      margin: '1rem',
                      minWidth: 'fit-content',
                    }}
                  >
                    <CardGridContainer container>
                      <CardIconContainer item >
                        <IconButton 
                          sx={{
                            backgroundColor: 'gray', 
                            color: 'white', 
                            marginRight: '0.5rem'
                          }}
                        >
                          <CloudSyncIcon />
                        </IconButton>
                        <IconButton 
                          sx={{
                            backgroundColor: 'gray', 
                            color: 'white', 
                            marginRight: '0.5rem'
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          sx={{
                            backgroundColor: 'gray', 
                            color: 'white'
                          }}
                        >
                          <InfoIcon />
                        </IconButton>
                        {/* This is pencil and info button, absolute position */}
                      </CardIconContainer>
                      <CardImageContainer item>
                        <img src='https://res.cloudinary.com/djrbfvpit/image/upload/v1709510964/upqfafzdgayhij2rkphy.jpg' alt='product and mockup' style={{border: '1px solid lightgray'}} height={150} width={150}/>
                      </CardImageContainer>
                      <Grid item sx={{ flex: '1' }}>
                        <Typography>$XX.XX ea.</Typography>
                        <Typography>Variant Name & Info</Typography>
                      </Grid>
                    </CardGridContainer>
                  </Card>
                ))
              }

            </MenuOptionRow>

            <SelectOptionNavigationButton 
              variant="contained" 
              color='secondary'
              sx={{ right: '1%' }}
              onClick={handleScrollRightTemplateDrafts} 
              disabled={scrollRighTemplateDisabled}
            >
              <KeyboardArrowRightIcon />
            </SelectOptionNavigationButton>
          </Box>
        </OptionSectionContainer>

      );
    }
  };

  useEffect(() => {
    const syncedTemplatesContainer = syncedTemplatesRef.current;
    const templateDraftsContainer = templateDraftsRef.current;

    if (syncedTemplatesContainer) {
      const isOverflowing = syncedTemplatesContainer.scrollWidth > syncedTemplatesContainer.clientWidth;
      setScrollRightSyncedDisabled(!isOverflowing);
    }

    if (templateDraftsContainer) {
      const isOverflowing = templateDraftsContainer.scrollWidth > templateDraftsContainer.clientWidth;
      setScrollRightTemplateDisabled(!isOverflowing);
    }
  }, [syncedTemplates, templateDrafts]);

  return (
    <ParentContainer>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label" color='secondary'>Product View</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={selectedView}
          onChange={(e) => setSelectedView(e.target.value)}
          input={<OutlinedInput color='secondary' label="Product View" />}
        >
          {viewOptions.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      { handleMenuView() }
      <Grid container sx={{height: '100%', width: '100%', border: '1px solid lightgray'}}>
        <Typography>
          Product Details
        </Typography>
      </Grid>
    </ParentContainer>
  )
}

export default ProductTemplates;