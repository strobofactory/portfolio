const urls = {
  original: 'https://media.canva.com/v2/image-resize/format:JPG/height:133/quality:75/uri:ifs%3A%2F%2FM%2Feb38ae1b-7617-4c01-9c3a-b8dfd1dfd750/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAPkRYndleWNdc4ZOYdMBlXq3R4KC2M8EK1P0UAWsd4_V&exp=1788884525&osig=AAAAAAAAAAAAAAAAAAAAAO2WhtWyvqnfgW7GnGvs4L_o6yBOdThYdttBmEpg1UVX&signer=media-rpc&x-canva-quality=thumbnail',
  full: 'https://media.canva.com/v2/image-resize/format:JPG/height:1366/quality:100/uri:ifs%3A%2F%2FM%2Feb38ae1b-7617-4c01-9c3a-b8dfd1dfd750/watermark:F/width:2048?csig=AAAAAAAAAAAAAAAAAAAAAPkRYndleWNdc4ZOYdMBlXq3R4KC2M8EK1P0UAWsd4_V&exp=1788884525&osig=AAAAAAAAAAAAAAAAAAAAAO2WhtWyvqnfgW7GnGvs4L_o6yBOdThYdttBmEpg1UVX&signer=media-rpc&x-canva-quality=thumbnail'
};

module.exports = async function handler(req, res) {
  const kind = req.query.kind === 'full' ? 'full' : 'original';
  try {
    const r = await fetch(urls[kind]);
    const b = Buffer.from(await r.arrayBuffer());
    res.status(200).json({ kind, upstreamStatus: r.status, contentType: r.headers.get('content-type'), contentLength: r.headers.get('content-length'), bytes: b.length, magic: b.subarray(0, 12).toString('hex') });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
};
