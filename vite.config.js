import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: "dist",
    base: "/snb_cleaning/",
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
