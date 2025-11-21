# GitHub Pages Deployment Instructions

## Automatic Setup

The GitHub Pages deployment is fully automated! When changes are merged to the `main` branch, the GitHub Actions workflow will automatically:
- Enable GitHub Pages (if not already enabled)
- Build the application
- Deploy it to GitHub Pages

No manual configuration is required in repository settings - the workflow handles everything automatically using the `enablement: true` parameter in the `actions/configure-pages` step.

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

If the deployment fails:
1. Check the Actions tab for error messages
2. Verify the workflow has proper permissions (contents: read, pages: write, id-token: write)
3. Check that the build completes successfully locally with `npm run build`
4. If Pages enablement fails, you can manually enable it in Settings > Pages and set source to "GitHub Actions"

## Local Preview

To preview the production build locally before deploying:

```bash
npm run build
npm run preview
```

This will serve the built files at http://localhost:4173 with the same base path configuration.
