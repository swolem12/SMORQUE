# GitHub Pages Deployment Setup

This repository is configured to automatically deploy the USAF Torque Dashboard to GitHub Pages.

## ✅ Automatic Deployment After Initial Setup

**One-time setup required**: Before the first deployment, GitHub Pages must be enabled in the repository settings:

1. Go to **Settings** → **Pages** in your repository
2. Under "Build and deployment", set **Source** to **GitHub Actions**
3. Save the changes

### How It Works

After the initial setup, when you push changes to the `main` branch, the GitHub Actions workflow will automatically:
1. Build the application
2. Deploy it to GitHub Pages

The first deployment will take a few minutes. Subsequent deployments will be faster.

### Accessing the Dashboard

After the first deployment completes, the dashboard will be available at:

**🚀 https://swolem12.github.io/SMORQUE/**

## Deployment

The dashboard will automatically deploy to GitHub Pages when:
- Changes are pushed to the `main` branch
- The workflow is manually triggered from the Actions tab

The deployed site will be available at: `https://swolem12.github.io/SMORQUE/`

## Troubleshooting

### Getting a 404 error?
1. **Check if GitHub Pages is enabled**: Go to Settings → Pages and verify source is set to "GitHub Actions"
2. **Check deployment status**: Go to Actions tab and verify at least one workflow has completed successfully
3. **Wait a few minutes**: After the first successful deployment, it may take 1-2 minutes for the site to become available
4. **Check the workflow logs**: If the deployment failed, check the error messages in the Actions tab

### Deployment workflow is failing?
1. Check the Actions tab for error messages
2. Verify the workflow has the correct permissions: contents: read, pages: write, id-token: write
3. Ensure the build works locally: `npm run build`

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
