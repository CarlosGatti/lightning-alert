const { hasStrikeOccurredForAsset } = require('../src/app/alerts');

describe('hasStrikeOccurredForAsset', () => {
  it('should return true if a strike has occurred for a particular asset', () => {
    const strike = {
      latitude: 36.3492004,
      longitude: -94.9762348,
    };

    const asset = {
      assetName: 'Block Corners',
      quadKey: '111110300210',
      assetOwner: '5645',
    };

    const strikeOccurred = hasStrikeOccurredForAsset(strike, asset);
    expect(strikeOccurred).toBe(true);
  });

  it('should return false if a strike has not occurred for a particular asset', () => {
    const strike = {
      latitude: 36.3492004,
      longitude: -94.9762348,
    };

    const asset = {
      assetName: 'Block Corners',
      quadKey: '111110300211',
      assetOwner: '5645',
    };

    const strikeOccurred = hasStrikeOccurredForAsset(strike, asset);
    expect(strikeOccurred).toBe(false);
  });
});
