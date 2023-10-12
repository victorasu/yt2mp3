import './App.css';
import { CloudDownloadRounded, PlayCircleFilled } from '@mui/icons-material'
import { TextField, Button, IconButton } from '@mui/material';
import Convert from './Service';
import React, { useState } from 'react';
import { saveAs } from 'file-saver';

export default function App() {

  const [videoId, setVideoId] = useState('');
  const [downloadData, setDownloadData] = useState('');

  async function callApi () {
    if(videoId.length === 0){
      console.error('Empty URL field.')
      return;
    }

    console.log('Calling API for ID ', videoId);
    let response = await Convert(videoId);
    setDownloadData(response);
    console.log(response);
  }

  const setID = (event) => {
    let url = event.target.value;
    let splitUrl = url.split('?v=');
    setVideoId(splitUrl[1]);
  }

  const convert = () => {
    console.log(downloadData)
    if(downloadData !== "")
      saveAs(downloadData.link, `${downloadData.title}.mp3`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Youtube to MP3 converter</p>
      </header>
      <div className="Content">
        <div className="Element">
          <TextField size="small" label="URL" variant="outlined" onChange={setID}></TextField>
        </div>
        <div className="Element">
          <Button variant="outlined" endIcon={<PlayCircleFilled/>} onClick={callApi}>Convert</Button>
        </div>
      </div>
      <div className="Download">
        <React.Fragment>
            <IconButton aria-label="download" 
                onClick={convert}>
              <CloudDownloadRounded
              />
            </IconButton>
        </React.Fragment>
      </div>
    </div>
  );
}
