const { readLightningEvents } = require('./src/app/lightning');
const { readAssets } = require('./src/app/assets');
const { generateAlerts } = require('./src/app/alerts');
const { startMonitoring } = require('./src/app/monitor');

function main() {
  try {
    const lightningEvents = readLightningEvents();
    const assets = readAssets();

    generateAlerts(lightningEvents, assets);
    startMonitoring();
  } catch (error) {
    console.error(error);
  }

  console.log('Done');
}

main();
