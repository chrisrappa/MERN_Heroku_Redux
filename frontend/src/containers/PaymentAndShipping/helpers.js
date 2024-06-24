export const showCreditCardImage = (cardType) => {
  switch(cardType){
    case 'visa': 
      return (
        <img 
          src="https://res.cloudinary.com/djrbfvpit/image/upload/v1704054453/CreditCardLogos/VISA-logo_bhjuer.png" 
          alt='visa' 
          height={'75px'}
          width={'125px'}
        />
      )
    case 'mastercard': 
      return (
        <img 
          src='https://res.cloudinary.com/djrbfvpit/image/upload/v1704054453/CreditCardLogos/Mastercard-logo_dqp5ml.png' 
          alt='mastercard' 
          height={'75px'}
          width={'125px'}
        />
      )
    case 'discover': 
      return (
        <img 
          src='https://res.cloudinary.com/djrbfvpit/image/upload/v1704054453/CreditCardLogos/Discover-logo_edxbwq.png' 
          alt='discover' 
          height={'75px'}
          width={'125px'}
        />
      )
    case 'amex': 
      return (
        <img 
          src='https://res.cloudinary.com/djrbfvpit/image/upload/v1704054453/CreditCardLogos/American-Express-Color_pce8pp.png' 
          alt='amex' 
          height={'75px'}
          width={'125px'}
        />
      )
    default: return null;
  };
};