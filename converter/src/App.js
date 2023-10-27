import './App.css';
import { CloudDownloadRounded, PlayCircleFilled } from '@mui/icons-material'
import { TextField, Button, IconButton } from '@mui/material';
import Convert from './Service';
import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import SplitUrlsInString from './Utilities';

export default function App() {

  const [videoId, setVideoId] = useState('');
  const [downloadData, setDownloadData] = useState('');
  const [isDownloadable, setIsDownloadable] = useState('');

  useEffect(() => {
    setIsDownloadable("Please convert a video");
  }, []);

  async function callApi () {
    if(videoId.length === 0){
      console.error('Empty URL field.')
      setIsDownloadable("Not available");
      return;
    }

    let ids = getIds(videoId);

    console.log('Calling API for ID ', ids);
    let response = await Convert(ids);
    setDownloadData(response);
    if(response.length > 0)
      setIsDownloadable(`Download available`);
    console.log(response);
  }

  const urlInputOnChange = (event) => {
    setVideoId(event.target.value);
  }

  const getIdFromUrl = (url) => {
    let splitUrl = url.split('?v=');
    if(splitUrl[1].includes('&'))
    {
      let finalSplit = splitUrl[1].split('&');
      return finalSplit[0]
    }
    else{
      return splitUrl[1];
    }
  }

  const getIds = (videoId) => {
    var urlArray = SplitUrlsInString(videoId);
    const ids = [];
    if(urlArray.length > 1){
      urlArray.forEach(url => {
        let id = getIdFromUrl(url);
        ids.push(id);
      });
    }
    else{
      let id = getIdFromUrl(urlArray[0]);
      ids.push(id);
    }
    return ids;
  }

  const download = () => {
    console.log(downloadData)
    if(downloadData !== "" && downloadData.length > 0){
      downloadData.forEach(video => {
        saveAs(video.link, `${video.title}.mp3`);
      })
      setIsDownloadable(`Videos are downloaded`);
    }
    else{
      setIsDownloadable(`Download not possible`);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Youtube to MP3 converter</p>
      </header>
      <div className="Content">
        <div className="Element">
          <TextField size="small" label="URL" variant="outlined" onChange={urlInputOnChange}></TextField>
        </div>
        <div className="Element">
          <Button variant="outlined" endIcon={<PlayCircleFilled/>} onClick={callApi}>Convert</Button>
        </div>
      </div>
      <div className="Download">
        <React.Fragment>
            <IconButton aria-label="download" 
                onClick={download}
                color="secondary">
              {isDownloadable} <CloudDownloadRounded className="Element"/>
            </IconButton>
        </React.Fragment>
      </div>
    </div>
  );
}
