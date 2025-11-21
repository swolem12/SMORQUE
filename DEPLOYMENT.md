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
- **404 Handling**: `public/404.html` - Handles direct navigation and page refreshes for client-side routing on GitHub Pages

## Client-Side Routing on GitHub Pages

This application uses a custom 404 handling solution to support client-side routing on GitHub Pages:

### How It Works

1. When a user directly navigates to a route (e.g., `https://swolem12.github.io/SMORQUE/missions`), GitHub Pages returns a 404 error
2. The `404.html` file intercepts the error and redirects to the base URL with the path encoded in the query string
3. The `index.html` file contains a script that decodes the path and restores it using the browser's History API
4. React Router then handles the routing normally

### Files Involved

- **`public/404.html`**: Catches 404 errors and redirects with encoded path
- **`index.html`**: Contains script to decode and restore the original URL

This solution is based on the [spa-github-pages](https://github.com/rafgraph/spa-github-pages) pattern.
