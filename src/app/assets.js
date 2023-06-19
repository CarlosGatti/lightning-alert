const fs = require('fs');
const { isValidJSON } = require('../utils/jsonUtils');

function readAssets() {
  const assetsData = fs.readFileSync('data/assets.json', 'utf-8');
  let assets = [];

  if (isValidJSON(assetsData)) {
    try {
      assets = JSON.parse(assetsData);
    } catch (error) {
      console.error('Invalid assets data');
    }
  } else {
    console.error('Invalid JSON for assets data');
  }

  return assets;
}

module.exports = {
  readAssets,
};
