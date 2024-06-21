const TerserPlugin = require('terser-webpack-plugin');

module.exports = (options, webpack) => {
  const ignoreImports = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
    '@nestjs/platform-express',
  ];

  return {
    ...options,
    externals: [],
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_classnames: true,
          },
        }),
      ],
    },
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    },
    plugins: [
      ...options.plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (ignoreImports.includes(resource)) {
            return true;
          }
          return false;
        },
      }),
    ],
  };
};
