const axios = require('axios')
const writeFile = require('./util');

const YOUTUBE_API_PLAYLISTS = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=50&channelId=${process.env.CHANNELID}&key=${process.env.YOUTUBE_API_KEY}`;
const YOUTUBE_API_PLAYLIST  = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`;

const updatePlaylists = () => {
    axios
    .get(YOUTUBE_API_PLAYLISTS)
    .then(async result => {
        let playlists = result.data.items.map(item => ({
            id: item.id,
            publishedAt: item.snippet.publishedAt,
            title: item.snippet.title,
            thumb: item.snippet.thumbnails.maxres.url
        }));
        await Promise.all(playlists.map(async playlist => {
            let result = await axios.get(`${YOUTUBE_API_PLAYLIST}&playlistId=${playlist.id}`);
            playlist.items = result.data.items.filter(i=>!i.snippet.title.toLowerCase().includes("private video")).map(item =>({
                videoid: item.snippet.resourceId.videoId,
                title: item.snippet.title,
                publishedAt: item.snippet.publishedAt,
                description: item.snippet.description,
                thumb: `https://img.youtube.com/vi/${item.snippet.resourceId.videoId}/maxresdefault.jpg`//item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.default?.url || ""
            }));
        }));
        writeFile('./data/playlists.json', playlists);
        writeFile('./raw/playlists.json', result.data);
    });
}

module.exports = updatePlaylists;