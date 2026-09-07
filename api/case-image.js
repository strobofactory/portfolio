export default async function handler(req,res){
  const urls={
    strobo:'https://pikaso.cdnpk.net/private/production/5370880944/3552594404.webp?token=exp=1788998400~hmac=f28e6ba2280994b93bc3dd2e625e70b9a679f7f790e9d4b2c49e9f43c05217b8',
    hapi:'https://pikaso.cdnpk.net/private/production/5371064143/3552689526.png?token=exp=1788998400~hmac=a288fb465d98a73d7aa0e1301ef031052fc39488ec3f1f2146cada5dfabf1df4'
  };
  const key=String(req.query.name||'');
  const url=urls[key];
  if(!url){res.status(404).end();return;}
  try{
    const r=await fetch(url);
    if(!r.ok){res.status(r.status).end();return;}
    const buf=Buffer.from(await r.arrayBuffer());
    res.setHeader('Content-Type',r.headers.get('content-type')||'image/png');
    res.setHeader('Cache-Control','public, max-age=3600, s-maxage=31536000, stale-while-revalidate=31536000');
    res.setHeader('CDN-Cache-Control','public, max-age=31536000');
    res.status(200).send(buf);
  }catch(e){res.status(502).end();}
}
