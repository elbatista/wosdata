const axios = require('axios')
const {writeFile, stripEmojis} = require('./util');
const fs = require("fs");
const { kebabCase } = require('lodash');

const YOUTUBE_API_SEARCH = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${process.env.POPULAR_TOP_X}&channelId=${process.env.CHANNELID}&key=${process.env.YOUTUBE_API_KEY}&order=viewCount&type=video&videoDuration=medium`;

const updatePopular = () => {
    axios
    .get(YOUTUBE_API_SEARCH)
    .then(result => {
        const popular = result.data.items.map(item => ({
            videoid: item.id.videoId,
            publishedAt: item.snippet.publishedAt,
            title: item.snippet.title,
            url: kebabCase(stripEmojis(item.snippet.title)),
            description: item.snippet.description,
            thumb: `https://img.youtube.com/vi/${item.id.videoId}/maxresdefault.jpg`,
            cover: fs.existsSync(`./data/episodes/${item.id.videoId}/assets/cover.jpg`) ? 
            `https://raw.githubusercontent.com/elbatista/wosdata/master/data/episodes/${item.id.videoId}/assets/cover.jpg` : 
            null
        }));
        writeFile('./data/popular.json', popular);
        writeFile('./raw/popular.json', result.data);
    });
}

module.exports = updatePopular;