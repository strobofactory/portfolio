export default async function handler(req, res) {
  const { source, id, handle } = req.query || {};

  try {
    let image = null;

    if (source === 'itunes') {
      const appId = String(id || '').replace(/\D/g, '');
      if (!appId) return res.status(400).json({ error: 'Missing app id' });

      const response = await fetch(`https://itunes.apple.com/lookup?id=${appId}&country=jp&entity=software`, {
        headers: { 'User-Agent': 'STROBOFACTORY-Products/1.0' }
      });
      if (!response.ok) throw new Error(`Apple lookup failed: ${response.status}`);
      const data = await response.json();
      const item = data?.results?.[0];
      image = item?.artworkUrl512 || item?.artworkUrl100 || null;
    } else if (source === 'shopify') {
      const productHandle = String(handle || '');
      if (!/^[a-z0-9-]+$/.test(productHandle)) {
        return res.status(400).json({ error: 'Invalid product handle' });
      }

      const response = await fetch(`https://strobofactory.net/products/${productHandle}.js`, {
        headers: { 'User-Agent': 'STROBOFACTORY-Products/1.0' }
      });
      if (!response.ok) throw new Error(`Shopify product lookup failed: ${response.status}`);
      const product = await response.json();
      image = product?.featured_image || product?.images?.[0] || null;
      if (image && image.startsWith('//')) image = `https:${image}`;
    } else {
      return res.status(400).json({ error: 'Unsupported source' });
    }

    if (!image) return res.status(404).json({ error: 'Icon not found' });

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800');
    return res.status(200).json({ image });
  } catch (error) {
    return res.status(502).json({ error: error instanceof Error ? error.message : 'Icon lookup failed' });
  }
}
