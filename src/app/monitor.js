const fs = require('fs');
const { readLightningEvents } = require('./lightning');
const { readAssets } = require('./assets');
const { generateAlerts } = require('./alerts');

// Function to start monitoring the file
function startMonitoring() {
  // Watch for changes in the lightning.json file
  fs.watchFile('data/lightning.json', (curr, prev) => {
    // Check if the current modification time is newer than the previous modification time
    if (curr.mtime > prev.mtime) {
      const lightningEvents = readLightningEvents(); // Read lightning events from the file
      const assets = readAssets(); // Read assets from the file

      generateAlerts(lightningEvents, assets); // Generate alerts based on the lightning events and assets
    }
  });
}

module.exports = { startMonitoring };
