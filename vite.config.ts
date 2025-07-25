import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router"],
          "ui-components": [
            "@/components/ui/button",
            "@/components/ui/form",
            "@/components/ui/input",
            "@/components/ui/card",
            "@/components/ui/checkbox",
            "@/components/ui/textarea",
            "@/components/ui/dropdown-menu",
            "@/components/ui/badge",
          ],
          icons: ["lucide-react"],
          auth: ["@/context/AuthContext", "@/context/useAuthContext"],
        },
      },
    },
  },
});
