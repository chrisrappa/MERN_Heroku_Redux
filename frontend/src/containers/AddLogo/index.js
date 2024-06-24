import React, { 
  useEffect,
  useRef, 
  useState 
} from 'react';
import { 
  Box,
  Button,
  CircularProgress,
  Grid,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { 
  BaseButtonOption              ,
  ButtonContainer               ,
  CircularLoadingContainer      ,
  DeleteButton                  , 
  DeleteButtonContainer         ,
  LogosPlaceHolderTextContainer ,
  MenuOptionRow                 ,
  OrientationContainer          ,
  SecondaryTypography           ,
  SelectOptionNavigationButton
} from './styled';
import 'react-image-crop/dist/ReactCrop.css';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import { deleteLogoFromUser, uploadLogoToUser } from '../../actions/userActions.js';
import { storeImagesInCloudinary } from '../../helpers/dbImageSave.js';
import { useToast } from '../../libs/toast';

function AddLogo() {

  const dispatch  = useDispatch() ;
  const toast     = useToast()    ;

  const userId    = useSelector((state) => state?.userData?.loginInfo?.user_id);
  const userLogos = useSelector((state) => state?.userData?.loginInfo?.logos)  ;

  const [displayedImage, setDisplayedImage]          = useState('')   ;
  const [logoData, setLogoData]                      = useState('')   ;
  const [uploadingImage, setUploadingImage]          = useState(false);
  const [fileSizeError, setFileSizeError]            = useState(false);
  const [scrollRighDisabled, setScrollRightDisabled] = useState(false);
  const [isAtStart, setIsAtStart]                    = useState(true) ;

  const inputFileRef      = useRef(null);
  const menuOptionRowRef  = useRef(null);

  const handleUploadClick = () => {
    setDisplayedImage('');
    inputFileRef.current.click();
  };

  const handleSaveImageToDB = async() => {
    const { data: cloudinaryUrl } = await storeImagesInCloudinary(logoData, userId);

    dispatch(uploadLogoToUser(userId, cloudinaryUrl), dispatch)
    .then((response) => {
      if(response === 200){
        toast.success('Logo Uploaded');
      } else {
        toast.error(response);
      }
    });
  };

  const handleFileChange = (event) => {
    
    setFileSizeError(false);
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      const fileSizeLimit = 7 * 1024 * 1024; // 7MB
      if (file.size > fileSizeLimit) {
        // File size exceeds the limit
        console.error('File size exceeds the limit');
        setFileSizeError(true);
        setUploadingImage(false);
        return;
      };
  
      reader.onloadstart = () => {
        setUploadingImage(true);
      };

      reader.onload = (e) => {
        const uploadedImage = new Image();
  
        uploadedImage.onload = () => {
          const canvas = document.createElement('canvas');
          
          canvas.width = uploadedImage.width;
          canvas.height = uploadedImage.height;
  
          const context = canvas.getContext('2d');
  
          context.drawImage(
            uploadedImage       , 
            0                   , 
            0                   ,     
            uploadedImage.width , 
            uploadedImage.height
          );
  
          const uploadedBase64Image = canvas.toDataURL();
          const imageSize = uploadedBase64Image.length - 'data:image/png;base64,'.length;

          if (imageSize > fileSizeLimit) {

            setFileSizeError(true);
            setUploadingImage(false);
            return;
          } else {
            setDisplayedImage(uploadedBase64Image);
            setLogoData(uploadedBase64Image);
            setUploadingImage(false);
          };
        };
  
        uploadedImage.src = e.target.result;
      };
  
      reader.readAsDataURL(file);
    }

    setUploadingImage(false);
  };

  const handleDeleteLogo = (option) => {
    dispatch(
      deleteLogoFromUser(userId, option?.cloudinaryUrl, dispatch)
    ).then((response) => {
      if(response === 200){
        toast.success('Logo Deleted!');
      } else {
        toast.error(response);
      }
    })
  };

  useEffect(() => {
    const container = menuOptionRowRef.current;
    if (container) {
      const isOverflowing = container.scrollWidth > container.clientWidth;
      setScrollRightDisabled(!isOverflowing);
    }
  }, [userLogos]);

  const ComponentWithDirectionalButtons = () => {

  const handleScroll = () => {
    const scrollLeft = menuOptionRowRef.current.scrollLeft;
    setIsAtStart(scrollLeft === 0);
  };

  const handleScrollLeft = () => {
    menuOptionRowRef.current.scrollBy({ 
      left: -150, behavior: 'smooth' 
    });
  };

  const handleScrollRight = () => {
    menuOptionRowRef.current.scrollBy({ 
      left: 150, behavior: 'smooth' 
    });
  };

    return (
      <Box position="relative" maxWidth="100%" sx={{width: '100%'}}>
        <SelectOptionNavigationButton 
          variant="contained"
          color='secondary'
          sx={{  left: '2%' }} 
          disabled={isAtStart}
          onClick={handleScrollLeft}
        >
          <KeyboardArrowLeftIcon />
        </SelectOptionNavigationButton>
        
        <MenuOptionRow item ref={menuOptionRowRef} onScroll={handleScroll}>
          {
            userLogos?.length ? (
              userLogos?.map((option, key) => (
                <ButtonContainer key={key}>
                  <DeleteButtonContainer>
                    <DeleteButton
                      onClick={() => {handleDeleteLogo(option)}}
                    >
                      X
                    </DeleteButton>
                  </DeleteButtonContainer>
                  <BaseButtonOption
                    value={option?.value}
                    disabled
                  >
                    <img style={{height: '5rem', width: '5rem'}} src={option?.cloudinaryUrl} alt="" />
                  </BaseButtonOption>
                </ButtonContainer>
              )) 
            ) : (
              <LogosPlaceHolderTextContainer>
                <SecondaryTypography>Saved Logos Will Show Here</SecondaryTypography>
              </LogosPlaceHolderTextContainer>
            )
          }
        </MenuOptionRow>        
        <SelectOptionNavigationButton 
          variant="contained" 
          color='secondary'
          sx={{ right: '2%' }}
          onClick={handleScrollRight} 
          disabled={scrollRighDisabled}
        >
          <KeyboardArrowRightIcon />
        </SelectOptionNavigationButton>
      </Box>
    );
  };

  const handleImageAreaDisplay = () => {
    if(displayedImage){
      return (
        <img
          src={displayedImage}
          alt="Existing"
          id="existing-image"
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            maxWidth: '20rem',
            maxHeight: '20rem'
          }}
        />
      )
    };

    if(!displayedImage && !uploadingImage){
      return (
        <WallpaperIcon 
          sx={{
            fontSize: '20rem', 
            color: 'rgba(203,203,203, 0.75)',
          }} 
        />
      )
    };

    if(uploadingImage){
      return (
        <CircularLoadingContainer>
          <CircularProgress 
            color='secondary' 
            size={'10rem'} 
            thickness={4} 
            disableShrink
            sx={{animationDuration: '550ms'}}
          />
        </CircularLoadingContainer>
      )
    }
  };

  return (
    <Grid 
      container 
      sx={{
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-evenly'
      }}
    >
      <Grid
        sx={{
          display: 'flex',
          flex: '1',
          width: '100%',
        }}
      > 
        <ComponentWithDirectionalButtons />
      </Grid>
      
      <Grid 
        item 
        sx={{
          flex: '3', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '1rem'
        }}
      >
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={inputFileRef}
          onChange={(e) => {
            setUploadingImage(true);
            handleFileChange(e);
          }}
        />
        { handleImageAreaDisplay() }
      </Grid>
      <Grid 
        item 
        sx={{
          display: 'flex', 
          flex: '0.1', 
          justifyContent: 'center', 
          alignItems: 'center'
        }}
      >
          {
            fileSizeError ? (
              <SecondaryTypography sx={{color: 'red'}}>
                File Size Too Large
              </SecondaryTypography>
            ) : (
              <SecondaryTypography>
                Max file size is 7mb
              </SecondaryTypography>
            )
          }
      </Grid>
      <OrientationContainer item>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleUploadClick}
        >
          <SecondaryTypography>
            Upload Image
          </SecondaryTypography>
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleSaveImageToDB()}
          disabled={!displayedImage}
        >
          <SecondaryTypography>
            Save Image
          </SecondaryTypography>
        </Button>
      </OrientationContainer>
    </Grid>
  )
}

export default AddLogo;