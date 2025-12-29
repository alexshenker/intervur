import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import type IForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import type { WebpackPluginInstance } from "webpack";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

// Export a function instead of static array to allow conditional plugin loading
// based on whether we're building the main process or renderer process.
export const plugins = (target: "main" | "renderer") => {
    // Base plugins used by both main and renderer processes
    const basePlugins: WebpackPluginInstance[] = [
        // ForkTsCheckerWebpackPlugin: Runs TypeScript type checking in a separate process
        // for faster builds (doesn't block webpack compilation)
        new ForkTsCheckerWebpackPlugin({
            logger: "webpack-infrastructure",
        }),
    ];

    // React Refresh: Only add to renderer process in development mode
    // Enables hot reloading for React components without losing state
    // Not needed in main process (no React) or production builds
    if (target === "renderer" && process.env.NODE_ENV !== "production") {
        basePlugins.push(new ReactRefreshWebpackPlugin());
    }

    return basePlugins;
};
