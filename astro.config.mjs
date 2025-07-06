// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import rehypeMermaid from "rehype-mermaid";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
  site: "https://yexiyue.github.io/ratatui-kit-website",
  base: "/ratatui-kit-website",
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
    rehypePlugins: [
      [
        rehypeMermaid,
        {
          // 可选配置项
          strategy: "pre-mermaid", // 默认策略是 inline-svg，也可以选择 img-png, img-svg, pre-mermaid
        },
      ],
    ],
    syntaxHighlight: {
      excludeLangs: ["mermaid", "math"],
    },
  },
});
