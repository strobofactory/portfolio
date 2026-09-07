export default async function handler(req,res){
  const url='https://pikaso.cdnpk.net/private/production/5370181267/3552233791.png?token=exp=1788998400~hmac=d036f4c0139501ef0cbe0129dbd3f0367dae269fcbe474dd9cfe18e40f406896';
  try{
    const r=await fetch(url);
    if(!r.ok){res.status(r.status).end();return;}
    const buf=Buffer.from(await r.arrayBuffer());
    res.setHeader('Content-Type',r.headers.get('content-type')||'image/png');
    res.setHeader('Cache-Control','public, max-age=86400, s-maxage=31536000, stale-while-revalidate=31536000');
    res.setHeader('CDN-Cache-Control','public, max-age=31536000');
    res.status(200).send(buf);
  }catch(e){
    res.status(502).end();
  }
}
