# GitHub Pages Deployment Instructions

## ⚠️ IMPORTANT: One-Time Manual Setup Required

Before the automatic deployment can work, you **must** manually enable GitHub Pages in your repository settings:

1. Go to your repository on GitHub: https://github.com/swolem12/SMORQUE
2. Click on **Settings** (top right)
3. In the left sidebar, click on **Pages** (under "Code and automation")
4. Under "Build and deployment":
   - **Source**: Select **GitHub Actions** (NOT "Deploy from a branch")
5. Save the settings

**This is a one-time setup!** After this, all deployments will be automatic.

## Automatic Deployment

Once GitHub Pages is enabled (see above), the deployment is fully automated! When changes are merged to the `main` branch, the GitHub Actions workflow will automatically:
- Build the application
- Deploy it to GitHub Pages

The workflow will run automatically on every push to the main branch.

## Accessing the Dashboard

After the workflow completes (usually 1-2 minutes), the dashboard will be available at:

**🚀 https://swolem12.github.io/SMORQUE/**

## Manual Deployment

If you need to trigger a deployment manually:

1. Go to the **Actions** tab in your repository
2. Select the "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select the branch (main) and click "Run workflow"

## Configuration Details

- **Base Path**: `/SMORQUE/` (configured in `vite.config.ts`)
- **Build Output**: `dist/` directory
- **Workflow File**: `.github/workflows/deploy.yml`
- **Trigger**: Automatic on push to main branch, or manual via workflow_dispatch

## Troubleshooting

### If the deployment fails:
1. **Most Common Issue**: GitHub Pages is not enabled in repository settings
   - Go to Settings > Pages and set source to "GitHub Actions" (see setup instructions above)
2. Check the Actions tab for error messages
3. Verify the workflow has proper permissions (contents: read, pages: write, id-token: write)
4. Check that the build completes successfully locally with `npm run build`

### If you get a 404 error:
1. Verify that GitHub Pages is enabled and the source is set to "GitHub Actions"
2. Check that at least one deployment workflow has completed successfully in the Actions tab
3. Wait a few minutes after the first successful deployment for the site to become available

## Local Preview

To preview the production build locally before deploying:

```bash
npm run build
npm run preview
```

This will serve the built files at http://localhost:4173 with the same base path configuration.
