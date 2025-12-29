import type { ModuleOptions } from 'webpack';

export const rules: Required<ModuleOptions>['rules'] = [
  // Add support for native node modules
  {
    // We're specifying native_modules in the test because the asset relocator loader generates a
    // "fake" .node file which is really a cjs file.
    test: /native_modules[/\\].+\.node$/,
    use: 'node-loader',
  },
  // NOTE: @vercel/webpack-asset-relocator-loader REMOVED
  // This loader was injecting __dirname references into bundled code, causing runtime errors
  // in the renderer process (which doesn't have __dirname by default in sandboxed contexts).
  // Only needed if you're using native Node modules that need asset relocation.
  // With nodeIntegration: true, we don't need this loader for basic React apps.
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    },
  },
];
