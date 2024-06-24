import { Typography } from "@mui/material";

export const pageHeaderContent = `Easily create your own high quality temporary tattoos with our AI Art Generator and get them shipped to your door for under $20`;

export const featureBoxOne = {
  headerText: 'Step 1',
  content: "Use our easy and intuitive AI Art Generator to bring your visions to life."
};

export const featureBoxTwo = {
  headerText: 'Step 2',
  content: "Place your order to be shipped directly to your door."
};

export const featureBoxThree = {
  headerText: 'Step 3',
  content: "Apply your tattoo to desired area that lasts up to 3 days!"
};

export const screenFeatureOne = {
  headerText: 'Easy Art Generator',
  content: 'Use either our simple art generator or for more customization use our extra styling options'
};

export const screenFeatureTwo = {
  headerText: 'Custom Text Overlay',
  content: 'Our intuitive overlay editor makes it easy to further customize your design with text.'
};

export const screenFeatureThree = {
  headerText: 'Secure & Fast Checkout',
  content: "We integrate with Stripe, making payments quick and easy."
};

export const screenFeatureFive = {
  headerText: 'FAQ Chatbot',
  content: 'You answer the same questions over and over to customers, but we make it so that you can create an FAQ and our interactive chatbot will answer all of the most common client questions based on this information in real time.'
}

export const screenFeatureFour = {
  headerText: 'Collaboration & Notes',
  content: "Easily collaborate with your customer and take notes on images while you are to help with the drafting process later."
};

export const emailSubscription = {
  headerText: 'Free Tattoo Upon Launch!',
  content: `We'll email you when we launch in a few months with your promo code to get your free tattoo!`
};

export const heroImageSrc = 'https://res.cloudinary.com/djrbfvpit/image/upload/v1718751980/TempTatAI/temptatexampleflow-ezgif.com-video-to-gif-converter_lwouvn.gif';
export const screenFeatureOneSrc = 'https://res.cloudinary.com/djrbfvpit/image/upload/v1717429706/temptatartgenscreen_ovmcnm.png';
export const screenFeatureTwoSrc = 'https://res.cloudinary.com/djrbfvpit/image/upload/v1717429773/textplacementscreen_cani6n.png';
export const screenFeatureThreeSrc = 'https://res.cloudinary.com/djrbfvpit/image/upload/v1717429710/paymentscreen_ohsnyf.png';
export const screenFeatureFourSrc = 'https://res.cloudinary.com/djrbfvpit/image/upload/v1715454323/TeleTat/imagecollabwithvideofeed_ktaihi.png';
export const screenFeatureFiveSrc = 'https://res.cloudinary.com/djrbfvpit/image/upload/v1716500301/chatbot_ceufky.png';
export const infoGraphSrc = 'https://res.cloudinary.com/djrbfvpit/image/upload/v1714155437/Vortex%20Media%20Portfolio/newprocess_qwgv3v.png';
export const footerLogoSrc = 'https://res.cloudinary.com/djrbfvpit/image/upload/v1713899582/vortexmedialogo_dtmrjw.png';
export const headerLogoSrc = 'https://res.cloudinary.com/djrbfvpit/image/upload/v1713899582/vortexmedialogo_dtmrjw.png';

export const stepOneImage = 'https://res.cloudinary.com/djrbfvpit/image/upload/v1716407396/steponeImage_ac5ncp.png';
export const stepTwoImage = 'https://res.cloudinary.com/djrbfvpit/image/upload/v1716407857/stepthreeimage_yi60df.png';
export const stepThreeImage = 'https://res.cloudinary.com/djrbfvpit/image/upload/v1716407857/stepthreeimage_yi60df.png';


export const processStepsMobile = [
  {
    id: 0,
    headerText: 'Client Signup',
    imageSrc: 'https://res.cloudinary.com/djrbfvpit/image/upload/v1714165010/Vortex%20Media%20Portfolio/step1vortex_buvylo.png',
    content: 'Text message signup'
  },
  {
    id: 1,
    headerText: 'Assessment',
    imageSrc: 'https://res.cloudinary.com/djrbfvpit/image/upload/v1714165013/Vortex%20Media%20Portfolio/step2vortex_cr0q37.png',
    content: 'Guided customizable customer questionaire'
  },
  {
    id: 2,
    headerText: 'Inspiration',
    imageSrc: 'https://res.cloudinary.com/djrbfvpit/image/upload/v1714165014/Vortex%20Media%20Portfolio/step3vortex_kxoast.png',
    content: 'Simple image upload and easy to use AI art generator for customers to create drafts'
  },
  {
    id: 3,
    headerText: '',
    imageSrc: 'https://res.cloudinary.com/djrbfvpit/image/upload/v1714165015/Vortex%20Media%20Portfolio/step4vortex_ztq9cz.png',
    content: ''
  },
  {
    id: 4,
    headerText: 'Retrospective & Changes',
    imageSrc: 'https://res.cloudinary.com/djrbfvpit/image/upload/v1714165011/Vortex%20Media%20Portfolio/step5vortex_cayqmw.png',
    content: 'After presenting the finished product, we review the final steps to identify and implement any necessary adjustments.'
  },
]
export const HeroHeaderText = (isMobile) => {
  return (
    <Typography variant={ isMobile ? 'h3' : 'h2'} color='white' sx={{width: '100%', textAlign: 'center', fontWeight: '700', marginBottom: isMobile.isMobile && ('2rem')}}>
      Ensure It Slays, {isMobile.isMobile && (<br />)} <span style={{color: '#ffe1c7'}}> Before It Stays </span> 
    </Typography>
  )
}