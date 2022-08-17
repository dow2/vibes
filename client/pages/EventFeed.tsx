import React, { useState, useEffect } from 'react';
import Comments from '../components/Comments';
import { styled, Button, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, Typography, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const EventFeed: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let dummyData = [
    {
      userId: 5,
      photoUrl: 'https://cdn.britannica.com/92/100692-050-5B69B59B/Mallard.jpg',
      eventApiID: 'test',
      createdAt: '2022-08-15'
    },
    {
      userId: 5,
      photoUrl: 'https://www.thespruce.com/thmb/t13CIs9CH0HfuggdQ-DU9zk_QHo=/3780x2126/smart/filters:no_upscale()/do-ducks-have-teeth-4153828-hero-9614a7e9f4a049b48e8a35a9296c562c.jpg',
      eventApiID: 'test',
      createdAt: '2022-08-14'
    },
    {
      userId: 1,
      photoUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/how-to-keep-ducks-call-ducks-1615457181.jpg',
      eventApiID: 'test',
      createdAt: '2022-08-13'
    },
  ];

  const getUserId = () => {
    console.log();
  }

  return (
    <div>
      <div>Hello EventFeed</div>
      {dummyData.map((photo, i) => {
        return (
          <div>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar alt={photo.userId} onClick={getUserId}/>
                }
                subheader={photo.createdAt}
              />
              <CardMedia
                component="img"
                height="194"
                image={photo.photoUrl}
              />
              <CardContent>
                <Typography variant='body2'>
                  This festival was dope! 
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <Button>Comments</Button>
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography>
                    comments
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </div>

          // <div key={i}>
          //   {photo.userId}
          //   <span>
          //     <img width='200px' height='auto' src={photo.photoUrl}/>
          //   </span>
          //   <div>
          //     <Comments/>
          //   </div>

          // </div>
        );
      })}

    </div>
  );
};

export default EventFeed;
