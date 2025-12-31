import type { Configuration } from "webpack";
import { plugins } from "./webpack.plugins";
import { rules } from "./webpack.rules";

export const mainConfig: Configuration = {
    /**
     * This is the main entry point for your application, it's the first file
     * that runs in the main process.
     */
    entry: "./src/index.ts",
    // Put your normal webpack config below here
    module: {
        rules,
    },
    // Call plugins() with 'main' to get main-process-specific plugin configuration
    // (excludes renderer-only plugins like React Refresh)
    plugins: plugins("main"),
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
    },
    // Don't bundle native modules - load them at runtime
    externals: {
        "onnxruntime-node": "commonjs onnxruntime-node",
    },
};
