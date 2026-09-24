# CoreGridX Technologies — Marketing Website

React + FastAPI + MongoDB marketing site with three qualified lead-capture flows
(contact / quote / consultation), a generated capability-statement PDF, light/dark
theming, and a dark enterprise design system.

## Stack

| Layer    | Tech                                                        |
| -------- | ----------------------------------------------------------- |
| Frontend | React 19, Tailwind CSS, framer-motion, lenis, react-router  |
| Backend  | FastAPI (Python), Motor (async MongoDB), fpdf2, httpx       |
| Database | MongoDB (lead storage)                                      |
| Email    | Managed email proxy (env-keyed) for lead notifications      |

## Local development

```bash
# Backend (http://localhost:8001)
cd backend
pip install -r requirements.txt
cp .env.example .env   # fill in values
uvicorn server:app --host 0.0.0.0 --port 8001 --reload

# Frontend (http://localhost:3000)
cd frontend
yarn install
cp .env.example .env   # point REACT_APP_BACKEND_URL at the backend
yarn start
```

## Environment variables

### backend/.env

| Key                 | Purpose                                              |
| ------------------- | ---------------------------------------------------- |
| `MONGO_URL`         | MongoDB connection string                            |
| `DB_NAME`           | Database name                                        |
| `CORS_ORIGINS`      | Allowed origins (comma-separated, `*` for dev)       |
| `EMERGENT_EMAIL_KEY`| Key for the managed email proxy (lead notifications) |
| `EMAIL_FROM_NAME`   | Sender display name                                  |
| `ADMIN_EMAIL`       | Inbox that receives lead notifications               |

### frontend/.env

| Key                      | Purpose                                                        |
| ------------------------ | -------------------------------------------------------------- |
| `REACT_APP_BACKEND_URL`  | Backend base URL (full-stack mode)                             |
| `REACT_APP_LEAD_ENDPOINT`| Optional: external form endpoint → enables static mode         |
| `REACT_APP_LEAD_KEY`     | Optional: access key for the form endpoint (e.g. Web3Forms)    |
| `REACT_APP_BASENAME`     | Optional: router basename (GitHub Pages project site subpath)  |

## Deploy: GitHub Pages (static, forms still work)

GitHub Pages is static-only, so the FastAPI backend does not run there. The forms
automatically switch to an external form endpoint when `REACT_APP_LEAD_ENDPOINT`
is set at build time.

1. Create a free form endpoint — recommended: [Web3Forms](https://web3forms.com)
   (enter your email, get an access key). Formspree and FormSubmit also work.
2. In your GitHub repo: **Settings → Secrets and variables → Actions**, add:
   - `REACT_APP_LEAD_ENDPOINT` = `https://api.web3forms.com/submit`
   - `REACT_APP_LEAD_KEY` = your Web3Forms access key
3. Push to `main`. The workflow in `.github/workflows/deploy-gh-pages.yml` runs as two
   separate jobs — **Build** (compiles the static site) and **Deploy** (publishes it via
   GitHub's official Pages actions). The first run auto-enables Pages; if it doesn't,
   set **Settings → Pages → Source: GitHub Actions** once.
4. The live URL appears on the workflow run page (the **Deploy** job shows
   `https://<user>.github.io/<repo>/` as its environment URL) and under
   **Deployments → github-pages** in the repo sidebar.
5. Deep links work via the included `public/404.html` SPA redirect. For a user/organization
   page (`<user>.github.io` with no repo subpath), edit `public/404.html` and set
   `pathSegmentsToKeep = 0`, and set `REACT_APP_BASENAME: ""` in the workflow.

The capability statement PDF is a static asset (`public/capability-statement.pdf`),
so the download works on GitHub Pages too. Regenerate it anytime from a running
backend: `curl -o frontend/public/capability-statement.pdf http://localhost:8001/api/capability-statement.pdf`.

## Deploy: VPS (full stack)

1. **MongoDB** — install locally or run in Docker; note the connection string.
2. **Backend**:

```bash
cd backend && pip install -r requirements.txt
cp .env.example .env  # set MONGO_URL, DB_NAME, EMERGENT_EMAIL_KEY, ADMIN_EMAIL
```

   systemd unit (`/etc/systemd/system/coregridx-api.service`):

```ini
[Unit]
Description=CoreGridX API
After=network.target

[Service]
WorkingDirectory=/opt/coregridx/backend
EnvironmentFile=/opt/coregridx/backend/.env
ExecStart=/usr/bin/python3 -m uvicorn server:app --host 127.0.0.1 --port 8001
Restart=always

[Install]
WantedBy=multi-user.target
```

3. **Frontend**:

```bash
cd frontend
# .env: REACT_APP_BACKEND_URL=https://your-domain.com  (basename/endpoint unset)
yarn install && yarn build
```

4. **nginx** — serve the static build and proxy the API:

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;
    root /opt/coregridx/frontend/build;
    index index.html;

    location /api/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location / {
        try_files $uri /index.html;
    }
}
```

   Add TLS with certbot (`certbot --nginx`). Set `CORS_ORIGINS=https://your-domain.com`
   in backend/.env for production.

## Project structure

```
backend/            FastAPI app (server.py), lead APIs, PDF generator, email notify
frontend/           React app
  public/           index.html, 404.html (GH Pages SPA redirect), PDF, manifest, robots
  src/components/   Layout, TopologyCanvas, FramedImage, forms, ...
  src/pages/        Home, About, Services, Solutions, Industries, Approach, Technology,
                    WorkWithUs, Contact
  src/lib/          api.js (backend + static-mode lead submit), content.js (site content)
.github/workflows/  GitHub Pages deployment
```
