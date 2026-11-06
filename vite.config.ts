import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base must match the repository name for GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/al-science-hub/',
});
