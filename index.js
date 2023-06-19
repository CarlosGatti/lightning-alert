const { readLightningEvents } = require('./src/app/lightning');
const { readAssets } = require('./src/app/assets');
const { generateAlerts } = require('./src/app/alerts');

function main() {
  try {
    const lightningEvents = readLightningEvents();
    const assets = readAssets();

    generateAlerts(lightningEvents, assets);
  } catch (error) {
    console.error(error);
  }

  console.log('Done');
}

main();
