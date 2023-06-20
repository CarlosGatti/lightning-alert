function generateAlerts(lightningEvents, assets) {
  const processedAssets = new Set();
  const alerts = [];

  for (const event of lightningEvents) {
    for (const asset of assets) {
      if (
        hasStrikeOccurredForAsset(event, asset) &&
        !processedAssets.has(asset.assetOwner)
      ) {
        processedAssets.add(asset.assetOwner);
        alerts.push({
          assetOwner: asset.assetOwner,
          assetName: asset.assetName,
          latitude: event.latitude,
          longitude: event.longitude
        });
        break;
      }
    }
  }

  // Show alerts
  console.log('Lightning Alerts Total:' + alerts.length + '\n');
  for (const alert of alerts) {
    console.log(`- Asset: ${alert.assetOwner}:${alert.assetName}`);
    console.log(`  Location: ${alert.latitude}:${alert.longitude}`);

    if(alerts.length > 1){
      console.log(`---------------------------------`);
    }

  }
}

  
  function hasStrikeOccurredForAsset(strike, asset) {
    const assetQuadKey = asset.quadKey;
    const strikeQuadKey = convertToQuadKey(strike.latitude, strike.longitude, assetQuadKey.length);

    return assetQuadKey === strikeQuadKey;
  }
  
  // Function to check if a strike has occurred for a particular asset
  function convertToQuadKey(latitude, longitude, precision) {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const zoom = parseInt(precision);
  
    let quadKey = '';
    let currentBit = 0;
  
    for (let i = 0; i < zoom; i++) {
      currentBit = 0;
      const mask = 1 << (zoom - i - 1);
  
      // verify if the bit corresponding to longitude is active
      if ((lon & mask) !== 0) {
        currentBit++;
      }
  
      // verify if the bit corresponding to latitude is active
      if ((lat & mask) !== 0) {
        currentBit += 2;
      }
  
      quadKey += currentBit.toString();
    }
  
    return quadKey;
  }
  
  module.exports = {
    generateAlerts,
    convertToQuadKey,
    hasStrikeOccurredForAsset,
  };
  