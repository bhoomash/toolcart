// Custom build script for Vercel deployment
// This script sets environment variables to disable ESLint warnings during build

process.env.DISABLE_ESLINT_PLUGIN = 'true';
process.env.ESLINT_NO_DEV_ERRORS = 'true';
process.env.CI = 'false';

console.log('Starting Vercel build with ESLint warnings disabled...');

// Import and run the standard react-scripts build
require('react-scripts/scripts/build');