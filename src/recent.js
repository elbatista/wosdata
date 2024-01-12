const axios = require('axios')
const writeFile = require('./util');

const YOUTUBE_API_RECENT = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${process.env.RECENT_TOP_X}&channelId=${process.env.CHANNELID}&key=${process.env.YOUTUBE_API_KEY}&order=date&type=video&videoDuration=medium`;

const updateRecent = () => {
    axios
    .get(YOUTUBE_API_RECENT)
    .then(result => {
        const recent = result.data.items.map(item => ({
            videoid: item.id.videoId,
            publishedAt: item.snippet.publishedAt,
            title: item.snippet.title,
            description: item.snippet.description,
            thumb: `https://img.youtube.com/vi/${item.id.videoId}/maxresdefault.jpg`
        }));
        writeFile('./data/recent.json', recent);
        writeFile('./raw/recent.json', result.data);
    });
}

module.exports = updateRecent;