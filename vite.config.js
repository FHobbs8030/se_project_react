// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  appType: "spa",              // ensure history fallback
  base: "/",                   // serve from root
  server: {
    port: 5175,
    open: true,
  },
  preview: {
    port: 5175,
  },
});
