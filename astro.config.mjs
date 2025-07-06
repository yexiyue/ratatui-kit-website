// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import rehypeMermaid from "rehype-mermaid";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";

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
          strategy: "inline-svg", // 默认策略是 inline-svg，也可以选择 img-png, img-svg, pre-mermaid
        },
      ],
      rehypeHeadingIds,
      rehypeAutolinkHeadings,
    ],
    syntaxHighlight: {
      excludeLangs: ["mermaid", "math"],
    },
  },
});
