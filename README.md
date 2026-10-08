# BrainPower by Awesome Flavors

A bright, responsive static website for a fictional bubble gum brand.

- **Website:** https://brainpower-awesome-flavors.pages.dev
- **Pipeline:** https://github.com/marcocampos/brainpower/actions
- **Stack:** HTML, CSS, and vanilla JavaScript. No application runtime or build dependencies.

## Local development

Run `npm run preview` and open http://localhost:4173. Python 3 is needed for the local server. Run `npm run build` to validate JavaScript syntax, asset paths, internal links, and metadata (Node 24).

## Deployment

GitHub Actions validates pull requests. Pushes to `main` and manual workflow runs validate the site, upload a static artifact, and deploy it to the Cloudflare Pages project `brainpower-awesome-flavors`. The production deployment is recorded in the GitHub production environment. The workflow follows Cloudflare's direct-upload CI documentation: https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/

Repository Actions secrets `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` are encrypted and never included in the site or source. The token must retain Account / Cloudflare Pages / Edit permission. Rotate it by updating the corresponding GitHub Actions secret. GitHub supplies `GITHUB_TOKEN` automatically.

## Editing

Edit `dist/index.html`, `dist/style.css`, and `dist/app.js`. Product artwork lives in `dist/assets/`. Google Fonts supplies Barlow Condensed and DM Sans with system fallbacks. The flavor selector supports keyboard arrows, Home, End, and clicks. Reduced-motion preferences are respected.

Awesome Flavors, BrainPower, and the flavors are fictional. No store, payment, or mailing-list service is connected. No cognitive or health benefits are claimed.
