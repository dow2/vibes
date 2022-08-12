import React, { useState, useEffect } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import axios from 'axios';
import { Accordion, AccordionSummary, AccordionDetails, Grid, Fab} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Person, MusicNote, LibraryMusic, Lyrics }from '@mui/icons-material';

const Mp3Recorder = new MicRecorder({ bitRate: 128});
const SongFinder: React.FC = () => {

  const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [previewSource, setPreviewSource] = useState();
  const [song, setSong] = useState('');
  const [artist, setArtist] = useState('');
  const [albumTitle, setAlbumTitle] = useState('');

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({audio: true},
      () => {
        // console.log('Permission Granted');
        setIsBlocked(true);
      },
      () => {
        // console.log("Permission Denied");
        setIsBlocked(false);
      });




  }, []);

  useEffect(() => {

    axios.post('/songs', {
      data: previewSource,
    })
      .then((results) => {
        setSong(results.data.title);
        setArtist(results.data.artist);
        setAlbumTitle(results.data.apple_music.albumName);
        console.log('SUCCESS', results);
      })
      .catch((err) => console.error(err));

  }, [previewSource]);

  const start = () => {
    if (isBlocked) {
      // console.log('Permission Denied');
    } else {
      Mp3Recorder.start()
        .then(() => {

          setIsRecording(true);
        })
        .catch((e) => console.error(e));
    }
  };

  const stop = () => {
    Mp3Recorder.stop().getMp3()
      .then(([buffer, blob]) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
          setPreviewSource(reader.result);

        };
        setIsRecording(false);
        setSong('');
      })
      .catch((e) => console.log(e));
  };



  return (
    <div>
      <div>Hello SongFinder</div>
      
      <div>
        <Grid container>
          <Grid item xs = {4}></Grid>
          <Grid item xs ={4}>
            <Accordion expanded={true} >
              <AccordionSummary>{<MusicNote></MusicNote>} Song Name
              </AccordionSummary>
              <AccordionDetails>
                {song}
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon/>}>{<Person></Person>} Artist 
              </AccordionSummary>
              <AccordionDetails>
                {artist}
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon/>}>{<Lyrics></Lyrics>} Lyrics
              </AccordionSummary>
              <AccordionDetails>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon/>}>{<LibraryMusic></LibraryMusic>} Album 
              </AccordionSummary>
              <AccordionDetails>
                {albumTitle}
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs = {4}></Grid>
        </Grid>
      </div>

      <audio src={previewSource} controls="controls"/>

      <div>
        <Fab onMouseDown={start} onMouseUp={stop}>Record</Fab>
      </div>
    </div>
  );
};

export default SongFinder;
