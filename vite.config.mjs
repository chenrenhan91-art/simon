import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const collectionEntries = ["fall-gathering-and-gifting", "fall-decor", "drinkware", "stemware", "cocktail-glasses", "vases", "candlelight", "trees", "bowls"];

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/simon/" : "/",
  build: {
    outDir: "dist/client",
    rollupOptions: {
      input: Object.fromEntries([["home", resolve(projectRoot, "index.html")], ...collectionEntries.map((slug) => [slug, resolve(projectRoot, `collections/${slug}/index.html`)])]),
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react()],
});
