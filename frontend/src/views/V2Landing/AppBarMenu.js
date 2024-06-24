import { 
  Button, 
  Grid, 
  Toolbar, 
  Typography 
} from "@mui/material";
import { StyledAppBar } from "./styled";
import { headerLogoSrc } from "./consts";

export default function AppBarMenu({ isMobile, navigate, loginWithRedirect }){

  return (
    <StyledAppBar position="fixed" open={true} elevation={0} component="nav">
      <Toolbar sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'nowrap',
            width: isMobile ? '100%' : '50%',
            border: '2px solid rgba(255,225,199, 0.15)',
            padding: '1rem',
            paddingRight: isMobile ? '1rem' : '2rem',
            borderRadius: '3rem',
            backgroundColor: '#17191c',
            filter: 'drop-shadow(0px 0px 50px rgba(255,255,255, 0.3))'
          }}
        >
          <Grid item sx={{flex: '3', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'nowrap', flexDirection: 'row'}}>
            <Typography variant="h4" sx={{marginLeft: !isMobile && '1rem'}}>
              Temp-Tat AI
            </Typography>
          </Grid>
          {
            !isMobile ? (
              <Grid 
                item
                sx={{
                  display: 'flex',
                  flex: '1',
                  alignItems: 'center',
                }}
              >
                <Button 
                  onClick={() => loginWithRedirect()} 
                  variant="contained" 
                  sx={{backgroundColor: '#ffe1c7'}}
                > 
                  <Typography variant="h6" sx={{color: '#303338', fontWeight: '500'}}>
                    Try Free!
                  </Typography>
                </Button>
              </Grid>
            ) : (
              <Grid 
                item
                sx={{
                  display: 'flex',
                  flex: '2',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <Button variant='contained' onClick={() => loginWithRedirect()}  sx={{borderRadius: '3rem', backgroundColor: '#ffe1c7'}}> 
                  <Typography variant="h7" sx={{color: '#303338', fontWeight: '500', textAlign: 'center'}}>
                    Try Free!
                  </Typography>
                </Button>
              </Grid>
            )
          }
        </Grid>
      </Toolbar>
    </StyledAppBar>
  )
}