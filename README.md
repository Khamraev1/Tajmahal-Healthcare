# Tajmahal Healthcare Website

A comprehensive healthcare and medical tourism website built with Node.js, Express, and MongoDB.

## Features

- Online doctor consultations
- Medical tourism services
- Insurance assistance
- Service information
- Doctor profiles
- Blog system
- Admin dashboard for content management
- Contact form submissions
- Service request and appointment handling

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Express-session, bcryptjs
- **Email**: Nodemailer
- **File Uploads**: Multer

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Standard Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/tajmahal-healthcare.git
cd tajmahal-healthcare
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file in the root directory and add the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/tajmahal-healthcare
SESSION_SECRET=your_session_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
ADMIN_EMAIL=admin@tajmahalhealthcare.com
```

4. Create uploads directory:
```
mkdir -p public/uploads
```

5. Start the server:
```
npm start
```

For development with auto-restart:
```
npm run dev
```

6. Access the application at `http://localhost:3000`

### Docker Installation

1. Make sure you have Docker and Docker Compose installed on your system.

2. Clone the repository:
```
git clone https://github.com/yourusername/tajmahal-healthcare.git
cd tajmahal-healthcare
```

3. Create a `.env` file (optional, as environment variables are set in docker-compose.yml)

4. Build and start the containers:
```
docker-compose up -d
```

5. Access the application at `http://localhost:3000`

To stop the containers:
```
docker-compose down
```

### Admin Access

After starting the server for the first time, a default admin user will be created:
- Username: `admin`
- Password: `admin123`

Access the admin dashboard at `http://localhost:3000/admin/login`

## Deployment

### Deploying to Heroku

1. Create a Heroku account and install the Heroku CLI
2. Initialize a Git repository if not already done:
```
git init
git add .
git commit -m "Initial commit"
```

3. Login to Heroku and create a new app:
```
heroku login
heroku create tajmahal-healthcare
```

4. Add MongoDB add-on or set up your MongoDB Atlas connection:
```
heroku addons:create mongodb
```
OR set your MongoDB Atlas connection string:
```
heroku config:set MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/tajmahal-healthcare
```

5. Set additional environment variables:
```
heroku config:set SESSION_SECRET=your_session_secret
heroku config:set EMAIL_USER=your_email@gmail.com
heroku config:set EMAIL_PASS=your_email_app_password
heroku config:set ADMIN_EMAIL=admin@tajmahalhealthcare.com
heroku config:set NODE_ENV=production
```

6. Deploy the application:
```
git push heroku main
```

7. Open the deployed application:
```
heroku open
```

### Deploying with Docker

1. Build the Docker image:
```
docker build -t tajmahal-healthcare .
```

2. Run the container:
```
docker run -p 3000:3000 --env-file .env -d tajmahal-healthcare
```

### Deploying to Render

1. Create a Render account
2. Create a new Web Service and connect your repository
3. Configure the following settings:
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Environment Variables: Add all the variables from your .env file

4. Click "Create Web Service"
5. Your app will be deployed automatically

### Deploying to DigitalOcean App Platform

1. Create a DigitalOcean account
2. Go to App Platform and create a new app
3. Connect your repository
4. Configure environment variables similar to Heroku setup
5. Deploy the app

## Project Structure

```
tajmahal-healthcare/
├── public/               # Static files
│   ├── uploads/          # Uploaded files
│   ├── index.html        # Main page
│   ├── blog.html         # Blog listing page
│   ├── blog-detail.html  # Blog post page
│   └── ...               # Other static files
├── server.js             # Main server file
├── .env                  # Environment variables
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose configuration
└── package.json          # Dependencies
```

## License

This project is licensed under the MIT License. 