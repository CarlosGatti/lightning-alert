const fs = require('fs');
const { isValidJSON } = require('../utils/jsonUtils');

function readLightningEvents() {
  const lightningData = fs.readFileSync('data/lightning.json', 'utf-8');
  const lightningLines = lightningData.trim().split('\n');
  const lightningEvents = [];

  for (let i = 0; i < lightningLines.length; i++) {
    const line = lightningLines[i];
    if (isValidJSON(line)) {
      try {
        const event = JSON.parse(line);
        lightningEvents.push(event);
      } catch (error) {
        console.error(`Invalid lightning event at line ${i + 1}`);
      }
    } else {
      console.error(`Invalid JSON at line ${i + 1}`);
    }
  }

  return lightningEvents;
}

module.exports = {
  readLightningEvents,
};
