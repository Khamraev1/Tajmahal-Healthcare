# PowerShell script to deploy Tajmahal Healthcare to GitHub
# Author: Tajmahal Healthcare Team
# Date: 2024-03-26

# Script to help deploy the Tajmahal Healthcare website to GitHub

Write-Host "Tajmahal Healthcare GitHub Deployment Script" -ForegroundColor Blue
Write-Host "================================================" -ForegroundColor Blue

# Find Git installation
$gitPaths = @(
    "C:\Program Files\Git\cmd\git.exe",
    "C:\Program Files (x86)\Git\cmd\git.exe",
    (Get-Command git -ErrorAction SilentlyContinue).Source
)

$gitExe = $null
foreach ($path in $gitPaths) {
    if (Test-Path $path) {
        $gitExe = $path
        break
    }
}

if ($null -eq $gitExe) {
    Write-Host "Git is not installed or not found in common locations." -ForegroundColor Red
    Write-Host "Please download and install Git from https://git-scm.com/downloads" -ForegroundColor Red
    Write-Host "After installation, you may need to restart your computer." -ForegroundColor Red
    exit 1
}

# Function to run Git commands
function Invoke-Git {
    param([string]$Command)
    $arguments = $Command -split ' '
    $process = Start-Process -FilePath $gitExe -ArgumentList $arguments -NoNewWindow -Wait -PassThru
    return $process.ExitCode
}

# Check Git installation
try {
    $process = Start-Process -FilePath $gitExe -ArgumentList "--version" -NoNewWindow -Wait -PassThru
    if ($process.ExitCode -eq 0) {
        $gitVersion = & $gitExe --version
        Write-Host "Git is installed: $gitVersion" -ForegroundColor Green
    }
    else {
        throw "Git version check failed"
    }
}
catch {
    Write-Host "Error running Git: $_" -ForegroundColor Red
    exit 1
}

# Check if it's already a git repository
if (Test-Path -Path ".git") {
    Write-Host "Git repository already initialized." -ForegroundColor Yellow
}
else {
    Write-Host "Initializing Git repository..." -ForegroundColor Cyan
    if (0 -ne (Invoke-Git "init")) {
        Write-Host "Failed to initialize Git repository." -ForegroundColor Red
        exit 1
    }
    Write-Host "Git repository initialized successfully." -ForegroundColor Green
}

# Add files to staging
Write-Host "Adding files to staging..." -ForegroundColor Cyan
if (0 -ne (Invoke-Git "add .")) {
    Write-Host "Failed to add files to staging." -ForegroundColor Red
    exit 1
}
Write-Host "Files added to staging successfully." -ForegroundColor Green

# Commit changes
$commitMessage = Read-Host "Enter commit message (default: 'Initial Tajmahal Healthcare commit')"
if ([string]::IsNullOrEmpty($commitMessage)) {
    $commitMessage = "Initial Tajmahal Healthcare commit"
}
Write-Host "Committing changes with message: '$commitMessage'..." -ForegroundColor Cyan
if (0 -ne (Invoke-Git "commit -m `"$commitMessage`"")) {
    Write-Host "Failed to commit changes." -ForegroundColor Red
    exit 1
}
Write-Host "Changes committed successfully." -ForegroundColor Green

# Setup GitHub remote
$githubUsername = Read-Host "Enter your GitHub username"
if ([string]::IsNullOrEmpty($githubUsername)) {
    Write-Host "GitHub username cannot be empty." -ForegroundColor Red
    exit 1
}

$repositoryName = Read-Host "Enter the repository name (default: tajmahal-healthcare)"
if ([string]::IsNullOrEmpty($repositoryName)) {
    $repositoryName = "tajmahal-healthcare"
}

# Check if remote already exists
$process = Start-Process -FilePath $gitExe -ArgumentList "remote", "-v" -NoNewWindow -Wait -PassThru -RedirectStandardOutput "remote.txt"
$remoteOutput = Get-Content "remote.txt" -ErrorAction SilentlyContinue
Remove-Item "remote.txt" -ErrorAction SilentlyContinue

if ($remoteOutput -match "origin") {
    Write-Host "Remote 'origin' already exists. Updating it..." -ForegroundColor Yellow
    if (0 -ne (Invoke-Git "remote set-url origin `"https://github.com/$githubUsername/$repositoryName.git`"")) {
        Write-Host "Failed to update GitHub remote." -ForegroundColor Red
        exit 1
    }
}
else {
    Write-Host "Adding GitHub remote..." -ForegroundColor Cyan
    if (0 -ne (Invoke-Git "remote add origin `"https://github.com/$githubUsername/$repositoryName.git`"")) {
        Write-Host "Failed to add GitHub remote." -ForegroundColor Red
        exit 1
    }
}
Write-Host "GitHub remote added/updated successfully." -ForegroundColor Green

# Push to GitHub
$branchName = "main"
Write-Host "Pushing to GitHub ($branchName branch)..." -ForegroundColor Cyan
if (0 -ne (Invoke-Git "push -u origin $branchName")) {
    Write-Host "Failed to push to GitHub." -ForegroundColor Red
    Write-Host "If you're seeing an authentication error, make sure:" -ForegroundColor Yellow
    Write-Host "1. You've created the repository on GitHub" -ForegroundColor Yellow
    Write-Host "2. You have the right username/password or token" -ForegroundColor Yellow
    Write-Host "3. The repository name is correct" -ForegroundColor Yellow
    exit 1
}
Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green

# Display next steps
Write-Host "`nNext Steps:" -ForegroundColor Blue
Write-Host "1. Visit your repository at: https://github.com/$githubUsername/$repositoryName" -ForegroundColor Cyan
Write-Host "2. Set up GitHub Pages in the repository settings (if desired)" -ForegroundColor Cyan
Write-Host "3. Connect your repository to a cloud service for backend hosting" -ForegroundColor Cyan
Write-Host "   - Heroku: https://dashboard.heroku.com/new?template=https://github.com/$githubUsername/$repositoryName" -ForegroundColor Cyan
Write-Host "   - Render: https://render.com/deploy?repo=https://github.com/$githubUsername/$repositoryName" -ForegroundColor Cyan
Write-Host "   - DigitalOcean: https://cloud.digitalocean.com/apps/new" -ForegroundColor Cyan

Write-Host "`nDeployment script completed successfully!" -ForegroundColor Green 