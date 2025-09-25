import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/items": "http://localhost:3001",
      "/images/clothes": "http://localhost:3001"
    }
  }
});
