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

function toApiUrl(next) {
  if (!next) return '';
  if (/^https:\/\//i.test(next)) return next;
  return `${VIMEO_API}${next.startsWith('/') ? '' : '/'}${next}`;
}

function headers(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.vimeo.*+json;version=3.4',
    'User-Agent': 'STROBOFACTORY-Creative/1.0'
  };
}

async function getJson(url, token) {
  const response = await fetch(url, { headers: headers(token) });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Vimeo API failed: ${response.status} ${body.slice(0, 180)}`);
  }
  return response.json();
}

async function findPortfolioProject(token) {
  let nextUrl = `${VIMEO_API}/me/projects?per_page=${PER_PAGE}&page=1&sort=date&direction=desc&fields=uri,name`;
  let page = 0;

  while (nextUrl && page < MAX_PAGES) {
    const payload = await getJson(nextUrl, token);
    const project = (payload?.data || []).find(item =>
      String(item?.name || '').trim().toLowerCase() === PORTFOLIO_NAME
    );
    if (project) return project;
    nextUrl = toApiUrl(payload?.paging?.next);
    page += 1;
  }

  return null;
}

async function fetchVideos(url, token, fields, filterFn = isVisibleVideo) {
  const videos = [];
  let nextUrl = url;
  let page = 0;

  while (nextUrl && page < MAX_PAGES) {
    const payload = await getJson(nextUrl, token);
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
    const project = await findPortfolioProject(token);
    let result;
    let source;

    if (project?.uri) {
      const projectId = String(project.uri).split('/').filter(Boolean).pop();
      const url = `${VIMEO_API}/me/projects/${encodeURIComponent(projectId)}/videos?per_page=${PER_PAGE}&page=1&sort=date&direction=desc&fields=${encodeURIComponent(fields)}`;
      result = await fetchVideos(url, token, fields, isVisibleVideo);
      source = 'project';
    } else {
      const url = `${VIMEO_API}/me/videos?per_page=${PER_PAGE}&page=1&sort=date&direction=desc&fields=${encodeURIComponent(fields)}`;
      result = await fetchVideos(url, token, fields, video => isVisibleVideo(video) && hasPortfolioTag(video));
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
        projectUri: project?.uri || null
      }
    });
  } catch (error) {
    console.error('Vimeo API error', error);
    return res.status(502).json({ error: 'Unable to load Vimeo portfolio works' });
  }
}
