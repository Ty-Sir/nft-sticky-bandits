const basePath = process.cwd();

const { startGrabbing } = require(`${basePath}/src/main.js`);

(() => {
  startGrabbing();
})();
