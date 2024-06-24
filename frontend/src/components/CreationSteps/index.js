import * as React from 'react';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import { QontoConnector, QontoStepIconRoot } from './styled';
import { creationSteps } from '../../staticData/creationSteps';

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

function CreationSteps({
  activeStep
}) {

  const steps = creationSteps;

  return (
    <Stack sx={{ width: '100%', marginTop: '1rem' }} spacing={4}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {steps?.map((step) => (
          <Step key={step?.stepNum}>
            <StepLabel StepIconComponent={QontoStepIcon}>{step?.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  )
}

export default CreationSteps;