const gm = require('gm');
const fs = require('fs');
const path = require('path');
const episode = process.argv[2];
const dir = `data/episodes/${episode}/gallery`;
const title = process.argv[3];

if(process.argv.length < 4) {
    console.log("\nUsage:\n\t\$ node", process.argv[1].split("/")[ process.argv[1].split("/").length-1], "<EPISODE ID>", "<GALLERY TITLE>\n")
    return;
}

const getGalleryItem = async filePath => {
    return new Promise((resolve, reject) => {
        gm(filePath)
        .size( (err, size) => {
            if (!err) {
                resolve({
                    src: `https://raw.githubusercontent.com/elbatista/wosdata/master/${filePath}`,
                    width: size.width,
                    height: size.height,
                    title: null,
                    description: null
                });
            }
        });
    });
}

fs.readdir(dir, async (err, files) => {
    if (err) throw err;
    const gallery = {
        title: title,
        photos: []
    }
    for(i=0; i < files.length; i++){
        const filePath = path.join(dir, files[i]);
        if(!filePath.includes("DS_Store")){
            const item = await getGalleryItem(filePath);
            gallery.photos.push(item);
        }
    }
    console.log("\"gallery\":", JSON.stringify(gallery, null, '    '));
});
