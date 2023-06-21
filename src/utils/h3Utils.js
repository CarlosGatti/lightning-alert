// extra functions for h3
// h3 convert latitude and longitude to h3 index - format is hex string
function convertToH3(latitude, longitude, resolution){
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const h3Resolution = parseInt(resolution);

    const latIndex = Math.floor((lat + 90) / 180 * (1 << h3Resolution));
    const lonIndex = Math.floor((lon + 180) / 360 * (1 << h3Resolution));

    const h3Index = latIndex * (1 << h3Resolution) + lonIndex;

    return h3Index.toString(16);
}