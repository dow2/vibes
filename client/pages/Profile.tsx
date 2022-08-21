import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserPhotos from '../components/UserPhotos';
import { UserContext } from '../context/UserContext';
import { styled } from '@mui/material/styles';
import { ArrowForwardIosSharpIcon, MuiAccordion, MuiAccordionSummary, MuiAccordionDetails, Typography, List, ListItem, Button, Avatar, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FacebookIcon, InstagramIcon, TwitterIcon, Grid, IconButton, Box, Link, Snackbar } from '../styles/material';
import { useTheme } from '@mui/material/styles';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Accordion = styled((props) => (
  <MuiAccordion children={''} disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const Profile: React.FC = () => {
  const { userEvents, getUserEvents, currentUserInfo } = useContext(UserContext);
  const [userPhotos, setUserPhotos] = useState([]);
  const [dbUser, setDbUser] = useState([]);
  const [facebookLink, setFacebookLink] = useState('')
  const [instagramLink, setInstagramLink] = useState('')
  const [twitterLink, setTwitterLink] = useState('')
  const [expanded, setExpanded] = React.useState('panel1');
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const getDbUser = () => {
    axios.get(`/api/profile/${currentUserInfo.id}`)
      .then(({ data }) => {
        setDbUser(data);
      })
      .catch(err => console.error(err));
  };

  const getUserPhotos = () => {
    axios.get(`/api/profile/event_photos/${currentUserInfo.id}`)
      .then(({ data }) => {
        setUserPhotos(data);
      })
      .catch(err => console.error(err));
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackClick = () => {
    setOpenSnack(true);
  };

  const handleSnackClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const handleUpdate = () => {
    axios.put(`/api/profile/${currentUserInfo.id}`, {
      "socialMedia": {
        "facebook": `${facebookLink}` || null,
        "instagram": `${instagramLink}` || null,
        "twitter": `${twitterLink}` || null
      }
    })
      .then(handleSnackClick())
      .then(handleClose())
      .catch(err => console.error(err));
  };

  const handleFacebookChange = e => {
    setFacebookLink(e.target.value);
  }

  const handleInstagramChange = e => {
    setInstagramLink(e.target.value);
  }

  const handleTwitterChange = e => {
    setTwitterLink(e.target.value);
  }

  useEffect(() => {
    getDbUser();
    getUserEvents();
    getUserPhotos();
  }, []);

  if (currentUserInfo.id) {
    return (
      <div>
        <Avatar
          alt={currentUserInfo.displayName}
          src={currentUserInfo.photos[0].value}
          sx={{ width: 150, height: 150, mt: '30px', ml: 'auto', mr: 'auto' }}
        />
        <h1>Hello {currentUserInfo.name.givenName}</h1>
        <div>
          <Button sx={{ bgcolor: inverseMode, colors: inverseMode, mb: '30px', }} variant="outlined" onClick={handleClickOpen}>Update Profile</Button>
          <Dialog open={open} onClose={handleClose} sx={{ bgcolor: inverseMode, colors: inverseMode }}>
            <DialogTitle sx={{ bgcolor: inverseMode, colors: inverseMode }}>Update Profile</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Add your social media accounts to stay connected with other concert and festival goers.
              </DialogContentText>
              <div>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label={<FacebookIcon />}
                  type="email"
                  fullWidth
                  variant="standard"
                  placeholder='Facebook Link'
                  onChange={handleFacebookChange}
                />
              </div>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label={<InstagramIcon />}
                type="email"
                fullWidth
                variant="standard"
                placeholder='Instagram Link'
                onChange={handleInstagramChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label={<TwitterIcon />}
                type="email"
                fullWidth
                variant="standard"
                placeholder='Twitter Link'
                onChange={handleTwitterChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleUpdate}>Update</Button>
            </DialogActions>
          </Dialog>
          <Snackbar open={openSnack} autoHideDuration={1500} onClose={handleSnackClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Profile Updated
            </Alert>
          </Snackbar>
        </div>
        <div>
          <Box>
            <Grid container spacing={2}>
              <Grid item>
                <Link href={dbUser.fbId}>
                  <IconButton><FacebookIcon /></IconButton>
                </Link>
              </Grid>
              <Grid item>
                <Link href={dbUser.instaId}>
                  <IconButton><InstagramIcon /></IconButton>
                </Link>
              </Grid>
              <Grid item>
                <Link href={dbUser.twitterId}>
                  <IconButton><TwitterIcon /></IconButton>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </div>
        <div>
          <Accordion sx={{ bgcolor: inverseMode }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary sx={{ bgcolor: inverseMode }} aria-controls="panel1d-content" id="panel1d-header">
              <Typography>{userEvents.eventName}</Typography>
              <Typography>{userEvents.eventDate}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: inverseMode }}>
              <List>
                <ListItem>Venue: {userEvents.venue}</ListItem>
                <ListItem>
                  Location: {userEvents.address}, {userEvents.city}, {userEvents.state}, {userEvents.postalCode}
                </ListItem>
                <ListItem>Ticket sale starts: {userEvents.saleStart}</ListItem>
                <ListItem>Ticket sale ends: {userEvents.saleEnd}</ListItem>
                <Button sx={{ bgcolor: iconColors, color: inverseMode }} onClick={() => { location.href = userEvents.link; }}>Purchase Tickets</Button>
              </List>
            </AccordionDetails>
          </Accordion>
        </div>
        <UserPhotos photos={userPhotos} />
      </div>
    );
  } else if (!currentUserInfo.length) {
    return (
      <h1>Please Sign In To View Profile</h1>
    );
  }
};

export default Profile;
