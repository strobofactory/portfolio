const VIMEO_API = 'https://api.vimeo.com';
const MAX_PAGES = 5;
const PER_PAGE = 100;
const PORTFOLIO_TAG = 'portfolio';

function isVisibleVideo(video) {
  const view = video?.privacy?.view;
  if (!view) return true;
  if (view === 'anybody') return true;
  return process.env.VIMEO_INCLUDE_UNLISTED === 'true' && view === 'unlisted';
}

function hasPortfolioTag(video) {
  const tags = Array.isArray(video?.tags) ? video.tags : [];
  return tags.some(tag => {
    const value = typeof tag === 'string'
      ? tag
      : (tag?.name || tag?.tag || tag?.canonical || '');
    return String(value).trim().toLowerCase() === PORTFOLIO_TAG;
  });
}

function shouldPublish(video) {
  return isVisibleVideo(video) && hasPortfolioTag(video);
}

function toApiUrl(next) {
  if (!next) return '';
  if (/^https:\/\//i.test(next)) return next;
  return `${VIMEO_API}${next.startsWith('/') ? '' : '/'}${next}`;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.VIMEO_ACCESS_TOKEN;
  if (!token) {
    return res.status(503).json({ error: 'VIMEO_ACCESS_TOKEN is not configured' });
  }

  const fields = [
    'uri',
    'name',
    'link',
    'description',
    'created_time',
    'release_time',
    'pictures.sizes',
    'tags',
    'duration',
    'privacy.view'
  ].join(',');

  try {
    const videos = [];
    let nextUrl = `${VIMEO_API}/me/videos?per_page=${PER_PAGE}&page=1&sort=date&direction=desc&fields=${encodeURIComponent(fields)}`;
    let page = 0;

    while (nextUrl && page < MAX_PAGES) {
      const response = await fetch(nextUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.vimeo.*+json;version=3.4',
          'User-Agent': 'STROBOFACTORY-Creative/1.0'
        }
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Vimeo API failed: ${response.status} ${body.slice(0, 160)}`);
      }

      const payload = await response.json();
      if (Array.isArray(payload?.data)) videos.push(...payload.data.filter(shouldPublish));

      nextUrl = toApiUrl(payload?.paging?.next);
      page += 1;
    }

    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=86400');
    return res.status(200).json({
      data: videos,
      meta: {
        count: videos.length,
        pagesFetched: page,
        cachedForSeconds: 900,
        requiredTag: PORTFOLIO_TAG
      }
    });
  } catch (error) {
    console.error('Vimeo API error', error);
    return res.status(502).json({ error: 'Unable to load Vimeo works' });
  }
}
