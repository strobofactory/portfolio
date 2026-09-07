# STROBOFACTORY Creative

Standalone Creative Works site for `creative.strobofactory.net`.

## Vercel project

Create a separate Vercel project from the existing GitHub repository:

- Repository: `strobofactory/portfolio`
- Root Directory: `creative`
- Framework Preset: Other
- Production domain: `creative.strobofactory.net`

The existing `products.strobofactory.net` project remains rooted at the repository root and is not changed by this site.

## Vimeo API

The browser never calls Vimeo directly. `/api/vimeo` runs server-side on Vercel and reads the token from an environment variable.

Required environment variable:

```text
VIMEO_ACCESS_TOKEN=<personal access token>
```

Recommended Vimeo token configuration:

- Authenticated (you)
- Read-only scopes needed for video metadata
- Add Private scope only if Vimeo requires it to read metadata for account videos that are not fully public

The API response is cached for 15 minutes at the Vercel edge, with stale content allowed during revalidation.

## Vimeo metadata convention

The site can infer categories from ordinary Vimeo tags. For deterministic display, use these optional prefixed tags:

```text
category:Corporate
category:Commercial
category:AI Video
category:Animation
category:YouTube
category:Live / Event
client:Client Name
```

If `category:` is omitted, the frontend infers a category from the title, description and tags. Year is derived automatically from Vimeo's release or creation date.

## Structure

```text
creative/
  index.html
  styles.css
  script.js
  api/
    vimeo.js
  vercel.json
```
