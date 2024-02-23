const axios = require('axios')
const {writeFile, stripEmojis} = require('./util');
const { kebabCase } = require('lodash');

const YOUTUBE_API_RECENT = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${process.env.RECENT_TOP_X}&channelId=${process.env.CHANNELID}&key=${process.env.YOUTUBE_API_KEY}&order=date&type=video`;
//&videoDuration='medium,long'`;
// 
const updateRecent = async () => {

    const resultMedium = await axios.get(YOUTUBE_API_RECENT+"&videoDuration=medium")
    const result = resultMedium;
    const resultLong = await axios.get(YOUTUBE_API_RECENT+"&videoDuration=long")
    result.data.items = [...result.data.items, ...resultLong.data.items]
    // .then(result => {
        const recent = result.data.items.sort((a,b)=>new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)).map(item => ({
            videoid: item.id.videoId,
            publishedAt: item.snippet.publishedAt,
            title: item.snippet.title,
            url: kebabCase(stripEmojis(item.snippet.title)),
            description: item.snippet.description,
            thumb: `https://img.youtube.com/vi/${item.id.videoId}/maxresdefault.jpg`
        }));
        writeFile('./data/recent.json', recent);
        writeFile('./raw/recent.json', result.data);
    // });
}

module.exports = updateRecent;