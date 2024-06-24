import { Box, CircularProgress, Fade, Typography } from "@mui/material"
import { 
  BaseButtonOption, 
  ButtonContainer, 
  DeleteButton, 
  DeleteButtonContainer, 
  LogosPlaceHolderTextContainer, 
  MenuOptionRow 
} from "../styled"

export default function SavedArtworkList({
  userInfo,
  handleDeleteArtwork
}){
  
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