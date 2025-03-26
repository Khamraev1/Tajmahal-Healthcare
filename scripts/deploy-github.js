#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Helper function to execute git commands
function execGitCommand(command) {
    try {
        return execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Error executing git command: ${command}`);
        console.error(error.message);
        process.exit(1);
    }
}

// Helper function to check if git is installed
function checkGitInstallation() {
    try {
        execSync('git --version', { stdio: 'ignore' });
        return true;
    } catch (error) {
        console.error('Git is not installed or not in your PATH.');
        console.error('Please install Git from https://git-scm.com/downloads');
        return false;
    }
}

// Helper function to check if .git directory exists
function checkGitRepository() {
    return fs.existsSync(path.join(process.cwd(), '.git'));
}

// Helper function to get user input
function question(query) {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });
}

async function deployToGitHub() {
    console.log('\x1b[34m%s\x1b[0m', 'Tajmahal Healthcare GitHub Deployment Script');
    console.log('\x1b[34m%s\x1b[0m', '================================================');

    // Check Git installation
    if (!checkGitInstallation()) {
        process.exit(1);
    }

    // Initialize Git repository if needed
    if (!checkGitRepository()) {
        console.log('\x1b[36m%s\x1b[0m', 'Initializing Git repository...');
        execGitCommand('git init');
        console.log('\x1b[32m%s\x1b[0m', 'Git repository initialized successfully.');
    } else {
        console.log('\x1b[33m%s\x1b[0m', 'Git repository already initialized.');
    }

    // Add files to staging
    console.log('\x1b[36m%s\x1b[0m', 'Adding files to staging...');
    execGitCommand('git add .');
    console.log('\x1b[32m%s\x1b[0m', 'Files added to staging successfully.');

    // Get commit message
    const commitMessage = await question('\x1b[36mEnter commit message (default: "Initial Tajmahal Healthcare commit"):\x1b[0m ');
    const finalCommitMessage = commitMessage.trim() || 'Initial Tajmahal Healthcare commit';

    // Commit changes
    console.log('\x1b[36m%s\x1b[0m', `Committing changes with message: '${finalCommitMessage}'...`);
    execGitCommand(`git commit -m "${finalCommitMessage}"`);
    console.log('\x1b[32m%s\x1b[0m', 'Changes committed successfully.');

    // Get GitHub username
    const githubUsername = await question('\x1b[36mEnter your GitHub username:\x1b[0m ');
    if (!githubUsername.trim()) {
        console.error('\x1b[31m%s\x1b[0m', 'GitHub username cannot be empty.');
        process.exit(1);
    }

    // Get repository name
    const repositoryName = await question('\x1b[36mEnter the repository name (default: tajmahal-healthcare):\x1b[0m ');
    const finalRepositoryName = repositoryName.trim() || 'tajmahal-healthcare';

    // Setup GitHub remote
    const remoteUrl = `https://github.com/${githubUsername}/${finalRepositoryName}.git`;
    try {
        execSync('git remote -v | grep origin', { stdio: 'ignore' });
        console.log('\x1b[33m%s\x1b[0m', 'Remote "origin" already exists. Updating it...');
        execGitCommand(`git remote set-url origin ${remoteUrl}`);
    } catch (error) {
        console.log('\x1b[36m%s\x1b[0m', 'Adding GitHub remote...');
        execGitCommand(`git remote add origin ${remoteUrl}`);
    }
    console.log('\x1b[32m%s\x1b[0m', 'GitHub remote added/updated successfully.');

    // Push to GitHub
    const branchName = 'main';
    console.log('\x1b[36m%s\x1b[0m', `Pushing to GitHub (${branchName} branch)...`);
    execGitCommand(`git push -u origin ${branchName}`);
    console.log('\x1b[32m%s\x1b[0m', 'Successfully pushed to GitHub!');

    // Display next steps
    console.log('\n\x1b[34m%s\x1b[0m', 'Next Steps:');
    console.log('\x1b[36m%s\x1b[0m', `1. Visit your repository at: https://github.com/${githubUsername}/${finalRepositoryName}`);
    console.log('\x1b[36m%s\x1b[0m', '2. Set up GitHub Pages in the repository settings (if desired)');
    console.log('\x1b[36m%s\x1b[0m', '3. Connect your repository to a cloud service for backend hosting:');
    console.log('\x1b[36m%s\x1b[0m', `   - Heroku: https://dashboard.heroku.com/new?template=https://github.com/${githubUsername}/${finalRepositoryName}`);
    console.log('\x1b[36m%s\x1b[0m', `   - Render: https://render.com/deploy?repo=https://github.com/${githubUsername}/${finalRepositoryName}`);
    console.log('\x1b[36m%s\x1b[0m', '   - DigitalOcean: https://cloud.digitalocean.com/apps/new');

    console.log('\n\x1b[32m%s\x1b[0m', 'Deployment script completed successfully!');
    rl.close();
}

// Run the deployment script
deployToGitHub().catch(error => {
    console.error('\x1b[31m%s\x1b[0m', 'An error occurred during deployment:');
    console.error(error);
    process.exit(1);
}); 