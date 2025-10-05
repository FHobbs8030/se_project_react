// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Only proxy API calls (if you even need this)
      // '/api': { target: 'http://localhost:3001', changeOrigin: true }
    },
  },
});
