module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'last 2 Chrome versions',
            'last 2 Firefox versions',
            'last 1 Safari versions',
            'last 1 iOS versions',
            'last 1 Android version',
            'last 1 ChromeAndroid version',
          ],
        },
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
};
