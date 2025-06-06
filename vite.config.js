import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import restart from 'vite-plugin-restart'

// https://vite.dev/config/
// plus, selected Bruno Simon settings:

export default defineConfig({
    // For a tidy project (all source files inside src):
    root: 'src/',
    publicDir: '../public/',

    plugins: [
        // Restart server on file changes in public(static):
        restart({ restart: ['../public/**'] }),

        // React support
        react(),
    ],

    server: {
        // Open to local network and display URL:
        host: true,
        // Open if it's not a CodeSandbox:
        // NB this only applies during dev so brittleness does not matter much? May need to address it.
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env),
    },

    build: {
        // Output to the dist/ folder
        outDir: '../dist',
        // Empty the folder first:
        emptyOutDir: true,
        // Enable sourcemap for debugging (Remove for prod.)
        sourcemap: true,
    },

     // Required for github pages with vite:
    base: '/north-wyke-project/',

})
