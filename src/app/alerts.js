function generateAlerts(lightningEvents, assets) {
    const processedAssets = new Set();
  
    for (const event of lightningEvents) {
      for (const asset of assets) {
        if (
          hasStrikeOccurredForAsset(event, asset) &&
          !processedAssets.has(asset.assetOwner)
        ) {
          // return lat and long of strike do create a test
          console.log(`lightning strike at ${event.latitude}:${event.longitude}`);

          console.log(`lightning alert for ${asset.assetOwner}:${asset.assetName}`);
          processedAssets.add(asset.assetOwner);
          break;
        }
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
  
      // Verifica se o bit correspondente a longitude está ativo
      if ((lon & mask) !== 0) {
        currentBit++;
      }
  
      // Verifica se o bit correspondente a latitude está ativo
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
  