import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { portraitDimensionOptions } from '../../staticData/sizeOptions';
import { makeMediaModifierMockup } from '../../actions/mediaModifierActions';
import { stickerTemplate } from '../../staticData/mediaModifierTemplates';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


function MockupGenerator(){

  const originalGenImage = useSelector((state) => state?.stepData?.currentInfo?.artworkProps?.base64Image);
  const logoCombinedImage = useSelector((state) => state?.stepData?.currentInfo?.artworkProps?.imageWithOverlay);
  const cartItems = useSelector((state) => state?.cartInfo?.cartItems);

  const [imageDimensions, setImageDimensions] = useState('');

  const getBase64ImageDimensions = (base64Image) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
  
      img.onload = function () {
        const width = img.width;
        const height = img.height;
        resolve({ width, height });
      };
  
      img.onerror = function () {
        reject(new Error("Invalid image"));
      };
  
      img.src = base64Image;
    });
  };
  
  const handleGetImageDimensions = () => {
    if(logoCombinedImage){
      getBase64ImageDimensions(logoCombinedImage)
      .then(({ width, height }) =>
        setImageDimensions({height: height, width: width})
      )
      .catch((error) => console.error(error));
    } else {
      getBase64ImageDimensions(originalGenImage)
      .then(({ width, height }) =>
        setImageDimensions({height: height, width: width})
      )
      .catch((error) => console.error(error));
    }
  };
  
  const handleImageForMockup = () => {
    if(logoCombinedImage){
      
      return logoCombinedImage;
    };
  
    return originalGenImage;
  };
  
  const imageForMockup = handleImageForMockup();
  
  const runMockupGenerator = (productInfo) => {
  
    switch(productInfo?.id){
      case 358:
        dispatch(
          makeMediaModifierMockup(
            stickerTemplate, 
            imageForMockup,
            imageDimensions,
            productInfo,
            dispatch
          )
        );
      break;
      default: return;
    }
  };
  
  useMemo(() => {
    handleGetImageDimensions();
  }, []);

  // const handleMockupContainerDisplay = () => {

  //   if(submittingMockupRequest){

  //     return (
  //       <CircularLoadingContainer>
  //         <CircularProgress color='primary' size={'10rem'}/>
  //         <Typography>Generating Product Mockup</Typography>
  //       </CircularLoadingContainer>
  //     )
  //   }

  //   if(displayedMockup){
  //     return (
  //       <Fade in>
  //         <img 
  //           src={displayedMockup} 
  //           alt="Image Generation" 
  //           styled={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover'}}
  //         />
  //       </Fade>
  //     )
  //   }

  //   return (
  //     <Container>
  //       <Typography>
  //         There was a problem generating this mockup.
  //         Please try refreshing the page.
  //       </Typography>
  //     </Container>
  //   )
    
  // }

  // <ImageButton
  //   focusRipple
  //   key={index?.product?.id}
  //   style={{
  //     width: '50%',
  //   }}
  //   onClick={() => {
  //     setSelectedProduct(index);
  //     setSubmittingMockupRequest(true);
  //     setDisplayedMockup(undefined);
  //   }}
  //   disabled={submittingMockupRequest}
  // >
  //   <ImageSrc style={{ backgroundImage: `url(${index?.product?.image})` }} />
  //   <ImageBackdrop className="MuiImageBackdrop-root" />
  //   <Image>
  //     <Typography
  //       component="span"
  //       variant="subtitle1"
  //       color="inherit"
  //       sx={{
  //         position: 'relative',
  //         p: 4,
  //         pt: 2,
  //         pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
  //       }}
  //     >
  //       {index?.product?.model}
  //       <ImageMarked className="MuiImageMarked-root" />
  //     </Typography>
  //   </Image>
  // </ImageButton>

  return (
    <Container 
      sx={{
        minHeight: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        flexGrow: '1'
      }}
    >
      { 
        (cartItems.map((product) => (
          <ProductOrderedCard key={product?.id}>
            <DetailsProductGridContainer container>
              <ImageThumbnailContainer item>
                { !product?.mockupImage ? (
                    <>
                      <CircularLoadingContainer>
                        <CircularProgress color='primary' size={'10rem'}/>
                      </CircularLoadingContainer>
                      <Typography>Creating Mockup</Typography>
                    </>
                  ) : (
                    <img 
                      src={product?.mockupImage} 
                      alt='' 
                      style={{height: '100%', width: '100%', cursor: 'pointer'}} 
                      onClick={() => handleThumbnailClick(product?.mockupImage)}
                    />
                  )
                }
              </ImageThumbnailContainer>
              <DetailsProductInfoContainer item>
                <Typography>{product?.name}</Typography>
                <Typography>Quantity: {product?.quantity}</Typography>
              </DetailsProductInfoContainer>
              <DetailsProductAdjustments item>
                <Button onClick={() => runMockupGenerator(product)}>Create Mockup</Button>
              </DetailsProductAdjustments>
            </DetailsProductGridContainer>
          </ProductOrderedCard>
        )))
      }

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>
          Full Size Image
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container justify="center">
            <img src={selectedImage} alt="Full Size" style={{width: '100%', height: 'auto'}} />
          </Grid>
        </DialogContent>
      </Dialog>

      <Container sx={{display: 'flex', justifyContent: 'flex-end', margin: '1rem'}}>
        <Button variant='contained' onClick={() => submitOrder()}>Place Order</Button>
      </Container>
    </Container>
  )

};

export default MockupGenerator;
