const gm = require('gm');
const fs = require('fs');
const path = require('path');
// const episode = 
const dir = process.argv[2];
const title = process.argv[3];

if(process.argv.length < 4) {
    console.log("\nUsage:\n\t\$ node", process.argv[1].split("/")[ process.argv[1].split("/").length-1], "<PATH>", "<GALLERY TITLE>\n")
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
            else {
                console.error(err); 
                reject(err);
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
            console.log("Processing", filePath);
            const item = await getGalleryItem(filePath);
            console.log(item);
            gallery.photos.push(item);
        }
    }
    console.log("\"gallery\":", JSON.stringify(gallery, null, '    '));
});
