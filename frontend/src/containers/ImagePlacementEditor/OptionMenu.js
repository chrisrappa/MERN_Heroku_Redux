import React, 
{ 
  useEffect,
  useRef, 
  useState 
} from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  CircularProgress, 
  Grid, 
  Typography 
} from '@mui/material';
import { 
  BaseButtonOption, 
  ButtonContainer, 
  CircularLoadingContainer, 
  LogosPlaceHolderTextContainer, 
  MenuOptionRow, 
  SecondaryTypography, 
  SelectOptionNavigationButton, 
} from './styled';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const OptionMenu = ({ 
  optionType,
  options,
  handleOptionChange,
  addMoreCredits,
  addRedirect
}) => {

  const menuOptionRowRef = useRef(null) ;
  const navigate         = useNavigate();

  const [isAtStart, setIsAtStart]                    = useState(true) ;
  const [scrollRighDisabled, setScrollRightDisabled] = useState(false);


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

  const handleAddItems = () => {
    switch(optionType){
      case "Products":  
        navigate('/catalog');
      break;
      case "Artwork":
        navigate('/design');
      break;
      case "Logos":
        navigate('/design/add-logo');
      break;
      default: return;
    }
  };

  const handleDisplayOptions = (option) => {
    if(optionType === 'Artwork' && !option?.url){
      return (
        <CircularLoadingContainer
          sx={{
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-evenly'
          }}
        >
          <CircularProgress color="secondary"/>
          <Typography>Upscaling</Typography>
        </CircularLoadingContainer>
      )
    };

    if(option?.url === 'error'){
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
      <Grid>
        <img 
          style = {{  height: '5rem', width: '5rem' }} 
          src   = { option.fontImage } 
          alt   = "font example" 
        />
        <Typography sx={{width: '1rem', textWrap: 'nowrap'}} variant='p'>{option.fontFamily}</Typography>
      </Grid>
    )
  };

  useEffect(() => {
    const container = menuOptionRowRef.current;
    if (container) {
      // check if options overflow the container
      const isOverflowing = container.scrollWidth > container.clientWidth;
      // disable the scroll right button if not overflowing
      setScrollRightDisabled(!isOverflowing);
    }
  }, [options]);

  return (
    <Box 
      position  = "relative" 
      maxWidth  = "100%" 
      sx  = {{
        width   : '100%'                                            ,
        display : 'flex',
      }}
    >
      <SelectOptionNavigationButton
        variant   = "contained" 
        color     = 'secondary'
        sx        = {{ left: '2%' }} 
        disabled  = { isAtStart         }
        onClick   = { handleScrollLeft  }
      >
        <KeyboardArrowLeftIcon />
      </SelectOptionNavigationButton>
      
      <MenuOptionRow item ref = { menuOptionRowRef } onScroll = { handleScroll } elevation = { 0 }>
        {
          options?.length ? (
            <>
              {options?.map((option, key) => (
                <ButtonContainer container key  = { key }>
                  <BaseButtonOption
                    value={option?.fontFamily}
                    onClick={() => {
                      handleOptionChange(option.fontFamily)
                    }}
                  >
                    {handleDisplayOptions(option)}
                  </BaseButtonOption>
                </ButtonContainer>
              ))}
            </>
          ) : (
            <LogosPlaceHolderTextContainer>
              <Button color='secondary' onClick = {() => handleAddItems()}>
                <SecondaryTypography>
                  Click to Add {  optionType  }
                </SecondaryTypography>
              </Button>
            </LogosPlaceHolderTextContainer>
          )
        }
      </MenuOptionRow>        
      <SelectOptionNavigationButton
        variant   = "contained" 
        sx        = {{ right: '2%' }}
        color     = 'secondary'
        onClick   = { handleScrollRight }
        disabled  = { scrollRighDisabled } 
      >
        <KeyboardArrowRightIcon />
      </SelectOptionNavigationButton>
    </Box>
  );
};

export default OptionMenu;