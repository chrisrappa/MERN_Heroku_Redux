import React, 
{
  useEffect, 
  useMemo, 
  useState 
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Dialog,
  IconButton,
  DialogContent,
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@emotion/react';
import ArtworkDisplay from '../../components/ArtworkDisplay/index.js';
import ImageIcon from '@mui/icons-material/Image';
import { CircularLoadingContainer } from './styled.js';


function CreateArtwork({ 
  navigate, 
  artworkData, 
  setArtworkData
}) {

  const generatedArtworkOptions = useSelector(
    (state) => state?.stepData?.currentInfo?.artworkProps?.base64Collection
  );
  const artworkGenerating = useSelector(
    (state) => state?.stepData?.currentInfo?.artworkProps?.isLoading
  );

  const dispatch        = useDispatch()                                   ;
  const theme           = useTheme()                                      ;
  // const isMediumScreen  = useMediaQuery('(max-width: 960px)')             ;

  const [openDialogue, setOpenDialogue]             = useState(false);
  const [expandedImage, setExpandedImage]           = useState(null);
  const [artBasePrompt, setArtBasePrompt]           = useState('');

  // TODO Customize Prompt with selected artwork data
  const optionsToCompletePrompt = () => {
    const colorsString = artworkData.colors.map(
      str => str.toUpperCase()
    ).join(', ');

    const stylesString = artworkData.styles.map(
      str => str.toUpperCase()
    ).join(', ');

    const lightingsString = artworkData.lightings.map(
      str => str.toUpperCase()
    ).join(', ');

    const completePrompt = `
      Create a clear and bold temporary tattoo design featuring a single, 
      cohesive ${artBasePrompt} as the primary subject. 
      The design should have clean lines and be provided as a PNG with a fully transparent, no color background, 
      suitable for direct application as a temporary tattoo. 
      No additional background or extraneous elements should be included and the image should be centered with white space all around it as padding.
    `
    // const completePrompt = `
    //   ${artBasePrompt}, featuring a palette of ${colorsString}
    //   , rendered in the artistic tradition of ${stylesString}, 
    //   under ${lightingsString} conditions
    // `;

    return completePrompt;
  };

  const generateArtwork = () => {


  };

  // Can't get this to work unfortunately, tabling for now
  // const onRefresh = (imageData) => {
  //   dispatch(artworkVariationDispatcher({base64SourceImage: imageData}), dispatch);
  // };

  const onSelect = (imageData) => {
    navigate('/createTat/1');
  };

  const onZoom = (imageData) => {
    setExpandedImage(imageData);
    setOpenDialogue(true)
  };

  const ArtworkDialogDisplay = () => (
    <Dialog
      onClose={() => setOpenDialogue(false)}
      aria-labelledby="customized-dialog-title"
      open={openDialogue}
    >
      <IconButton
        aria-label="close"
        onClick={() => setOpenDialogue(false)}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
          backgroundColor: 'gray',
        }}
      >
        <CloseIcon sx={{ color: 'white' }}/>
      </IconButton>
      <DialogContent dividers>
        <img 
          src={expandedImage} 
          alt="Generation" 
          style={{ maxWidth: '100%', maxHeight: '100%'}}
          onClick={() => setOpenDialogue(true)}
        />
      </DialogContent>
    </Dialog>
  );
  
  return (
    <Grid sx={{...theme.flexBox.justifyAlignCenter, flexDirection: 'column', width: '100%'}}>
      <Grid item sx={{flex: '1', width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}>
        <TextField
          placeholder = 'Type your idea here...'
          variant     = "outlined" 
          color       = 'secondary'
          sx          = {{ width: '100%'}}
          onChange    = {(e) => setArtBasePrompt(e.target.value)}
          value={artBasePrompt}
          required
        />
      </Grid>
      <Grid 
        item 
        sx={{
          flex: '1', 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center'
        }}
      >
        <Button
          variant   = 'contained'
          color     = 'secondary'
          sx        = {{ width: '100%', height: '80%' }}
          onClick   = {() => generateArtwork()}
          disabled  = {
            !artBasePrompt    || 
            artworkGenerating
          }
        >
          <Typography variant='h5' sx={{fontFamily: `${theme.typography.primary.fontFamily}`, color: `${theme.palette.whites.main}`}}>
            Run Art Generator
          </Typography>

        </Button>
      </Grid>
      <Grid container sx={{flex: '5', width: '100%', height: '100%'}}>
        {
          (generatedArtworkOptions && !artworkGenerating) ? 
          (
            <Grid container sx={{flex: '5', width: '100%', height: '100%'}}>
              <Grid item sx={{display: 'flex', flexDirection: 'row', width: '100%', height: '50%' }}>
                <ArtworkDisplay 
                  imageData={generatedArtworkOptions[0]?.url} 
                  // onRefresh={onRefresh} 
                  onZoom={onZoom} 
                  onSelect={onSelect} 
                  setExpandedImage={setExpandedImage}
                />
                <ArtworkDisplay 
                  imageData={generatedArtworkOptions[1]?.url} 
                  // onRefresh={onRefresh} 
                  onZoom={onZoom} 
                  onSelect={onSelect} 
                  setExpandedImage={setExpandedImage}
                />
              </Grid>
              <Grid item sx={{display: 'flex', flexDirection: 'row', width: '100%', height: '50%'}}>
                <ArtworkDisplay 
                  imageData={generatedArtworkOptions[2]?.url} 
                  // onRefresh={onRefresh} 
                  onZoom={onZoom} 
                  onSelect={onSelect} 
                  setExpandedImage={setExpandedImage}
                />
                <ArtworkDisplay 
                  imageData={generatedArtworkOptions[3]?.url} 
                  // onRefresh={onRefresh} 
                  onZoom={onZoom} 
                  onSelect={onSelect} 
                  setExpandedImage={setExpandedImage}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container sx={{flex: '5', minWidth: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: `1px solid ${theme.palette.primary.md}`, borderRadius: '1rem'}}>
              {
                artworkGenerating ? (
                  <CircularLoadingContainer>
                    <CircularProgress color='primary' size={'10rem'} />
                  </CircularLoadingContainer>
                ) : (
                  <ImageIcon sx={{ fontSize: '10rem', color: `${theme.palette.primary.md}`}}/>
                )
              }
            </Grid>
          )
        }

      </Grid>
      {/* {
        true ? (
          <Grid item sx={{flex: '0.5', width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}>
            <Button variant='outlined' sx={{display: 'flex', justifyContent: 'space-between', width: '100%', height: '90%'}}>
              <Typography>Advanced Options</Typography>
              <ArrowCircleUpOutlinedIcon sx={{fontSize: '2rem'}}/>
            </Button>
          </Grid>
        ) : (
          <Grid item sx={{flex: '3', width: '100%', height: '100%'}}>

          </Grid>
        )
      } */}
      <ArtworkDialogDisplay />
    </Grid>
  )
}

export default CreateArtwork;