# PR Preview Deployment Setup

This repository is configured to automatically create preview deployments for every pull request using GitHub Actions and GitHub Pages.

## How It Works

1. **When a PR is opened/updated**: A GitHub Action automatically deploys the PR changes to a unique URL
2. **Preview URL**: Each PR gets its own preview at `https://[username].github.io/[repo-name]/pr-previews/pr-[number]/`
3. **Automatic comments**: The bot comments on each PR with the preview link
4. **Cleanup**: When a PR is closed, the preview is automatically removed

## Setup Instructions

### 1. Enable GitHub Pages
1. Go to your repository settings
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "Deploy from a branch"
4. Choose "gh-pages" branch and "/ (root)" folder
5. Click "Save"

### 2. Configure Repository Permissions
1. Go to Settings → Actions → General
2. Under "Workflow permissions", select "Read and write permissions"
3. Check "Allow GitHub Actions to create and approve pull requests"
4. Click "Save"

### 3. Create gh-pages Branch (if it doesn't exist)
```bash
# Create an empty gh-pages branch
git checkout --orphan gh-pages
git rm -rf .
echo "# GitHub Pages" > README.md
git add README.md
git commit -m "Initial gh-pages commit"
git push origin gh-pages
git checkout main  # or master
```

## Usage

1. **Create a PR**: Open a pull request as usual
2. **Wait for deployment**: The GitHub Action will run automatically (takes ~1-2 minutes)
3. **Get preview link**: Check the PR comments for the preview URL
4. **Updates**: Push new changes to the PR branch - the preview updates automatically
5. **Cleanup**: When you close/merge the PR, the preview is automatically removed

## Preview URLs

- **Individual PR**: `https://[username].github.io/[repo-name]/pr-previews/pr-[number]/`
- **All previews**: `https://[username].github.io/[repo-name]/pr-previews/`

## Features

✅ Automatic deployment on PR open/update  
✅ Unique URL for each PR  
✅ Automatic PR comments with preview links  
✅ Automatic cleanup when PR is closed  
✅ Index page showing all active previews  
✅ Updates existing comments instead of creating new ones  

## Troubleshooting

### Action fails with permissions error
- Ensure "Read and write permissions" are enabled in Actions settings
- Check that GitHub Pages is enabled and set to gh-pages branch

### Preview not updating
- Check the Actions tab for any failed workflows
- Ensure the gh-pages branch exists and is accessible

### Preview shows 404
- Wait a few minutes after the action completes (GitHub Pages can take time to update)
- Check that the files were correctly copied to the gh-pages branch

## Customization

You can customize the workflow by editing `.github/workflows/pr-preview.yml`:

- Change the trigger branches
- Modify the preview directory structure
- Customize the PR comment format
- Add build steps if needed (e.g., for frameworks like React, Vue, etc.)

## Security Note

Preview deployments are public and accessible to anyone with the URL. Don't include sensitive information in your preview builds.