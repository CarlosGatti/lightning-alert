const { convertToQuadKey } = require('../utils/quadKeyUtils.js');

// Function to generate alerts based on lightning events and assets
function generateAlerts(lightningEvents, assets) {
  const processedAssets = new Set();
  const alerts = []; 

  // Iterate over each lightning event
  for (const event of lightningEvents) {
    // Iterate over each asset
    for (const asset of assets) {
      // Check if a strike has occurred for the current asset and it hasn't been processed before
      if (
        hasStrikeOccurredForAsset(event, asset) &&
        !processedAssets.has(asset.assetOwner)
      ) {
        processedAssets.add(asset.assetOwner); // Add the asset owner to the processed set
        alerts.push({
          assetOwner: asset.assetOwner,
          assetName: asset.assetName,
          latitude: event.latitude,
          longitude: event.longitude
        }); 
        break; // Break out of the inner loop since the asset has been matched
      }
    }
  }

  // Display the generated alerts
  console.log('Lightning Alerts Total: ' + alerts.length + '\n');
  for (const alert of alerts) {
    console.log(`- Asset: ${alert.assetOwner}:${alert.assetName}`);
    console.log(`  Location: ${alert.latitude}:${alert.longitude}`);
    console.log(`  QuadKey: ${convertToQuadKey(alert.latitude, alert.longitude, 12)}`);

    if (alerts.length > 1) {
      console.log(`---------------------------------`);
    }
  }
}

// Function to check if a strike has occurred for a particular asset
function hasStrikeOccurredForAsset(strike, asset) {
  const assetQuadKey = asset.quadKey;
  const strikeQuadKey = convertToQuadKey(strike.latitude, strike.longitude, assetQuadKey.length);
  return assetQuadKey === strikeQuadKey; // Compare the quad keys
}

module.exports = {
  generateAlerts,
  hasStrikeOccurredForAsset,
};
