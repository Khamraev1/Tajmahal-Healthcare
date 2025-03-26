# GitHub Deployment Guide for Tajmahal Healthcare

This guide provides step-by-step instructions for deploying the Tajmahal Healthcare website to GitHub.

## Prerequisites

1. [Install Git](https://git-scm.com/downloads) if you haven't already
2. Create a [GitHub account](https://github.com/join) if you don't have one

## Step 1: Initialize Git Repository

Open a terminal/command prompt in your project folder and run the following commands:

```bash
# Initialize a new Git repository
git init

# Add all files to staging
git add .

# Commit changes
git commit -m "Initial commit"
```

## Step 2: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click on the "+" icon in the top right corner and select "New repository"
3. Enter a name for your repository (e.g., "tajmahal-healthcare")
4. Optionally, add a description
5. Choose "Public" or "Private" visibility
6. Click "Create repository"

## Step 3: Connect Local Repository to GitHub

After creating the repository, GitHub will show instructions. Follow the "push an existing repository" section. Run these commands in your terminal:

```bash
# Add the remote repository URL (replace USERNAME and REPOSITORY with your GitHub username and repository name)
git remote add origin https://github.com/USERNAME/REPOSITORY.git

# Push your code to GitHub
git push -u origin master
```

If your default branch is "main" instead of "master", use:

```bash
git push -u origin main
```

## Step 4: Configure GitHub Pages (Optional)

If you want to host a static landing page:

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to "GitHub Pages" section
4. Under "Source", select the branch you want to deploy (usually "main" or "master")
5. Click "Save"

Note: GitHub Pages only hosts static content, so your Node.js backend won't run on it. You'll need a separate hosting service for the backend.

## Step 5: Set Up GitHub Actions for CI/CD

The workflow file (`.github/workflows/node.js.yml`) is already set up in your repository. This will:

1. Run tests whenever you push new code to the main/master branch
2. Validate that the Docker build works

## Step 6: Deploying to a Cloud Service

For a full deployment with the backend, consider these options:

1. **Heroku**: Follow the Heroku deployment instructions in your README.md file
2. **Render**: Easy deployment with GitHub integration
3. **DigitalOcean App Platform**: Connect your GitHub repository for automatic deployment

## Security Notes

1. Make sure your `.env` file is in `.gitignore` to avoid exposing sensitive credentials
2. For MongoDB connection, use environment variables in your deployment platform
3. Create new credentials for production environments

## Updating Your Deployment

To push updates to GitHub:

```bash
git add .
git commit -m "Description of changes"
git push
```

Your GitHub Actions workflow will automatically run tests on new commits. 