# Deployment — Contabo (projects.nyronic.com/shaheen-welfare)

## Target

- Host: `contabo` (see `~/.ssh/config` → 169.58.134.88, user root)
- Sibling deployments already live on the same box: `/onboarding`, `/cresent-furniture`,
  `/happytails` — do not touch them.
- This app mounts at **`/shaheen-welfare`**.

## How the box is laid out (discovered during deploy)

1. Inspect the running reverse proxy (`nginx -T | grep -E "server_name|location|proxy_pass"`).
2. Each sibling app is a Node service managed by systemd or PM2 behind the proxy.
3. `projects.nyronic.com` terminates TLS and proxies by path prefix.

## Steps

1. **Ship code** — push to the remote or rsync the tree (excluding `node_modules`, `.next`):

   ```bash
   rsync -az --exclude node_modules --exclude .next --exclude .env ./ contabo:/opt/shaheen-welfare/
   ```

2. **Secrets on the server** — create `/opt/shaheen-welfare/.env` (never commit it) with the
   Supabase / Resend values, plus:

   ```
   NEXT_PUBLIC_BASE_PATH=/shaheen-welfare
   PORT=4310
   ADMIN_EMAIL=mail@shaheen.nyronic.com
   ```

3. **Build & run**:

   ```bash
   cd /opt/shaheen-welfare
   npm ci
   NEXT_PUBLIC_BASE_PATH=/shaheen-welfare npm run build
   pm2 delete shaheen-welfare 2>/dev/null; pm2 start npm --name shaheen-welfare -- start
   pm2 save
   ```

4. **Proxy** — add a location block next to the siblings:

   ```nginx
   location /shaheen-welfare {
       proxy_pass http://127.0.0.1:4310;
       proxy_http_version 1.1;
       proxy_set_header Host $host;
       proxy_set_header X-Forwarded-Proto $scheme;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "upgrade";
   }
   ```

   then `nginx -t && systemctl reload nginx`.

5. **Verify** — `curl -sI https://projects.nyronic.com/shaheen-welfare` must be 200 and the
   page must load with assets under `/shaheen-welfare/_next/...`.

## Notes

- `NEXT_PUBLIC_BASE_PATH` must be set at **build time** (it is inlined into client bundles).
- The app returns 200 on `/shaheen-welfare` and `/shaheen-welfare/` both (basePath root).
- Root path `/` of the subdomain 404s from this app — the proxy keeps serving whatever was there.
