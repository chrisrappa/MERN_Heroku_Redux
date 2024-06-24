import React, { useEffect, useState } from 'react';
import { 
  Button, 
  Container, 
  MobileStepper, 
  // useMediaQuery
} from '@mui/material';
import { 
  BaseButtonOption, 
  ButtonContainer, 
  MenuOptionRow, 
  SecondaryTypography, 
  StylingOptionsContainer, 
} from './styled';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const StyleMenu = ({ 
  optionMenu, 
  optionType,
  options,
  updateOptions,
  handleOptionChange,
  optionsExpanded,
  addMoreCredits,
  selectedOptions,
  creditBalance
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const theme    = useTheme()   ;
  const navigate = useNavigate();
  // const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => Math.min(prevSlide + 1, options.length - 1));
  };

  const CustomToggleButton = ({ key, value, label, description, type, ...rest }) => {
    const [selected, setSelected] = useState(false);
    
    useEffect(() => {
      const selectedObject = selectedOptions.find(
        option => option === value
      );

      setSelected(!!selectedObject);
    }, [value]);

    const handleClick = () => {
      setSelected(!selected);

      switch(type){
        case 'styles': 
          updateOptions(label, 'styles');
        break;
        case 'colors': 
          updateOptions(label, 'colors');
        break;
        case 'lightings': 
          updateOptions(label, 'lightings');
        break;
        default: return;
      }
    };
  
    return (
      <ButtonContainer key={key}>
        <BaseButtonOption
          {...rest}
          value={value}
          selected={selected}
          onClick={() => handleClick()}
        >
          <SecondaryTypography variant='h7' sx={{fontWeight: '700'}}>
            {label}
          </SecondaryTypography>
        </BaseButtonOption>
      </ButtonContainer>
    );
  };

  return (
    <StylingOptionsContainer sx={{display: (optionMenu !== optionsExpanded) ? 'none' : 'flex'}} >
      <MenuOptionRow item>
        {options?.slice(currentSlide * 2, currentSlide * 2 + 2).map((option) => (
          <CustomToggleButton
            key={option.id}
            value={option.label}
            label={option.label}
            description={option.description}
            type={optionType}
            handleOptionChange={handleOptionChange}
          />
        ))}
      </MenuOptionRow>
      
      <MenuOptionRow item>
        {options.slice(currentSlide * 2 + 4, currentSlide * 2 + 6).map((option) => (
          <CustomToggleButton
            key={option.id}
            value={option.label}
            label={option.label}
            description={option.description}
            type={optionType}
            handleOptionChange={handleOptionChange}
          />
        ))}
      </MenuOptionRow>

      <MenuOptionRow item sx={{justifyContent: 'space-between', height: '25%', padding: '0.25rem'}}>
        <MobileStepper
          variant="dots"
          steps={Math.ceil(options.length / 2) - 1}
          position="static"
          activeStep={currentSlide}
          sx={{ 
            width: '100%', 
            flexGrow: 1, 
            paddingBottom: '0', 
            backgroundColor: '#f2f2f2', 
            '& .MuiMobileStepper-dotActive': {
              backgroundColor: '#0b779f'
            } 
          }}
          nextButton={
            <Button
              size="small"
              variant='contained'
              color='secondary'
              onClick={handleNextSlide}
              disabled={currentSlide >= Math.floor(options.length / 2) - 1}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              color='secondary'
              variant='outlined'
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          }
        />
      </MenuOptionRow>
      <Container 
        sx={{
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '1rem',
          paddingLeft: '0', 
          paddingRight: '0'
        }}
      >
        <SecondaryTypography>
          Credit Balance: {creditBalance}
        </SecondaryTypography>
        <Button 
          onClick={() => navigate('/profile/info')}
          size='small' 
          color="secondary" 
          sx={{padding: '0'}}
        > 
          <SecondaryTypography>
            Add More 
          </SecondaryTypography>
        </Button>
      </Container>
    </StylingOptionsContainer>
  );
};

export default StyleMenu;