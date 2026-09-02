import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const collectionEntries = ["new-arrivals", "fall-gathering-and-gifting", "fall-decor", "drinkware", "stemware", "cocktail-glasses", "vases", "candlelight", "trees", "bowls"];
const productEntries = ["pumpkin-twist", "nantucket-hurricane", "dorset-coupe-in-gift-box-set-of-2", "barre-organic-platter", "crackle-pumpkin", "cavendish-candlestick", "madison-stemware-pair", "greenwich-cocktail-glass", "woodstock-globe-vase", "candlelight-hurricane", "evergreen-tree", "barware-tumbler-set", "barre-serving-bowl"];

export default defineConfig({
  // The deployed site is served from the custom domain kebeda.com, so its
  // static assets live at the domain root rather than under /simon/.
  // Keep this configurable for any future sub-path deployment.
  base: process.env.VITE_BASE_PATH || "/",
  build: {
    outDir: "dist/client",
    rollupOptions: {
      input: Object.fromEntries([["home", resolve(projectRoot, "index.html")], ...collectionEntries.map((slug) => [slug, resolve(projectRoot, `collections/${slug}/index.html`)]), ...productEntries.map((slug) => [slug, resolve(projectRoot, `products/${slug}/index.html`)])]),
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
