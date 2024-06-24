import React, { 
  useEffect,
  useMemo,
  useRef, 
  useState 
} from 'react';
import { 
  Button,
  CircularProgress,
  Grid, 
  TextField, 
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { 
  CircularLoadingContainer, 
  ImageAreaGrid, 
  OrientationContainer, 
  PlaceArtNavigation, 
  PlacementBackButton, 
  SecondaryTypography, 
  SelectAndSaveContainer,
  TextSelectionGrid
} from './styled';
import { useDispatch, useSelector } from 'react-redux';
import 'react-image-crop/dist/ReactCrop.css';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { storeArtworkPlacement } from '../../actions/cartActions';
import { handleCombineBackgroundAndTextOverlay } from './helpers';
import { useToast } from '../../libs/toast';
import OptionMenu from './OptionMenu';
import { fontOptions } from '../../staticData/fontOptions';
import Moveable from 'react-moveable';

function ImagePlacementEditor({
  navigate,
  activeStep,
  artworkData,
  setArtworkData,
  artBasePrompt,
  setArtBasePrompt,
}) {

  const dispatch          = useDispatch()            ;
  const toast             = useToast()               ;
  const theme  = useTheme();

	const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const templateData         = useSelector((state) => state?.productInfo?.editProductTemplate)        ;

  const [displayedImage, setDisplayedImage]           = useState('')             ; 
  const [imageProcessing, setImageProcessing]         = useState()               ;
  const [selectedProductData, setSelectedProductData] = useState()               ;
  const [artworkPlacementDimensions, setArtworkPlacementDimenstion] = useState() ;
  const [textValue, setTextValue]                     = useState('')             ;
  const [fontFamily, setFontFamily]                   = useState('');
  const [overlayPosition, setOverlayPosition]         = useState({ x: 0, y: 0 }) ;
  const [imageScale, setImageScale]                   = useState(null);
  const [imageRotation, setImageRotation]             = useState(null);

  const templateRef      = useRef();
  const dragRef          = useRef();
  const resizeRef        = useRef();
  const printAreaRef     = useRef();
  const moveableRef = useRef();

  const handleSaveArtworkPlacedImage = (image) => {

    dispatch(
      storeArtworkPlacement(
        artworkData?.base64Image    ,
        selectedProductData?.variantId, 
        selectedProductData?.cartId   ,
        artworkPlacementDimensions    ,
        dispatch
      )
    ).then(() => {
      toast.success('Image Placements Complete!');
    });
  };

  const base64ToBlob = (base64, mime) => {
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mime});
}

  const handleCombineTextAndBackground = () => {
    // This breaks if the image isn't moved, resized, and rotated, mostly just if x/y aren't defined
    handleCombineBackgroundAndTextOverlay(
      artworkData.base64Image,
      displayedImage,
      {
        x: moveableRef.current.translate[0],
        y: moveableRef.current.translate[1],
        rotation: moveableRef.current.rotation,
        scale: moveableRef.current.scale
      }
    ).then(base64Image => {
      const imageBlob = base64ToBlob(base64Image, 'image/png');
      const imageUrl = URL.createObjectURL(imageBlob);
      console.log('Image URL:', imageUrl); // You can copy and paste this URL into a new browser tab to view the image
    
      // Optionally, open it directly in a new window:
      window.open(imageUrl, '_blank');
    }).catch(error => {
      console.error('Error combining images:', error);
    });
    
  };

  const handleDrag = (e) => {
    const { translate } = e;
    moveableRef.current.translate = translate;
    return e;
  };

  const handleScale = (e) => {
    const { scale } = e;
    moveableRef.current.scale = scale;
    return e;
  };

  const handleRotate = (e) => {
    const { rotation } = e;
    moveableRef.current.rotation = rotation;
    return e;
  };

  const getTypographyOptions = () => {
    return fontOptions;
  };

  const handleOptionChange = (font) => {
    setFontFamily(font);
  };

  const addMoreCredits = () => {
    navigate('/profile/info');
  };

  const getTextImageBase64 = ( text, font, width = 300, height = 300) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
  
    // Set text properties
    context.fillStyle = '#000'; // Text color
    context.font = `100px ${font}`; // Font size and face
    context.textAlign = 'center'; // Align text in the middle horizontally
    context.textBaseline = 'middle'; // Align text in the middle vertically

     // Function to wrap text and draw it on the canvas
    const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
      const words = text.split(' ');
      let line = '';

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, y);
    };

    // Calculate the line height based on font size; adjust as needed
    const lineHeight = 60; // Slightly larger than font size to avoid overlap
    wrapText(context, text, width / 2, height / 2 - lineHeight / 2, width * 0.9, lineHeight);

    // context.fillText(text, width / 2, height / 2); // Position to draw text
  
    return canvas.toDataURL('image/png'); // Get base64 URL of the image
  };

  useEffect(() => {
    if(fontFamily && textValue){
      setTimeout(setDisplayedImage(getTextImageBase64(textValue, fontFamily)), 1000);
    }
  }, [fontFamily, textValue]);

  const PlaceLogoWrapper = () => {

    if(!artworkData?.base64Image){
      return;
    };

    return (
      <div 
        style={{
          height          : "17rem", 
          width           : "17rem" , 
          position        : 'relative', 
          overflow        : 'hidden',
          backgroundImage : `url(${artworkData.base64Image ?? ''})`,
          backgroundSize  : 'cover'
        }}
      >
        {
          (textValue && fontFamily) && (
            <>
              <img 
                style = {{ 
                  width           : '75%', 
                  height          : '75%',
                  left            : 30,
                  right           : 0,
                  top             : 30,
                  position        : 'absolute',
                }}
                src={displayedImage}
                className='target'
              />
              <Moveable
                key={`${fontFamily}-${textValue}`}
                target={".target"}
                draggable={true}
                scalable={true}
                onDrag={handleDrag}
                onScale={handleScale}
                onScaleStart={e => {
                  e.setMinScaleSize([50, 50]);
                  e.setMaxScaleSize([500, 500]);
                }}
                onRender={e => {
                  e.target.style.cssText += e.cssText;
                }}
                rotatable={true}
                onRotateStart={e => {
                  e.setFixedDirection([-0.5, -0.5]);
                }}
                onRotate={e => {
                  e.target.style.transform = e.drag.transform;
                  handleRotate(e);
                }}
                ref = {moveableRef}

              />
            </>
          )
        }
      </div>
    )
  };

  const handleEditOptionsDisplay = () => {

    return (
      <Grid container sx={{height: '100%', width: '100%'}}>
        <SelectAndSaveContainer item>
          <PlaceArtNavigation container>
            <Grid item sx = {{ display: 'flex', flex: '1', justifyContent: 'flex-start', alignItems: 'center', height: '100%', width: '100%' }}>
              <PlacementBackButton 
                variant = 'contained'
                color   = 'secondary' 
                onClick = {() => navigate('/createTat/0')}
                sx={{padding: '2rem'}}
              >
                <ArrowBackIcon sx={{fontSize: '2rem', color: 'white'}} />
              </PlacementBackButton>
            </Grid>
            <Grid item sx={{flex: '3', width: '100%', height: '100%'}}>
            { imageProcessing ? 
              (
                <CircularLoadingContainer>
                  <CircularProgress 
                    color         = 'secondary' 
                    size          = {'2rem'} 
                    thickness     = {4} 
                    sx            = {{animationDuration: '550ms'}}
                    disableShrink

                  />
                </CircularLoadingContainer>
              ) : (
                <Button 
                  variant   = 'contained'
                  color     = 'secondary'
                  disabled  = {imageProcessing || !artworkData?.base64Image}
                  onClick   = {() => handleCombineTextAndBackground()}
                  sx={{cursor: 'pointer', width: '100%', height: '100%', borderRadius: '1rem'}}
                >
                  <SecondaryTypography>
                    {(textValue && fontFamily) ? 'Save Text Placement' : 'Skip Text Placement'}
                  </SecondaryTypography>
                </Button>
              )
            }
            </Grid>
          </PlaceArtNavigation>
        </SelectAndSaveContainer>
      </Grid>
    );
  };

  return (
    <Grid sx={{...theme.flexBox.justifyAlignCenter, flexDirection: 'column', minHeight: '100%', width: '100%'}}  container>
      <Grid sx={{flex: '0.5', width: '100%'}}>
        <TextField
          placeholder = 'Enter tattoo text here...'
          variant     = "outlined" 
          color       = 'secondary'
          sx          = {{ width: '100%'}}
          onChange    = {(e) => setTextValue(e.target.value)}
        />
      </Grid>
      <ImageAreaGrid>
        <PlaceLogoWrapper />
      </ImageAreaGrid>
      <TextSelectionGrid>
        <OptionMenu
          optionType          = "Logos"
          options             = { getTypographyOptions()}
          handleOptionChange  = { handleOptionChange  }
          addMoreCredits      = { addMoreCredits      }
          addRedirect         = { '/design/add-logo'  }
        />
      </TextSelectionGrid>
      <OrientationContainer item>
        { handleEditOptionsDisplay() }
      </OrientationContainer>
    </Grid>
  )
}

export default ImagePlacementEditor;