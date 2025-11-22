# GitHub Pages Deployment Instructions

## ✅ Automatic Deployment

The deployment is **automated** after initial setup! When changes are merged to the `main` branch, the GitHub Actions workflow will automatically:
- Build the application
- Deploy it to GitHub Pages

The workflow will run automatically on every push to the main branch.

## One-Time Setup

**Important**: Before the first deployment, GitHub Pages must be enabled in the repository settings:

1. Go to **Settings** → **Pages** in your repository
2. Under "Build and deployment", set **Source** to **GitHub Actions**
3. Save the changes

Once this is configured, all subsequent deployments will be automatic.

## Accessing the Dashboard

After the first deployment completes (usually 1-2 minutes after merging to main), the dashboard will be available at:

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
1. Check the Actions tab for error messages
2. Verify the workflow has proper permissions (contents: read, pages: write, id-token: write)
3. Check that the build completes successfully locally with `npm run build`

### If you get a 404 error after deployment:
1. **Ensure GitHub Pages is enabled**: Go to Settings → Pages and verify source is set to "GitHub Actions"
2. Check that the deployment workflow completed successfully in the Actions tab
3. Wait a few minutes after the first successful deployment for the site to become available
4. Verify the URL is correct: https://swolem12.github.io/SMORQUE/

## Local Preview

To preview the production build locally before deploying:

```bash
npm run build
npm run preview
```

This will serve the built files at http://localhost:4173 with the same base path configuration.
