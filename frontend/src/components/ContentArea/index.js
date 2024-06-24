import React from 'react';
import { InnerContentGrid, MainContentArea } from './styled';

function ContentArea({
  currentStepComponent
}) {
  
  return (
    <MainContentArea elevation={0}>
      <InnerContentGrid container>
        {currentStepComponent}
      </InnerContentGrid>
    </MainContentArea>
  )
}

export default ContentArea;