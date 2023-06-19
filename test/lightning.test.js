const { readLightningEvents } = require('../src/app/lightning');
const { convertToQuadKey } = require('../src/app/alerts');

describe('Lightning Module', () => {
  describe('readLightningEvents', () => {
    it('should return an array of lightning events', () => {
      const lightningEvents = readLightningEvents();
      expect(Array.isArray(lightningEvents)).toBe(true);
    });
  });

  describe('convertToQuadKey', () => {
    it('should convert coordinates to a quadKey', () => {
      const latitude = 36.3492004;
      const longitude = -94.9762348;
      const precision = 12;
      const quadKey = convertToQuadKey(latitude, longitude, precision);

      expect(quadKey).toBe('111110300210');
    });
  });
});
