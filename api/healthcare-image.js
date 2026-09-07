const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    const parts = Array.from({ length: 10 }, (_, i) => {
      const name = `hq${String(i).padStart(2, '0')}.b64`;
      return fs.readFileSync(path.join(process.cwd(), 'assets', name), 'utf8').trim();
    });
    const image = Buffer.from(parts.join(''), 'base64');

    res.setHeader('Content-Type', 'image/webp');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.status(200).send(image);
  } catch (error) {
    res.status(500).send('image unavailable');
  }
};
