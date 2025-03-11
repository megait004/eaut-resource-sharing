import { defineConfig, RsbuildPlugin } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import path from "path";
import { pluginSass } from "@rsbuild/plugin-sass";
import { pluginHtmlMinifierTerser } from "rsbuild-plugin-html-minifier-terser";
import fs from "fs";

const createFiles = () => {
  if (!fs.existsSync("./dist")) {
    fs.mkdirSync("./dist");
    console.log("\x1b[32m%s\x1b[0m", "Đã tạo thư mục dist");
  }
  fs.writeFileSync("./dist/robots.txt", `User-agent: *\nDisallow: /`);
  console.log("\x1b[36m%s\x1b[0m", "Đã tạo robots.txt");

  fs.writeFileSync("./dist/_redirects", `/*    /index.html   200`);
  console.log("\x1b[35m%s\x1b[0m", "Đã tạo _redirects");
};

const createFilesPlugin = (): RsbuildPlugin => ({
  name: "plugin-create-files",
  setup(api) {
    api.onBeforeBuild(() => {
      console.log("\x1b[33m%s\x1b[0m", "Bắt đầu tạo các file...");
      createFiles();
      console.log("\x1b[32m%s\x1b[0m", "Đã tạo xong tất cả các file!");
    });
  },
});

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginSass({
      sassLoaderOptions: {
        api: "modern-compiler",
        implementation: require.resolve("sass-embedded"),
      },
    }),
    pluginHtmlMinifierTerser({
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeTagWhitespace: true,
      sortAttributes: true,
      sortClassName: true,
      html5: true,
    }),
    createFilesPlugin(),
  ],
  html: {
    favicon: "./src/assets/icon.ico",
    title: "EAUT DocShare - Nền tảng chia sẻ tài liệu học tập",
    meta: {
      viewport:
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
    },
  },
  performance: {
    buildCache: true,
    printFileSize: true,
    removeConsole: true,
    removeMomentLocale: true,
  },
  source: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  output: {
    assetPrefix: "./",
    cleanDistPath: true,
  },
});
