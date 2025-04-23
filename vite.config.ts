import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: parseInt(process.env.VITE_PORT || "3000", 10),
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "http://localhost:5000",
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
      },
    },
  },
});
