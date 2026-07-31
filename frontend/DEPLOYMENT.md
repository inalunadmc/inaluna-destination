# Deployment to Hostinger

The React frontend can be deployed to Hostinger (or any static host) while continuing
to use the backend API hosted on Emergent's preview URL.

## Backend API URL

The production build uses `REACT_APP_BACKEND_URL` **at build time**. It is baked into
the compiled bundle — you cannot change it without rebuilding.

Both `/app/frontend/.env` and `/app/frontend/.env.production` are pre-configured with:

```
REACT_APP_BACKEND_URL=https://dmc-network-colombia.preview.emergentagent.com
```

Create React App uses `.env.production` automatically when running `yarn build`,
which takes precedence over `.env`. This guarantees the correct API URL is baked
into your Hostinger deploy.

## Build & Deploy to Hostinger

1. Push both `.env` and `.env.production` to your GitHub repository (they are NOT
   in `.gitignore`, so `git add .env .env.production && git commit && git push`
   is enough).
2. On Hostinger, either:
   - **Auto-deploy:** connect your GitHub repo. Set the build command to
     `yarn install && yarn build` and the publish directory to `build/`.
   - **Manual deploy:** run `yarn build` locally, then upload the entire `build/`
     folder to your Hostinger `public_html/` directory.
3. Verify: open the deployed site and inspect a network request — it should POST to
   `https://dmc-network-colombia.preview.emergentagent.com/api/contact`.

## Backend CORS

The backend already allows any origin (`CORS_ORIGINS="*"`), so requests from
`www.inalunadmc.com` (Hostinger) work without additional configuration.

## Troubleshooting

If the deployed site still fails to reach the backend:

- Open DevTools → Network tab and click **Send Request** on the form.
  You will see a request to `/api/contact`. Check the **request URL** column:
  - ✅ Correct: `https://dmc-network-colombia.preview.emergentagent.com/api/contact`
  - ❌ Wrong: `http://localhost:8001/api/contact` or a stale preview subdomain

- If the URL is wrong, the Hostinger build used an outdated `.env`. Re-deploy
  after confirming the two `.env` files above are committed to `main`.

- Hard-refresh the site in the browser: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)
  to bypass CDN/browser cache after a redeploy.
