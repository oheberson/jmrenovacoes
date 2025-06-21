import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";

import mdx from "@astrojs/mdx";

import icon from "astro-icon";

import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  // adapter: netlify({
  //  functionPerRoute: false,
  //  edgeMiddleware: false,
  //  includeFiles: ['./src/**/*'],
  //}),
  adapter: node({
    mode: "standalone",
  }),
  // https://docs.astro.build/en/guides/images/#authorizing-remote-images
  site: "https://jmrenovacoes.com",
  image: {
    domains: ["images.unsplash.com"],
  },
  // i18n: {
  //   defaultLocale: "en",
  //   locales: ["en", "fr"],
  //   fallback: {
  //     fr: "en",
  //   },
  //   routing: {
  //     prefixDefaultLocale: false,
  //   },
  // },
  prefetch: true,
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en", // All urls that don't contain `fr` after `https://screwfast.uk/` will be treated as default locale, i.e. `en`
        locales: {
          en: "en", // The `defaultLocale` value must present in `locales` keys
          fr: "fr",
        },
      },
    }),
    compressor({
      gzip: false,
      brotli: true,
    }),
    mdx(),
    icon(),
    react(),
  ],
  experimental: {
    clientPrerender: true,
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      // Ensure Node.js modules are properly resolved
      noExternal: ["react", "react-dom"],
    },
  },
});
