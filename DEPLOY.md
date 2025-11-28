# Deployment Guide

Since this is a static site built with Vite, you can deploy it to any web server (Nginx, Apache, Caddy) or static hosting service (GitHub Pages, Vercel, Netlify).

## Option 1: GitHub Actions (Recommended)

This method automatically deploys your site via SSH whenever you push to the `main` branch.

### 1. Prerequisites
- A GitHub repository for this project.
- A web server with SSH access.
- Nginx or Apache configured to serve the `dist` folder.

### 2. Setup Secrets
Go to your GitHub Repository > Settings > Secrets and variables > Actions > New repository secret. Add the following:

- `HOST`: Your server IP or domain (e.g., `sunrizd.net`).
- `USERNAME`: Your SSH username (e.g., `admin`).
- `KEY`: Your private SSH key content (generated with `ssh-keygen`).
- `PORT`: SSH port (default `22`).

### 3. Workflow File
I have created a workflow file for you at `.github/workflows/deploy.yml`. It does the following:
1. Checks out your code.
2. Installs dependencies (`npm ci`).
3. Builds the project (`npm run build`).
4. Uses `rsync` to copy the `dist/` folder to your server.

## Option 2: Manual Deployment

If you prefer to deploy manually from your terminal:

```bash
# 1. Build the project
npm run build

# 2. Copy to server (replace user@host and path)
scp -r dist/* user@your-server:/var/www/html/
# OR using rsync (better)
rsync -avz --delete dist/ user@your-server:/var/www/html/
```

## Server Configuration (Nginx Example)

Ensure your Nginx config points to the correct directory and handles the SPA fallback (though this is a static site, it's good practice):

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```
