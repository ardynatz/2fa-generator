# 2FA Generator
"2FA Generator" is a simple web application that allows users to generate 2FA (Two-Factor Authentication) codes from their 2FA secret key, similar to the functionality provided by 2fa.live.

## Development Environment Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (version 8 or higher)

### 1. Clone the repository
```bash
git clone https://github.com/ardynatz/2fa-generator.git
cd 2fa-generator
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```
The development server will start, and you can access the application at `http://localhost:5173`.

## Production Deployment

### Build the production version
```bash
npm run build
```

### Build and run the Docker container
```bash
docker build -t 2fa-generator .
docker run -d -p 80:80 -p 443:443 2fa-generator
```

Now the production version of the application is available at `http://localhost` and `https://localhost`.

For deployment to a hosting platform (e.g., AWS ECS, Azure Container Instances, Google Cloud Run, Heroku), the general steps are:

1. Push the Docker image to a container registry.
2. Configure the hosting platform to pull the Docker image and run the container.
3. Set the appropriate environment variables for the production environment.

Refer to the hosting platform's documentation for specific deployment instructions.

I hope this guide helps you get your "2FA Generator" application up and running in production! If you have any further questions or need assistance, don't hesitate to reach out. :)
