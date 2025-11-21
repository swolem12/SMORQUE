# GitHub Pages Deployment Setup

This repository is configured to automatically deploy the USAF Torque Dashboard to GitHub Pages.

## Enabling GitHub Pages

To enable GitHub Pages for this repository, follow these steps:

1. Go to your repository settings: `https://github.com/swolem12/SMORQUE/settings/pages`
2. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
3. Save the settings

## Deployment

The dashboard will automatically deploy to GitHub Pages when:
- Changes are pushed to the `main` branch
- The workflow is manually triggered from the Actions tab

The deployed site will be available at: `https://swolem12.github.io/SMORQUE/`

## Local Development

To preview the built site locally with the correct base path:

```bash
npm install
npm run build
npm run preview
```

Then visit `http://localhost:4173/SMORQUE/` in your browser.

## Configuration

The deployment configuration is set in:
- **Workflow**: `.github/workflows/deploy.yml` - GitHub Actions workflow for building and deploying
- **Base Path**: `vite.config.ts` - Vite configuration with base path set to `/SMORQUE/`
- **Router**: `src/App.tsx` - React Router basename set to `/SMORQUE` for client-side routing
