import { Box, CircularProgress, Fade, Typography } from "@mui/material"
import { 
  BaseButtonOption, 
  ButtonContainer, 
  DeleteButton, 
  DeleteButtonContainer, 
  LogosPlaceHolderTextContainer, 
  MenuOptionRow 
} from "../styled"
import { CircularLoadingContainer } from "../../PaymentAndShipping/styled"

export default function SavedArtworkList({
  userInfo,
  handleDeleteArtwork
}){

  const handleDisplayOptions = (option) => {
    
    if(!option?.upscaledImageUrl){
      return (
        <CircularLoadingContainer
          sx={{
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }}
        >
          <CircularProgress color="secondary"/>
          <Typography>Upscaling</Typography>
          <Typography>...this could take up to 5 minutes</Typography>
        </CircularLoadingContainer>
      )
    };

    if(option?.upscaledImageUrl === 'error'){
      return (
        <CircularLoadingContainer
          sx={{
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-evenly'
          }}
        >
          <Typography>Upscale Error</Typography>
        </CircularLoadingContainer>
      )
    };

    return (
      <img 
        style={{
          height: '10rem', 
          width: '10rem' ,
        }} 
        src={option?.upscaledImageUrl} alt="" 
      />
    )
  };
  
  return (
    <Box position="relative" maxWidth="100%" sx={{width: '100%'}}>
      <MenuOptionRow item>
        {
          userInfo?.generatedArtworks?.length ? (
            userInfo?.generatedArtworks?.map((artwork) => (
              <Fade in timeout={1000}  key={artwork?._id}>
                <ButtonContainer>
                  <DeleteButtonContainer>
                    <DeleteButton
                      onClick={() => {
                        handleDeleteArtwork(artwork)
                      }}
                    >
                      X
                    </DeleteButton>
                  </DeleteButtonContainer>
                  <BaseButtonOption
                    value={artwork?.value ?? 0}
                    disabled
                  >
                    {
                      handleDisplayOptions(artwork)
                    }
                  </BaseButtonOption>
                </ButtonContainer>
              </Fade>
            )) 
          ) : (
            <LogosPlaceHolderTextContainer>
              <Typography>Saved Artwork Will Show Here</Typography>
            </LogosPlaceHolderTextContainer>
          )
        }
      </MenuOptionRow>        
    </Box>
  )
};