const axios = require('axios')
const writeFile = require('./util');

const YOUTUBE_API_SEARCH = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${process.env.TOP_X}&channelId=${process.env.CHANNELID}&key=${process.env.YOUTUBE_API_KEY}&order=viewCount&type=video&videoDuration=medium`;

const updatePopular = () => {
    axios
    .get(YOUTUBE_API_SEARCH)
    .then(result => {
        const popular = result.data.items.map(item => ({
            videoid: item.id.videoId,
            publishedAt: item.snippet.publishedAt,
            title: item.snippet.title,
            description: item.snippet.description,
            thumb: item.snippet.thumbnails.maxres?.url
            || item.snippet.thumbnails.high?.url 
            || item.snippet.thumbnails.default?.url 
            || ""
        }));
        writeFile('./data/popular.json', popular);
    });
}

module.exports = updatePopular;