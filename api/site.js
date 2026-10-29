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
  <article class="caseStudy learningCase">
    <div class="caseVisual learningCaseVisual"><img src="/assets/precision-nutrition-learning-app.webp?v=20261029" alt="精密栄養カウンセラー講座 学習アプリのホーム・4択問題・正誤フィードバック画面" loading="lazy" decoding="async"></div>
    <div class="caseIntro">
      <p class="category">Learning Web App / Spaced Repetition / AI-assisted</p>
      <h3>精密栄養カウンセラー講座 学習アプリ</h3>
      <p class="desc">動画で学ぶ講座内容を、スマホで遊びながら「自分で思い出せる知識」に変えるDuolingo型の学習Webアプリ。</p>
    </div>
    <div class="caseBody">
      <p>清書済みの講義原稿をもとに245問を制作し、分野をまたいだランダム出題と間隔反復で復習できる学習Webアプリです。企画から公開、利用者追加までを2026年10月27〜28日の2日間で行い、初期版は原稿41本・5区分から245問を構成。現在は社内4名が利用しています。</p>
      <p>背景には、動画教材は「見た」だけでは知識が残りにくく、視聴しながら詳細なノートを取るのも現実的ではないという課題がありました。そこで、約53万字・245本の清書済み原稿を学習データとして再利用し、動画視聴を「思い出す練習」へ変換しました。</p>

      <div class="caseWide caseSection">
        <h4>学習コンセプト</h4>
        <p>中心にあるのは「見る」から「思い出す」への転換です。忘れかけたタイミングで自力で答えることを重視し、6つの仕組みを組み合わせています。</p>
        <ul>
          <li><strong>混ぜて出す（インターリーブ）</strong> — 講座単位ではなく全区分からランダムに出題し、同じ原稿・区分が続かないように配置。</li>
          <li><strong>間をあけて繰り返す（間隔反復）</strong> — 正解は1日、2日、4日……と間隔を広げ、誤答は翌日に再出題。間隔を空けても答えられた問題を「定着」と判定。</li>
          <li><strong>間違えたら最後にやり直す</strong> — 誤答はセット末尾へ戻し、正解するまでセットを完了させない設計。</li>
          <li><strong>やさしく始める（段階解放）</strong> — 難易度1「基礎」から開始し、20問定着で「標準」、80問で「応用」を解放。</li>
          <li><strong>続けたくなる仕掛け</strong> — XP、レベル、連続学習日数、コース全体と区分ごとの定着率を静かに可視化。</li>
          <li><strong>すきま時間で終わる</strong> — 5・10・20問から選択でき、新規問題は1日25問まで。途中保存と続きからの再開に対応。</li>
        </ul>
      </div>

      <div class="caseWide caseSection">
        <h4>コンテンツ設計と検証</h4>
        <p>問題は講義原稿の本文だけを根拠にし、医療・健康教材として量より正確さを優先しました。245本の原稿から34カテゴリ・全5区分をまたぐ41本を選び、清書時の修正記録と未決着の確認事項を読み、保留・疑義のある数字、固有名詞、因果関係47箇所は出題対象から除外しています。</p>
        <p>1原稿あたり6問を基準に、4択129問、正誤56問、穴埋め40問、並べ替え20問を作成。難易度は「1：用語・基本」77問、「2：仕組みの理解」133問、「3：区別・応用」35問に分類しました。</p>
        <p>作問に使ったAIとは別のAIで全問を原稿と照合し、正解が本文どおりか、誤答に正しい選択肢が紛れていないかなど6項目を検証。4問を修正、1問を削除しました。この過程で原稿本文側にも医学的に疑わしい記述を4本分見つけ、教材の見直し候補として抽出しています。</p>
      </div>

      <div class="caseWide caseSection">
        <h4>体験とデザイン</h4>
        <p>HAPIVERI Healthcareのブランドトーンに合わせ、白・ネイビー・クリーム、細い罫線、角のないボタン、LatoとNoto Sans JPを中心にしたミニマルなUIを設計。ダークモードはブランドの濃紺を地色にしています。</p>
        <ul>
          <li>ホーム・問題・結果の3画面に絞り、「1画面に1つのこと」を徹底。</li>
          <li>選択肢をタップした瞬間に正誤判定し、正解は緑、不正解は赤系の面でフィードバック。</li>
          <li>解答後に原稿に沿った解説と出典講義名を表示し、見直す動画へ戻れる構成。</li>
          <li>正解・不正解・セット完了・レベルアップの効果音をWeb Audio APIで端末内合成。</li>
          <li>iPhone / iPadのホーム画面追加に対応し、ブラウザ枠のない全画面Webアプリとして利用可能。</li>
        </ul>
      </div>

      <div class="caseWide caseSection">
        <h4>技術構成</h4>
        <p>画面はVercelから配信し、データとログインはSupabase（PostgreSQL）に配置。自前サーバーを持たない構成で運用負荷を抑えています。テーブルへの直接アクセスは閉じ、問題と学習記録の読み書きは5つのDB関数だけを経由。名簿登録済みかつメール確認済みの利用者かを確認し、自分自身の記録だけを扱うよう制御しています。</p>
        <p>フロントエンドはフレームワークを使わず、1枚のHTMLとVanilla JavaScriptで実装。間隔反復、出題順の制御、途中保存をクライアント側で行い、通信が切れても記録を保持し、再接続時に自動保存します。</p>
      </div>

      <div class="caseWide caseSection">
        <h4>公開後の改善</h4>
        <ul class="feedbackList">
          <li><strong>デザインが洗練されていない</strong> → HAPIVERIのトーンでミニマルに再設計。</li>
          <li><strong>間違えた問題をやり直したい</strong> → セット末尾で正解するまで再出題。</li>
          <li><strong>どこまで進んだか知りたい</strong> → レベル、XP、コース定着率を追加。</li>
          <li><strong>途中から始めたい</strong> → 解答ごとに保存し、再起動後も続きから再開。</li>
          <li><strong>スマホ・iPadで使いたい</strong> → ホーム画面追加対応のWebアプリとして公開。</li>
          <li><strong>正誤がわかりづらい</strong> → 面で示す色フィードバックと効果音を追加。</li>
          <li><strong>初回が難しい</strong> → 基礎から始める段階解放へ変更。</li>
        </ul>
      </div>

      <div class="caseWide caseSection">
        <h4>制作体制とAI活用</h4>
        <p>企画・ディレクションは岩松が担当し、目的と要件、学習方針、デザイン方向、公開・DB変更の承認、実機検証、社内展開を担いました。設計・実装・問題制作は生成AI（Claude）を中心に進めています。</p>
        <p>問題制作は5つのAIへ並行分担し、作成に関わっていない別のAIが原稿照合を担当。作る側と確かめる側を分離し、AIが自分の仕事を自己採点しない工程にしました。公開やデータベース変更など影響の大きい操作は、人の承認後にのみ実行しています。</p>
      </div>

      <div class="caseWide caseSection">
        <h4>成果と今後</h4>
        <p>2日間で、動画教材を「思い出す練習」へ変える仕組みを企画から社内利用開始まで立ち上げました。初期版は41本の原稿から245問、利用者4名。今後は残り204本の原稿にも同じ手順を適用し、講座全体へ拡張します。応用問題の追加と難易度の細分化、同じ原稿データを使った図解入り読み物教材も計画しています。</p>
      </div>

      <div class="caseMeta">
        <div><strong>245 questions</strong><span>41 scripts / 5 sections</span></div>
        <div><strong>2 days</strong><span>2026.10.27–28</span></div>
        <div><strong>4 users</strong><span>Internal launch</span></div>
      </div>
      <div class="caseStack"><span>Vanilla JavaScript</span><span>HTML</span><span>Supabase</span><span>PostgreSQL</span><span>RLS</span><span>DB Functions</span><span>Vercel</span><span>Web Audio API</span><span>PWA</span><span>Spaced Repetition</span><span>Interleaving</span><span>Claude</span></div>
    </div>
  </article>
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


    const lpSection = `
<section class="landingPages" id="landing-pages">
  <div class="landingHead">
    <div><div class="kicker">LANDING PAGE / PRODUCT SITE</div><h2>Landing pages</h2></div>
  </div>
  <div class="landingGrid">
    <a class="landingCard" href="https://kokone.hapiveri.com/" target="_blank" rel="noreferrer">
      <div class="landingShot"><img src="/assets/lp-kokone.jpg?v=20261015" alt="ここね / Kokone ランディングページ" loading="lazy" decoding="async"></div>
      <div class="landingInfo">
        <p class="category">Landing Page / iOS + AI</p>
        <h3>ここね / Kokone</h3>
        <p class="desc">声の日記アプリ「ここね / Kokone」の製品LP。サービスのコンセプト、機能、利用イメージ、アプリへの導線を1ページで設計・実装。</p>
        <span class="landingLink">View live site ↗</span>
      </div>
    </a>
    <a class="landingCard" href="https://sweepline.strobofactory.net/" target="_blank" rel="noreferrer">
      <div class="landingShot"><img src="/assets/lp-sweepline.jpg?v=20261008" alt="Sweepline for Mac ランディングページ" loading="lazy" decoding="async"></div>
      <div class="landingInfo">
        <p class="category">Landing Page / macOS Utility</p>
        <h3>Sweepline for Mac</h3>
        <p class="desc">Macの空き容量を増やすSweepline for Macの製品LP。機能、安心設計、FAQ、購入導線までを1ページで設計・実装。</p>
        <span class="landingLink">View live site ↗</span>
      </div>
    </a>
    <a class="landingCard" href="https://pkpassport.strobofactory.net/" target="_blank" rel="noreferrer">
      <div class="landingShot"><img src="/assets/lp-pkpassport.jpg?v=20261008" alt="PKPassport for Mac ランディングページ" loading="lazy" decoding="async"></div>
      <div class="landingInfo">
        <p class="category">Landing Page / macOS Utility</p>
        <h3>PKPassport for Mac</h3>
        <p class="desc">MacからWindowsへ送るZIPの互換性課題を解決するPKPassport for Macの製品LP。課題提示、機能、価格、購入導線までを設計・実装。</p>
        <span class="landingLink">View live site ↗</span>
      </div>
    </a>
  </div>
</section>`;

    html = html.replace('<section class="systems" id="systems">', lpSection + '\n<section class="systems" id="systems">');

    const marker = '</section>\n</main>';
    const pos = html.lastIndexOf(marker);
    if (pos === -1) throw new Error('systems section marker not found');
    html = html.slice(0, pos) + extraCases + html.slice(pos);

    const responsiveCss = `
<style id="products-responsive-v2">
html,body{max-width:100%;overflow-x:hidden}
img{max-width:100%}
.landingPages{max-width:1440px;margin:0 auto;padding:0 42px 110px}
.landingHead{display:flex;justify-content:space-between;align-items:flex-end;gap:40px;margin-bottom:36px}
.landingGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px}
.landingCard{display:block;border-top:1px solid var(--ink);border-bottom:1px solid var(--line);padding:22px 0 28px;transition:background .2s ease}
.landingCard:hover{background:var(--soft)}
.landingShot{aspect-ratio:16/10;overflow:hidden;border:1px solid var(--line);background:#f5f7f8}
.landingShot img{display:block;width:100%;height:100%;object-fit:cover;object-position:top center}
.landingInfo{padding:22px 2px 0}
.landingInfo h3{font-size:30px;line-height:1.08;letter-spacing:-.04em;margin:0 0 12px}
.landingInfo .desc{max-width:none}
.landingLink{display:inline-block;margin-top:18px;font-size:10px;letter-spacing:.1em;text-transform:uppercase;border-bottom:1px solid var(--accent);padding-bottom:4px}
.websitePages .landingGrid{align-items:start}
.websiteCard{cursor:default}
.websiteCardLink{display:block}
.websiteDetails{margin-top:28px;padding-top:24px;border-top:1px solid var(--line)}
.websiteDetails p{font-size:13px;line-height:1.85;color:#475158;margin:0 0 16px}
.websiteDetails p:last-child{margin-bottom:0}
.websiteMeta{margin-top:24px}
.websiteMeta strong{font-size:13px}
.websiteMeta span{font-size:8px;line-height:1.45}
.websiteStack{margin-top:0;padding-top:18px}
.learningCaseVisual{background:#f5f7f8}
.learningCaseVisual img{aspect-ratio:auto!important;object-fit:contain!important;background:#f5f7f8}
.caseSection{padding-top:10px}
.caseSection h4{font-size:18px;line-height:1.35;letter-spacing:-.02em;margin:0 0 14px;color:var(--ink)}
.caseSection ul,.caseSection ol{margin:0;padding-left:20px}
.caseSection li{font-size:13px;line-height:1.8;color:#475158;margin:0 0 9px}
.caseSection li:last-child{margin-bottom:0}
.feedbackList strong{color:var(--ink)}
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
  .products,.systems,.landingPages{padding-left:24px;padding-right:24px}
  .landingGrid{gap:20px}
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
  .landingPages{padding:0 18px 70px}
  .landingGrid{grid-template-columns:1fr;gap:24px}
  .landingHead{margin-bottom:24px}
  .landingInfo h3{font-size:26px}
  .websiteDetails{margin-top:22px;padding-top:20px}
  .websiteDetails p{font-size:12.5px;line-height:1.75}
  .websiteMeta{grid-template-columns:1fr;gap:12px}
  .websiteMeta>div:last-child{grid-column:auto}
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
