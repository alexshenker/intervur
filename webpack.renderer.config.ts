import type { Configuration } from "webpack";
import { plugins } from "./webpack.plugins";
import { rules } from "./webpack.rules";

rules.push({
    test: /\.css$/,
    use: [
        { loader: "style-loader" },
        { loader: "css-loader" },
        { loader: "postcss-loader" },
    ],
});

export const rendererConfig: Configuration = {
    module: {
        rules,
    },
    // Call plugins() with 'renderer' to get renderer-specific plugin configuration
    // (includes React Refresh in development mode for hot reloading)
    plugins: plugins("renderer"),
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
        alias: {
            "@": __dirname + "/src",
        },
    },
    // target: Tells webpack this is an Electron renderer environment.
    // This ensures webpack uses the correct defaults for an Electron renderer process
    // (which is a browser-like environment with optional Node.js integration).
    target: "electron-renderer",
    // externals: Don't bundle these modules - load them at runtime instead.
    // better-sqlite3 is a native module that needs to be loaded directly, not bundled.
    externals: {
        "better-sqlite3": "commonjs better-sqlite3",
    },
};
