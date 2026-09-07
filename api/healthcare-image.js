const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    const parts = [0, 1, 2, 3].map((i) =>
      fs.readFileSync(path.join(process.cwd(), 'assets', `hc${i}.b64`), 'utf8').trim()
    );
    const image = Buffer.from(parts.join(''), 'base64');
    res.setHeader('Content-Type', 'image/webp');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=31536000, immutable');
    res.status(200).send(image);
  } catch (error) {
    res.status(500).send('image unavailable');
  }
};
