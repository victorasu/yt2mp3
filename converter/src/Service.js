import axios from 'axios';

export default async function Convert(ids)
{
    const options = {
        method: 'GET',
        url: 'https://youtube-mp36.p.rapidapi.com/dl',
        params: {id: ''},
        headers: {
          'X-RapidAPI-Key': 'not my api key',
          'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
        }
    };

    const videos = [];
    for(const id of ids) {
        try {
            options.params.id = id;
            const result = await convertOrRetry(options);
            videos.push(result);
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    
    return videos;
}


const convertOrRetry = async (options) => {
    let response = {data: {status: ""}};
    response = await axios.request(options).then(response => {console.log(response); return response;});
    while(response.data.status !== "ok"){
        setTimeout(10000);
        response = await axios.request(options).then(response => {console.log(response); return response;});   
    }

    return response.data;
}