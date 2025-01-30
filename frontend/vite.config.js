import { defineConfig } from 'vite';

export default defineConfig({
  root: 'frontend',  // Set the root to the 'frontend' folder
  build: {
    outDir: 'dist',  // Ensure this matches what Render expects
  }
});
