# BrainPower by Awesome Flavors

A bright, responsive static website for a fictional bubble gum brand.

- **Website:** https://brainpower-awesome-flavors.pages.dev
- **Pipeline:** https://github.com/marcocampos/brainpower/actions
- **Stack:** HTML, CSS, and vanilla JavaScript. No application runtime or website build dependencies; deployment tooling is pinned in package-lock.json.

## Local development

Run `npm run preview` and open http://localhost:4173. Python 3 is needed for the local server. Run `npm run build` to validate JavaScript syntax, asset paths, internal links, and metadata (Node 24).

## Deployment

GitHub Actions validates pull requests. Pushes to `main` and manual workflow runs validate the site, upload a static artifact, and deploy it to the Cloudflare Pages project `brainpower-awesome-flavors`. The production deployment is recorded in the GitHub production environment. The workflow follows Cloudflare's direct-upload CI documentation: https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/

Production environment Actions secrets `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` are encrypted and never included in the site or source. The token must retain Account / Cloudflare Pages / Edit permission. Rotate it by updating the corresponding GitHub Actions secret. GitHub supplies `GITHUB_TOKEN` automatically.

## Editing

Edit `dist/index.html`, `dist/style.css`, and `dist/app.js`. Product artwork lives in `dist/assets/`. Google Fonts supplies Barlow Condensed and DM Sans with system fallbacks. The flavor selector supports keyboard arrows, Home, End, and clicks. Reduced-motion preferences are respected.

Awesome Flavors, BrainPower, and the flavors are fictional. No store, payment, or mailing-list service is connected. No cognitive or health benefits are claimed.

## CI/CD security

All Actions are pinned to full commit SHAs. Checkout does not persist GitHub credentials. Jobs use read-only repository permissions, hosted ephemeral runners, explicit timeouts, and one-day artifact retention. Pull requests receive no deployment credentials. Production is restricted to the `main` branch both in the workflow and in the GitHub environment policy.

Cloudflare secrets are available only to the publish step in the production environment. Wrangler is version-pinned with a dependency lockfile; installation disables lifecycle scripts and happens before credentials are injected. An override pins patched sharp 0.35.5 for its transitive librsvg advisory. The pipeline rejects high-severity known dependency advisories. Dependabot proposes weekly Action and npm updates for review.

The deployment script checks public assets for the configured credentials and common encodings, then starts Wrangler with a minimal environment and discarded stdout/stderr. Logs show only fixed success/failure messages. Private diagnostic output is intentionally unavailable in Actions; investigate failures through Cloudflare. No debug logging is enabled.

Repository owners and anyone permitted to modify trusted `main` workflows remain trusted: workflow code can access environment secrets. Automatic masking is an additional protection, not a guarantee against malicious code or arbitrary encodings. Cloudflare token policy inspection was denied for the supplied token; its complete permission scope is unverified. Prefer a dedicated Account / Cloudflare Pages / Edit token restricted to the deployment account. The existing shared token was not altered or revoked.
