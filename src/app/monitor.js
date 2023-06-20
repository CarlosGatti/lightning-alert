const fs = require('fs');
const { readLightningEvents } = require('./lightning');

const { readAssets } = require('./assets');
const { generateAlerts } = require('./alerts');

// Function to start monitoring the file
function startMonitoring() {
  fs.watchFile('data/lightning.json', (curr, prev) => {

    if (curr.mtime > prev.mtime) {
        const lightningEvents = readLightningEvents();
        const assets = readAssets();
    
        generateAlerts(lightningEvents, assets);
    }
  });
}

module.exports = { startMonitoring };
