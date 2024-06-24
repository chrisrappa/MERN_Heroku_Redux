import { Grid, styled } from "@mui/material";
import { MaterialDesignContent } from 'notistack'

const AppContainer = styled(Grid)(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  height: '90dvh',
}));

const StyledMaterialDesignContent = styled(MaterialDesignContent)(({theme}) => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: `${theme?.palette?.secondary?.main}`,
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: '#970C0C',
  },
}));

export { AppContainer, StyledMaterialDesignContent };