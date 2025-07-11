const dotenv = require('dotenv');
const TerserPlugin = require('terser-webpack-plugin');
const { DefinePlugin } = require('webpack');

function getEntryPoint(withMocks) {
  return withMocks ? './src/mocks/mockMain.ts' : './src/main.ts';
}

function getExternals(withMocks) {
  return withMocks ? ['_http_common'] : [];
}

function addEnvVariables(withMocks) {
  if (!withMocks) return [];

  return [
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
    }),
  ];
}

module.exports = (options, webpack) => {
  const ignoreImports = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
    '@nestjs/platform-express',
  ];

  return {
    ...options,
    entry: getEntryPoint(process.env.WITH_MOCKS),
    externals: getExternals(process.env.WITH_MOCKS),
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
      ...addEnvVariables(process.env.WITH_MOCKS),
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
