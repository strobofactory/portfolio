const VIMEO_API = 'https://api.vimeo.com';
const MAX_PAGES = 5;
const PER_PAGE = 100;
const PORTFOLIO_NAME = 'portfolio';

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
    return String(value).trim().toLowerCase() === PORTFOLIO_NAME;
  });
}

function toApiUrl(value) {
  if (!value) return '';
  if (/^https:\/\//i.test(value)) return value;
  return `${VIMEO_API}${value.startsWith('/') ? '' : '/'}${value}`;
}

function headers(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.vimeo.*+json;version=3.4',
    'User-Agent': 'STROBOFACTORY-Creative/1.0'
  };
}

async function requestJson(url, token, optional = false) {
  const response = await fetch(url, { headers: headers(token) });
  if (!response.ok) {
    if (optional && [400, 403, 404].includes(response.status)) return null;
    const body = await response.text();
    throw new Error(`Vimeo API failed: ${response.status} ${body.slice(0, 180)}`);
  }
  return response.json();
}

async function findNamedCollection(token, type, endpoint) {
  let nextUrl = `${VIMEO_API}${endpoint}?per_page=${PER_PAGE}&page=1&fields=${encodeURIComponent('uri,name,metadata.connections.videos.uri')}`;
  let page = 0;

  while (nextUrl && page < MAX_PAGES) {
    const payload = await requestJson(nextUrl, token, true);
    if (!payload) return null;

    const item = (payload?.data || []).find(entry =>
      String(entry?.name || '').trim().toLowerCase() === PORTFOLIO_NAME
    );

    if (item) {
      return {
        type,
        uri: item.uri || '',
        name: item.name || PORTFOLIO_NAME,
        videosUri: item?.metadata?.connections?.videos?.uri || ''
      };
    }

    nextUrl = toApiUrl(payload?.paging?.next);
    page += 1;
  }

  return null;
}

async function detectPortfolioCollection(token) {
  const candidates = [
    ['folder', '/me/projects'],
    ['showcase', '/me/albums'],
    ['portfolio', '/me/portfolios']
  ];

  for (const [type, endpoint] of candidates) {
    const found = await findNamedCollection(token, type, endpoint);
    if (found) return found;
  }

  return null;
}

function fallbackVideosUri(collection) {
  const id = String(collection?.uri || '').split('/').filter(Boolean).pop();
  if (!id) return '';
  if (collection.type === 'folder') return `/me/projects/${id}/videos`;
  if (collection.type === 'showcase') return `/me/albums/${id}/videos`;
  return `${collection.uri}/videos`;
}

async function fetchVideos(url, token, filterFn = isVisibleVideo) {
  const videos = [];
  let nextUrl = url;
  let page = 0;

  while (nextUrl && page < MAX_PAGES) {
    const payload = await requestJson(nextUrl, token);
    if (Array.isArray(payload?.data)) videos.push(...payload.data.filter(filterFn));
    nextUrl = toApiUrl(payload?.paging?.next);
    page += 1;
  }

  return { videos, pagesFetched: page };
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
    const collection = await detectPortfolioCollection(token);
    let result;
    let source;

    if (collection) {
      const connection = collection.videosUri || fallbackVideosUri(collection);
      const separator = connection.includes('?') ? '&' : '?';
      const url = `${toApiUrl(connection)}${separator}per_page=${PER_PAGE}&page=1&sort=date&direction=desc&fields=${encodeURIComponent(fields)}`;
      result = await fetchVideos(url, token, isVisibleVideo);
      source = collection.type;
    } else {
      const url = `${VIMEO_API}/me/videos?per_page=${PER_PAGE}&page=1&sort=date&direction=desc&fields=${encodeURIComponent(fields)}`;
      result = await fetchVideos(url, token, video => isVisibleVideo(video) && hasPortfolioTag(video));
      source = 'tag';
    }

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
    return res.status(200).json({
      data: result.videos,
      meta: {
        count: result.videos.length,
        pagesFetched: result.pagesFetched,
        cachedForSeconds: 300,
        source,
        portfolioName: PORTFOLIO_NAME,
        collectionUri: collection?.uri || null
      }
    });
  } catch (error) {
    console.error('Vimeo API error', error);
    return res.status(502).json({ error: 'Unable to load Vimeo portfolio works' });
  }
}
