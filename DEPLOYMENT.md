# Modern GitHub Pages Deployment Setup

This repository uses the modern GitHub Pages deployment approach with GitHub Actions for both main branch deployments and PR previews.

## How It Works

### Main Branch Deployment
1. **When code is pushed to main**: Automatically builds CSS and deploys the latest version to your GitHub Pages site
2. **Build Process**: Copies HTML/JS from `src/` and runs PostCSS with Autoprefixer to generate optimized CSS in the git-ignored `public/`
3. **Production URL**: Your main site is available at your GitHub Pages URL
4. **Modern approach**: Uses GitHub Actions deployment (no gh-pages branch needed)

### PR Preview Deployment  
1. **When a PR is opened/updated**: A GitHub Action automatically builds CSS and deploys the PR changes to a unique URL
2. **Build Process**: Same copy + PostCSS build process ensures PR previews match production-ready assets in the git-ignored `public/`
3. **Preview URL**: Each PR gets its own preview at: `https://[your-pages-url]/pr-previews/pr-[number]/`
4. **Automatic comments**: The bot comments on each PR with the preview link
5. **Integrated deployment**: Both main site and PR previews are deployed together

## Setup Instructions

### 1. Enable GitHub Pages (Modern Method)
1. Go to your repository settings
2. Navigate to "Pages" in the left sidebar  
3. Under "Source", select "GitHub Actions"
4. Click "Save"

### 2. Configure Environment Protection Rules
1. Go to Settings → Environments
2. Click on "github-pages" environment (or create it if it doesn't exist)
3. Under "Deployment branches and tags":
   - Select "Selected branches and tags"
   - Add rule for `main` branch
   - Add rule for `refs/pull/*/merge` (for PR previews)
4. Click "Save protection rules"

**Important**: This step is crucial to avoid "Branch not allowed to deploy" errors.

### 3. Configure Repository Permissions
1. Go to Settings → Actions → General
2. Under "Workflow permissions", select "Read and write permissions"
3. Check "Allow GitHub Actions to create and approve pull requests"
4. Click "Save"

## Usage

### Main Branch Deployment
1. **Push to main**: Push changes to the main branch
2. **Automatic deployment**: The site deploys automatically to your GitHub Pages URL
3. **No manual steps**: Everything is handled by GitHub Actions

### PR Preview Deployment
1. **Create a PR**: Open a pull request as usual
2. **Wait for deployment**: The GitHub Action will run automatically (takes ~1-2 minutes)
3. **Get preview link**: Check the PR comments for the preview URL
4. **Updates**: Push new changes to the PR branch - the preview updates automatically
5. **Integrated experience**: Both main site and PR preview are available from the same deployment

## URLs

- **Main site**: `https://[your-github-pages-url]/`
- **Individual PR preview**: `https://[your-github-pages-url]/pr-previews/pr-[number]/`
- **All previews index**: `https://[your-github-pages-url]/pr-previews/`

## Features

✅ **Modern GitHub Actions deployment** - No gh-pages branch needed  
✅ **Automatic main branch deployment** - Push to main = instant deployment  
✅ **Integrated PR previews** - Main site and previews in one deployment  
✅ **Automatic PR comments** with preview links  
✅ **Beautiful preview index page** with navigation  
✅ **Environment protection rule compatible** - No deployment restrictions  
✅ **Updates existing comments** instead of creating new ones  

## Troubleshooting

### Action fails with permissions error
- Ensure "Read and write permissions" are enabled in Actions settings
- Check that GitHub Pages is set to "GitHub Actions" (not "Deploy from a branch")

### Preview not updating
- Check the Actions tab for any failed workflows
- Ensure GitHub Pages source is set to "GitHub Actions"

### Preview shows 404
- Wait a few minutes after the action completes (GitHub Pages can take time to update)
- Check that the deployment completed successfully in the Actions tab

### Environment protection rules error
If you see "Branch not allowed to deploy to github-pages due to environment protection rules":
1. Go to Settings → Environments → github-pages
2. Under "Deployment branches and tags", ensure you have:
   - `main` branch allowed
   - `refs/pull/*/merge` pattern allowed (for PR previews)
3. Save the protection rules

### Missing environment error
If you see "Missing environment" error:
- The workflows now correctly specify the `github-pages` environment
- Ensure the environment exists in your repository settings

## Customization

You can customize the workflows by editing:

### Main Branch Deployment (`.github/workflows/deploy-main.yml`)
- ✅ **CSS Build Process**: Automatically builds CSS with PostCSS and Autoprefixer
- Add build steps for frameworks (React, Vue, etc.)
- Modify file copying logic
- Add pre-deployment checks

### PR Preview Deployment (`.github/workflows/pr-preview.yml`)
- ✅ **CSS Build Process**: Automatically builds CSS with PostCSS and Autoprefixer
- Change the trigger branches
- Modify the preview directory structure  
- Customize the PR comment format
- Customize the preview index page styling

## Architecture

### Modern Approach Benefits
- **No gh-pages branch management** - Everything handled by GitHub Actions
- **Single deployment per PR** - Both main site and preview in one artifact
- **Environment protection compatible** - No environment restrictions
- **Simpler maintenance** - Fewer moving parts, more reliable

### File Structure
```
Repository:
├── public/             # Generated at build time (not committed)
│   ├── index.html         # Deployment-ready site root
│   ├── js/cube.js         # Copied from src/js/
│   └── styles/cube.css    # PostCSS output
└── src/
    ├── index.html         # Authoring HTML
    ├── js/cube.js         # Source JavaScript
    └── styles/cube.css    # Source CSS
```

## Security Note

Preview deployments are public and accessible to anyone with the URL. Don't include sensitive information in your preview builds.