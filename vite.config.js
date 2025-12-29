import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  plugins: [tailwindcss()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "index.html",
        about: "about.html",
        services: "services.html",
        contact: "contact.html",
      },
    },
  },
});
