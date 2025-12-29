import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import type IForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import type { WebpackPluginInstance } from "webpack";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

export const plugins = (target: "main" | "renderer") => {
    const basePlugins: WebpackPluginInstance[] = [
        new ForkTsCheckerWebpackPlugin({
            logger: "webpack-infrastructure",
        }),
    ];

    if (target === "renderer" && process.env.NODE_ENV !== "production") {
        basePlugins.push(new ReactRefreshWebpackPlugin());
    }

    return basePlugins;
};
