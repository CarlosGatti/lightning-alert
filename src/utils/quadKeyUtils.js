function convertToQuadKey(latitude, longitude, precision) {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const zoom = parseInt(precision);
  
    let quadKey = '';
    let currentBit = 0;
  
    for (let i = 0; i < zoom; i++) {
      currentBit = 0;
      const mask = 1 << (zoom - i - 1);
  
      if ((lon & mask) !== 0) {
        currentBit++;
      }
  
      if ((lat & mask) !== 0) {
        currentBit += 2;
      }
  
      quadKey += currentBit.toString();
    }
  
    return
}
  