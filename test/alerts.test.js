const { generateAlerts } = require('../src/app/alerts');

describe('Alerts Module', () => {
  describe('generateAlerts', () => {
    it('should not generate alerts for unaffected assets', () => {
      const lightningEvents = [
        { latitude: 36.3492004, longitude: -94.9762348 },
        { latitude: 42.1234, longitude: -71.5678 },
      ];

      const assets = [
        { assetName: 'Asset 1', quadKey: '111110300211', assetOwner: 'Owner 1' },
        { assetName: 'Asset 2', quadKey: '030232132321', assetOwner: 'Owner 2' },
      ];

      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

      generateAlerts(lightningEvents, assets);

      expect(consoleLogSpy).not.toHaveBeenCalledWith(expect.stringContaining('lightning alert'));

      consoleLogSpy.mockRestore();
    });

    it('should generate alerts for affected assets', () => {
      const lightningEvents = [
        { latitude: 36.3492004, longitude: -94.9762348 },
        { latitude: 42.1234, longitude: -71.5678 },
      ];

      const assets = [
        { assetName: 'Asset 1', quadKey: '111110300210', assetOwner: 'Owner 1' },
        { assetName: 'Asset 2', quadKey: '030232132321', assetOwner: 'Owner 2' },
      ];

      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

      generateAlerts(lightningEvents, assets);

      expect(consoleLogSpy).toHaveBeenCalledTimes(3);

      consoleLogSpy.mockRestore();
    });
  });
});
