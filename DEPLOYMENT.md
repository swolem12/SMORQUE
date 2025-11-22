# GitHub Pages Deployment Setup

This repository is configured to automatically deploy the USAF Torque Dashboard to GitHub Pages.

## ⚠️ ONE-TIME SETUP REQUIRED (If Not Already Done)

**If you're seeing a 404 error at https://swolem12.github.io/SMORQUE/, you need to enable GitHub Pages first.**

### Steps to Enable GitHub Pages:

1. **Go to your repository settings**: 
   - Direct link: https://github.com/swolem12/SMORQUE/settings/pages
   - Or navigate to: Repository → Settings → Pages (in left sidebar under "Code and automation")

2. **Configure the source**:
   - Under "Build and deployment"
   - **Source**: Select **"GitHub Actions"** (NOT "Deploy from a branch")
   - Click **Save**

3. **Wait for deployment**:
   - Go to the **Actions** tab: https://github.com/swolem12/SMORQUE/actions
   - The workflow should automatically run and deploy the site
   - Once it completes successfully (green checkmark), your site will be live
   - Initial deployment may take 1-2 minutes

4. **Verify**:
   - Visit: https://swolem12.github.io/SMORQUE/
   - You should see the TORQUE dashboard

**This is a one-time setup!** After this, all future deployments will be automatic.

## Deployment

The dashboard will automatically deploy to GitHub Pages when:
- Changes are pushed to the `main` branch
- The workflow is manually triggered from the Actions tab

The deployed site will be available at: `https://swolem12.github.io/SMORQUE/`

## Troubleshooting

### Getting a 404 error?
1. **Check if GitHub Pages is enabled**: Go to Settings > Pages and verify source is set to "GitHub Actions"
2. **Check deployment status**: Go to Actions tab and verify at least one workflow has completed successfully
3. **Wait a few minutes**: After the first successful deployment, it may take 1-2 minutes for the site to become available
4. **Check the workflow logs**: If the deployment failed, check the error messages in the Actions tab

### Deployment workflow is failing?
1. Most likely cause: GitHub Pages is not enabled (see setup instructions above)
2. Check that you have the correct permissions: contents: read, pages: write, id-token: write
3. Verify the build works locally: `npm run build`

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
