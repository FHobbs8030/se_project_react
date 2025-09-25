import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // ONLY proxy clothing images to the API:
      "/images/clothes": "http://localhost:3001",

      // if you also proxy your API routes, keep them too:
      // "/api": "http://localhost:3001",
    },
  },
});
