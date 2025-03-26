#!/bin/bash
# Bash script to deploy Tajmahal Healthcare to GitHub
# Author: Tajmahal Healthcare Team
# Date: 2024-03-26

# Script to help deploy the Tajmahal Healthcare website to GitHub

echo -e "\e[34mTajmahal Healthcare GitHub Deployment Script\e[0m"
echo -e "\e[34m================================================\e[0m"

# Check for Git installation
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    echo -e "\e[32mGit is installed: $GIT_VERSION\e[0m"
else
    echo -e "\e[31mGit is not installed or not in your PATH.\e[0m"
    echo -e "\e[31mPlease install Git using your package manager or download from https://git-scm.com/downloads\e[0m"
    exit 1
fi

# Check if it's already a git repository
if [ -d ".git" ]; then
    echo -e "\e[33mGit repository already initialized.\e[0m"
else
    echo -e "\e[36mInitializing Git repository...\e[0m"
    git init
    if [ $? -ne 0 ]; then
        echo -e "\e[31mFailed to initialize Git repository.\e[0m"
        exit 1
    fi
    echo -e "\e[32mGit repository initialized successfully.\e[0m"
fi

# Add files to staging
echo -e "\e[36mAdding files to staging...\e[0m"
git add .
if [ $? -ne 0 ]; then
    echo -e "\e[31mFailed to add files to staging.\e[0m"
    exit 1
fi
echo -e "\e[32mFiles added to staging successfully.\e[0m"

# Commit changes
echo -e "\e[36mEnter commit message (default: 'Initial Tajmahal Healthcare commit'):\e[0m"
read COMMIT_MESSAGE
if [ -z "$COMMIT_MESSAGE" ]; then
    COMMIT_MESSAGE="Initial Tajmahal Healthcare commit"
fi
echo -e "\e[36mCommitting changes with message: '$COMMIT_MESSAGE'...\e[0m"
git commit -m "$COMMIT_MESSAGE"
if [ $? -ne 0 ]; then
    echo -e "\e[31mFailed to commit changes.\e[0m"
    exit 1
fi
echo -e "\e[32mChanges committed successfully.\e[0m"

# Setup GitHub remote
echo -e "\e[36mEnter your GitHub username:\e[0m"
read GITHUB_USERNAME
if [ -z "$GITHUB_USERNAME" ]; then
    echo -e "\e[31mGitHub username cannot be empty.\e[0m"
    exit 1
fi

echo -e "\e[36mEnter the repository name (default: tajmahal-healthcare):\e[0m"
read REPOSITORY_NAME
if [ -z "$REPOSITORY_NAME" ]; then
    REPOSITORY_NAME="tajmahal-healthcare"
fi

# Check if remote already exists
if git remote -v | grep -q "origin"; then
    echo -e "\e[33mRemote 'origin' already exists. Updating it...\e[0m"
    git remote set-url origin "https://github.com/$GITHUB_USERNAME/$REPOSITORY_NAME.git"
else
    echo -e "\e[36mAdding GitHub remote...\e[0m"
    git remote add origin "https://github.com/$GITHUB_USERNAME/$REPOSITORY_NAME.git"
fi
if [ $? -ne 0 ]; then
    echo -e "\e[31mFailed to add/update GitHub remote.\e[0m"
    exit 1
fi
echo -e "\e[32mGitHub remote added/updated successfully.\e[0m"

# Push to GitHub
BRANCH_NAME="main"
echo -e "\e[36mPushing to GitHub ($BRANCH_NAME branch)...\e[0m"
git push -u origin $BRANCH_NAME
if [ $? -ne 0 ]; then
    echo -e "\e[31mFailed to push to GitHub.\e[0m"
    echo -e "\e[33mIf you're seeing an authentication error, make sure:\e[0m"
    echo -e "\e[33m1. You've created the repository on GitHub\e[0m"
    echo -e "\e[33m2. You have the right username/password or token\e[0m"
    echo -e "\e[33m3. The repository name is correct\e[0m"
    exit 1
fi
echo -e "\e[32mSuccessfully pushed to GitHub!\e[0m"

# Display next steps
echo -e "\n\e[34mNext Steps:\e[0m"
echo -e "\e[36m1. Visit your repository at: https://github.com/$GITHUB_USERNAME/$REPOSITORY_NAME\e[0m"
echo -e "\e[36m2. Set up GitHub Pages in the repository settings (if desired)\e[0m"
echo -e "\e[36m3. Connect your repository to a cloud service for backend hosting:\e[0m"
echo -e "\e[36m   - Heroku: https://dashboard.heroku.com/new?template=https://github.com/$GITHUB_USERNAME/$REPOSITORY_NAME\e[0m"
echo -e "\e[36m   - Render: https://render.com/deploy?repo=https://github.com/$GITHUB_USERNAME/$REPOSITORY_NAME\e[0m"
echo -e "\e[36m   - DigitalOcean: https://cloud.digitalocean.com/apps/new\e[0m"

echo -e "\n\e[32mDeployment script completed successfully!\e[0m" 