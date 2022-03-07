const basePath = process.cwd();
const outputDir = `${basePath}/output`;
const path = require('path');
const axios = require('axios');
const fs = require("fs");
const { instance, collectionSize, rateLimit } = require(`${basePath}/src/config.js`);

const URIS = [];
const imageArray = [];
let startingTokenId = 0

const _calcRateLimit = () =>{
  return Math.round((rateLimit / 60));
}

const buildSetup = () => {
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true });
  }
  fs.mkdirSync(outputDir);
  fs.mkdirSync(`${outputDir}/json`);
  fs.mkdirSync(`${outputDir}/images`);
}

//get tokenURIs in array ready to be called by axios
const startGrabbing = async () => {
  console.log("********************************************************************");
  console.log("Wrapping tape around hand and putting hand in bucket");
  const rate = _calcRateLimit();
  buildSetup();
  const timer = ms => new Promise(res => setTimeout(res, ms))
  try {
    for (let i = startingTokenId; i < collectionSize + 1; i++) {
      let tokenURI = await instance.tokenURI(i);
      if(tokenURI.substring(0, 7) === "ipfs://"){
        let newbase = "https://ipfs.io/ipfs/";
        let length = tokenURI.length;
        tokenURI = tokenURI.slice(7, length)
        URIS.push(newbase.concat(tokenURI));
      }else{
        URIS.push(tokenURI);
      }
      await timer(rate);
    }
    getDataFromURIS();
  } catch (error) {
    if(startingTokenId === 0){
      startingTokenId = 1;
      await startGrabbing();
    }else{
      console.log(error);
    }
  }
}

//read tokenURI and write metadata locally
const getDataFromURIS = () =>{
  console.log("********************************************************************");
  console.log("Pulling coins off sticky hand");
  Promise.all(URIS.map((uri) => axios.get(uri))).then((res) => {
    res.forEach((metadata, index) => {
      if(metadata.data.image.substring(0, 7) === "ipfs://"){
        let imageURL = metadata.data.image;
        let newbase = "https://ipfs.io/ipfs/";
        let length = imageURL.length;
        imageURL = imageURL.slice(7, length)
        imageArray.push(newbase.concat(imageURL));
      }else{
        imageArray.push(metadata.data.image);
      }
      fs.writeFileSync(`output/json/${index + 1}.json`, JSON.stringify(metadata.data), (data, err) => {
        if (err) return console.log(err);
      });
    });
    saveImages();
  })
  .catch((error) => {
    console.log(error)
  })
}

//save image locally
const saveImages = () =>{
  console.log("********************************************************************");
  console.log("Putting coins in pocket");
  Promise.all(imageArray.map((imageURL) => 
  axios.get(imageURL,{responseType: 'stream',})))
  .then((res) => {
    res.forEach((metadata, index) => {
      let fileExt = path.extname(metadata.config.url);
      if(fileExt === "") fileExt = ".png";

      const writer = fs.createWriteStream(`output/images/${index + 1}${fileExt}`);

      new Promise((resolve, reject) => {
        metadata.data.pipe(writer);
        let error = null;

        writer.on('error', err =>{
          error = err;
          writer.close();
          reject(err);
        });

        writer.on('close', () => {
          if(!error) resolve(true);
        })

      })
    });
    console.log("********************************************************************");
    console.log("Sticky bandits were here!");
  })
  .catch((error) => {
    console.log(error)
  })
}

module.exports = { startGrabbing };