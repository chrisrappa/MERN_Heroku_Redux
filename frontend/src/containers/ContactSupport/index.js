import React, { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useToast } from '../../libs/toast';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';

function ContactSupport() {

  const toast = useToast();
  const userInfo = useSelector((state) => state?.userData?.loginInfo);
  const [formState, setFormState] = useState({
    subject: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      // Send formState data to supportEmail
      await axios.post(
        `${process.env.REACT_APP_API_PATH}api/support/create-support-ticket`,
        {
          subject: formState?.subject,
          description: formState?.description,
          user_id: userInfo?.user_id
        }
      )
      .then((response) => {
        if(response.status === 200){
          setSubmitted(true);
        } else {
          toast.error('There was a problem submitting your bug');
        }
      })
  };

  return (
    <>
    {
      !submitted ? (
        <form
          onSubmit={handleSubmit}
          style={{width: '100%', height: '100%'}}
        >
          <Grid 
            container
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Grid item sx={{width: '100%'}}>
              <Typography variant='h4'>Found a bug? Have Feedback? Let us know!</Typography>
            </Grid>
            <Grid item sx={{width: '100%'}}>
              <TextField
                name="subject"
                label="Subject"
                variant="outlined"
                color='secondary'
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                name="description"
                label="Description"
                variant="outlined"
                color='secondary'
                onChange={handleChange}
                required
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
            </Grid>
            <Grid sx={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
              <Button 
                type="submit" 
                variant="contained" 
                color="secondary"
                sx={{
                  padding: '0.5rem 2rem',
                  color: 'white'
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        ) : (
          <Grid 
            container 
            sx={{
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center', 
              width: '100%', 
              height: '100%'
            }}
          >
            <Typography variant="h6">Thank you for your submission!</Typography>
            <Typography sx={{textAlign: 'center'}}>Please check our Twitter/X page or Instagram for Updates</Typography>
            <Typography sx={{width: '50%', display: 'flex', justifyContent: 'space-around', marginTop: '1rem'}}>
              <Link to='https://www.instagram.com/vortexmediaconsulting/'>
                <InstagramIcon color='secondary' sx={{fontSize: '3rem'}} /> 
              </Link>
              <Link to='https://twitter.com/vortexmedia2023'>
                <TwitterIcon color='secondary' sx={{fontSize: '3rem'}}/> 
              </Link>
            </Typography>
          </Grid>
        )
      }
    </>
  );
};

export default ContactSupport;