import axios from 'axios';

export default async function Convert(id)
{
    const options = {
        method: 'GET',
        url: 'https://youtube-mp36.p.rapidapi.com/dl',
        params: {id: ''},
        headers: {
          'X-RapidAPI-Key': '55ded2c4eemsh9acd79732397addp1688ebjsn93878dd19622',
          'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
        }
    };

    try {
        options.params.id = id;
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}