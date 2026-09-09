const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    const indexPath = path.join(process.cwd(), 'index.html');
    let html = fs.readFileSync(indexPath, 'utf8');

    html = html
      .replace('CLIENT SYSTEMS / PLATFORMS', 'CLIENT SYSTEMS / AUTOMATION / PLATFORMS')
      .replace('Client systems &amp; platforms', 'Client systems &amp; automation');

    const extraCases = `
  <article class="caseStudy">
    <div class="caseIntro">
      <p class="category">Business Automation / Sales Operations</p>
      <h3>Sales Automation Platform</h3>
      <p class="desc">アウトバウンド営業の候補抽出から送信管理までを自動化</p>
    </div>
    <div class="caseBody">
      <p>自社の新規営業で実際に運用するため、営業対象企業の候補抽出、重複排除、除外管理、問い合わせフォーム処理、メール送信、実行ログ、ステータス管理までを一つのワークフローとして設計・開発しています。</p>
      <p>キャンペーンや対象業界ごとに処理を分離し、二重送信や誤送信を防ぎながら継続運用できる構成を採用。CAPTCHAや送信失敗、手動対応が必要なケースも状態として分類し、自動処理と人による確認を切り分けています。</p>
      <p class="caseWide">単純な一斉送信ツールではなく、候補選定、送信可否判定、履歴、除外、再送防止、エラー処理までを含む営業オペレーション全体をシステム化。実際の営業活動で運用しながら改善を続けています。</p>
      <div class="caseMeta"><div><strong>Automation</strong><span>Lead / Outreach workflow</span></div><div><strong>Stateful</strong><span>History / Suppression / Retry</span></div><div><strong>In production</strong><span>Internal sales operations</span></div></div>
      <div class="caseStack"><span>Python</span><span>Git / GitHub</span><span>Gmail</span><span>Web Forms</span><span>API Integration</span><span>Logging</span><span>State Management</span></div>
    </div>
  </article>
  <article class="caseStudy">
    <div class="caseIntro"><p class="category">Slack / Operations Automation</p><h3>Slack Operations Automation</h3><p class="desc">Slackを業務システムの通知・運用インターフェースとして活用</p></div>
    <div class="caseBody">
      <p>Slackを単なるチャットツールではなく、営業や社内業務の実行結果、進捗、エラー、定期情報を集約する運用基盤として利用。外部システムやAPIから必要な情報を自動通知できる構成を開発しています。</p>
      <p>Google Apps Scriptや外部API等と連携し、担当者が個別の管理画面を巡回しなくても、Slack上で状況を把握できるように設計。複数ワークスペースを含む実運用に合わせて通知先と用途を整理しています。</p>
      <p class="caseWide">営業自動化や各種業務ツールと組み合わせ、異常時の通知、処理結果の共有、定期レポートなど、人が確認すべきポイントをSlackへ集約することで、日常業務の確認コストを減らす運用を構築しています。</p>
      <div class="caseMeta"><div><strong>Slack</strong><span>Operations interface</span></div><div><strong>Integrated</strong><span>GAS / APIs / Business tools</span></div><div><strong>Automated</strong><span>Alerts / Reports / Status</span></div></div>
      <div class="caseStack"><span>Slack</span><span>Google Apps Script</span><span>API Integration</span><span>Automation</span><span>Notifications</span><span>Operations</span></div>
    </div>
  </article>
  <article class="caseStudy">
    <div class="caseIntro"><p class="category">Accounting Automation / AI + API Integration</p><h3>Accounting Automation Platform</h3><p class="desc">AI・会計API・業務ツールを統合した経理オペレーション基盤</p></div>
    <div class="caseBody">
      <p>Claude Codeと会計APIを中核に、Gmail、Google Drive、Google Sheets、Slack、Make、macOSの定期実行を組み合わせ、領収書集約、月次管理、請求業務、経理通知、会計処理の下準備までを一つの運用フローとして構築しています。</p>
      <p>日次・月次処理はスケジュール実行し、結果をSlackへ自動通知。複数のメールアドレスに届く領収書・請求書を集約し、検索条件による抽出、ファイル名の標準化、共有ドライブへの保存、会計システムへの受け渡しまでを自動化しています。</p>
      <p class="caseWide">資金繰り管理ではGoogle Sheets APIとPythonを利用し、独自の月次フォーマットを自動生成。請求業務も旧サービスから会計基盤へ移行し、過去の請求書・見積書あわせて1,012件をアーカイブしたうえで、定期請求・提出リマインド・アップロード通知を統合しています。</p>
      <p class="caseWide">自動化できる範囲と人が判断すべき範囲を明確に分離し、API連携時の二重計上リスクや、UIでのみ扱うべき処理なども実運用の中で検証。判断に迷う処理は保留し、AI、担当者、会計システム、税務判断の責任境界を崩さない設計にしています。</p>
      <div class="caseMeta"><div><strong>Scheduled</strong><span>Daily / Monthly operations</span></div><div><strong>Integrated</strong><span>Accounting / Mail / Drive / Slack</span></div><div><strong>Guardrailed</strong><span>Human review / Exception handling</span></div></div>
      <div class="caseStack"><span>Claude Code</span><span>freee API / MCP</span><span>Python</span><span>Gmail</span><span>Google Drive</span><span>Google Sheets API</span><span>Slack</span><span>Google Apps Script</span><span>Make</span><span>launchd</span></div>
    </div>
  </article>`;

    const marker = '</section>\n</main>';
    const pos = html.lastIndexOf(marker);
    if (pos === -1) throw new Error('systems section marker not found');
    html = html.slice(0, pos) + extraCases + html.slice(pos);

    const responsiveCss = `
<style id="products-responsive-v2">
html,body{max-width:100%;overflow-x:hidden}
img{max-width:100%}
@media(max-width:900px){
  .topbar{height:auto;min-height:72px;padding:16px 24px;gap:18px;align-items:flex-start;flex-wrap:wrap}
  .topbar nav{width:100%;gap:20px;overflow-x:auto;white-space:nowrap;padding-bottom:2px;-webkit-overflow-scrolling:touch;scrollbar-width:none}
  .topbar nav::-webkit-scrollbar{display:none}
  .topbar nav a{padding:8px 0 7px;flex:0 0 auto}
  .langSwitch{flex:0 0 auto}
  .hero{min-height:auto;padding:68px 24px 0}
  .heroCopy{width:100%;max-width:none}
  .hero h1{font-size:clamp(72px,14vw,118px);line-height:.82}
  .heroVisual{position:relative;right:auto;bottom:auto;width:112%;height:auto;margin:22px -6% 0;justify-content:center}
  .heroVisual img{width:100%;transform:none}
  .products,.systems{padding-left:24px;padding-right:24px}
  .grid{grid-template-columns:1fr}
  .card,.card:nth-child(odd),.card:nth-child(even){padding:32px 0;border-right:0}
  .caseStudy{grid-template-columns:1fr;gap:30px}
  .caseBody{grid-template-columns:1fr}
  .caseBody .caseWide,.caseMeta,.caseStack{grid-column:auto}
}
@media(max-width:640px){
  .topbar{padding:14px 18px;gap:12px}
  .brand{font-size:12px;letter-spacing:.11em;max-width:100%}
  .topbar nav{gap:15px;font-size:10px}
  .langSwitch button{font-size:10px;padding:5px 2px}
  .hero{padding:46px 18px 0}
  .eyebrow,.kicker{font-size:9px;letter-spacing:.16em}
  .hero h1{font-size:clamp(54px,18vw,76px);margin:21px 0 25px;letter-spacing:-.065em}
  .lead{font-size:14px;line-height:1.72}
  .heroMeta{display:grid;grid-template-columns:1fr 1fr;gap:16px 20px;margin-top:28px;padding-top:18px}
  .heroStat:last-child{grid-column:1/-1}
  .heroVisual{width:124%;margin:12px -12% 0}
  .products{padding:54px 18px 70px}
  .systems{padding:0 18px 70px}
  .sectionHead,.systemsHead{margin-bottom:28px}
  h2{font-size:clamp(38px,13vw,58px);overflow-wrap:anywhere}
  .filters{width:100%;gap:12px 16px;justify-content:flex-start}
  .filters button{font-size:10px}
  .card{grid-template-columns:96px minmax(0,1fr);gap:18px;min-height:0}
  .appIcon{width:88px;height:88px;flex-basis:88px;border-radius:21px}
  .cardTop{gap:12px}
  .card h3{font-size:21px;padding-right:18px;overflow-wrap:anywhere}
  .desc{font-size:12px;line-height:1.65}
  .status{font-size:8px}
  .stack{display:none}
  .cardFoot{right:0;top:22px}
  .caseStudy{padding:32px 0 38px;gap:22px}
  .caseVisual{margin:0;border-left:0;border-right:0}
  .caseVisual img{width:100%;height:auto;aspect-ratio:auto!important;object-fit:contain!important}
  .caseIntro h3{font-size:30px;overflow-wrap:anywhere}
  .caseBody{gap:18px}
  .caseBody p{font-size:13px;line-height:1.75}
  .caseMeta{grid-template-columns:1fr;gap:14px}
  .caseMeta>div:last-child{grid-column:auto}
  .caseStack{gap:7px 12px}
  footer{padding:30px 18px 40px;grid-template-columns:1fr;gap:16px}
}
@media(max-width:420px){
  .topbar nav a[href*="strobofactory.net"]{display:none}
  .hero h1{font-size:52px}
  .heroMeta{grid-template-columns:1fr 1fr}
  .card{grid-template-columns:78px minmax(0,1fr);gap:14px}
  .appIcon{width:72px;height:72px;flex-basis:72px;border-radius:18px}
  .card h3{font-size:19px}
  .desc{font-size:11.5px}
  .caseIntro h3{font-size:27px}
}
</style>`;
    html = html.replace('</head>', responsiveCss + '</head>');
    html = html.replace('</body>', '<script src="/products-i18n.js"></script><script src="/products-i18n-long.js"></script><script src="/products-lang-ui.js"></script></body>');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('site unavailable');
  }
};
