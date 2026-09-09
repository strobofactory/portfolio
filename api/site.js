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

    // Add a compact language switch to the existing navigation.
    html = html.replace('</nav></header>', '<span class="langSwitch" role="group" aria-label="Language"><button type="button" data-lang="ja" class="active">JA</button><span>/</span><button type="button" data-lang="en">EN</button></span></nav></header>');
    html = html.replace('</style>', '.langSwitch{display:inline-flex;align-items:center;gap:6px;margin-left:4px}.langSwitch button{border:0;background:transparent;padding:4px 2px;cursor:pointer;font-size:11px;letter-spacing:.08em;color:var(--muted)}.langSwitch button.active,.langSwitch button:hover{color:var(--accent-dark)}.langSwitch span{color:#a1a8ac;font-size:10px}@media(max-width:760px){.topbar{padding:0 18px}.topbar nav{gap:12px}.langSwitch{margin-left:0}}\n</style>');

    // English copy for every Japanese text node currently used on the Products / Systems homepage.
    const translations = {
      '企画、設計、実装、公開、運用まで。STROBOFACTORYが実際に開発し、リリースしているソフトウェアプロダクトをまとめています。':'From concept and design to implementation, release, and operation. A portfolio of software products actually developed and released by STROBOFACTORY.',
      '登山中の位置情報と生体データを記録し、心拍・SpO₂・気象・地図を統合する登山アプリ。':'A hiking app that records location and biometric data, integrating heart rate, SpO₂, weather, and maps.',
      '声や記録をもとにAIが感情を分析し、日々の振り返りを支援するジャーナリングアプリ。':'An AI journaling app that analyzes emotions from voice and personal records to support daily reflection.',
      'Shopify直販、ライセンス発行、署名付き自動アップデートまで含めて構築したmacOSユーティリティ。':'A macOS utility built with direct Shopify sales, license issuance, and signed automatic updates.',
      '自社販売基盤とライセンス運用を組み合わせたmacOSユーティリティ。':'A macOS utility integrating our own sales infrastructure with license management.',
      '季節によって一刻の長さが変わる江戸時代の不定時法を、現代の端末上で再構成した時刻アプリ。':'A time app that recreates the Edo-period temporal hour system, in which the length of an hour changes with the seasons.',
      '子どものお手伝いを記録し、継続を楽しく支援するファミリー向けアプリ。':'A family app that records children’s household tasks and makes continued participation more engaging.',
      'iOSとChromeの2プラットフォームで展開する、シンプルな数独パズル。':'A simple Sudoku puzzle released across both iOS and Chrome.',
      'ブラウザ上でPDFへ書き込み、チェック、署名などを行えるChrome拡張。':'A Chrome extension for annotating, checking, and signing PDFs directly in the browser.',
      'Web制作・デザイン作業を支援するカラーユーティリティ。':'A color utility for web production and design workflows.',
      '短い呼吸・瞑想セッションをブラウザ上で実行するミニマルなタイマー。':'A minimal browser timer for short breathing and meditation sessions.',
      'ブラウザ上で手軽に学習できる漢字読みクイズ。':'A lightweight Chrome extension for practicing Japanese kanji readings.',
      'ヘルスケア会員プラットフォーム・顧客ポータル開発':'Healthcare member platform and customer portal development',
      '精密栄養と予防医療のパーソナルヘルスケアサービス「HAPIVERI Healthcare.ai」のコーポレートサイトと会員専用ページを設計・開発。サービスの入口となるブランドサイトと、契約後の会員が日々利用する管理画面を一貫したブランド表現で構築しています。':'Designed and developed the corporate website and members-only portal for HAPIVERI Healthcare.ai, a personalized healthcare service focused on precision nutrition and preventive health. The public brand site and the daily member interface were built as one consistent experience.',
      '会員ページはNext.js / TypeScript / Reactを基盤に、Supabase Auth、Airtable、Shopify、Stripe、Boxを統合。ポイント残高、月次レポート、データ提出状況、お知らせ、契約・決済情報、相談窓口を一つの画面に集約しています。':'The member portal is built on Next.js, TypeScript, and React, integrating Supabase Auth, Airtable, Shopify, Stripe, and Box. Points, monthly reports, data submission status, announcements, subscription and payment information, and support access are consolidated in one interface.',
      '既存の会員管理やポイント付与など、すでに稼働している業務フローには手を入れず、会員向けの表示層だけを新設。外部サービスに分散していた情報を一つのUXにまとめることで、運用を止めずに顧客体験を改善しました。':'A new member-facing presentation layer was added without changing existing operational workflows such as member management and point allocation. Information previously distributed across external services was unified into one UX without interrupting operations.',
      'コーポレートサイトはStudioで制作し、スマートフォン／タブレット／デスクトップに最適化。会員ページはVercelとGitHubを連携した継続デプロイ構成とし、招待制認証や契約状態に応じた表示分岐、Shopifyブログ連携など、実運用を前提とした機能を実装しています。':'The corporate site was built in Studio and optimized for smartphone, tablet, and desktop. The member portal uses continuous deployment with Vercel and GitHub, with invitation-only authentication, subscription-aware conditional views, Shopify blog integration, and other production-oriented features.',
      'Shopifyサイト開発・テーマカスタマイズ・運用基盤構築':'Shopify website development, theme customization, and operational infrastructure',
      '株式会社ストロボファクトリーの公式サイトをShopifyベースで開発・運用。公式テーマ「Dawn」を土台に、Shopify Liquid、CSS、JavaScriptを用いてブランドサイトとしての独自UI、ブログ・記事ページ、レスポンシブ構成を実装しています。':'Developed and operate the official STROBOFACTORY website on Shopify. Using the Dawn theme as a foundation, we implemented a custom brand UI, blog and article pages, and responsive layouts with Shopify Liquid, CSS, and JavaScript.',
      'Shopify CLIとGitHubを組み合わせた開発環境を構築し、テーマファイルをGitで管理。変更履歴の追跡、ロールバック、継続的な機能改善を行える運用体制とし、サイト共通CSSとブログ専用CSSも分離しています。':'Built a development environment combining Shopify CLI and GitHub, with theme files managed in Git for change tracking, rollback, and continuous improvement. Shared site CSS and blog-specific CSS are also separated for maintainability.',
      'Dawn 15.0.0をベースとする独自カスタマイズを保持しながら、Dawn 15.4.1の変更内容をファイル単位で調査し、安全性を確認できたJavaScriptやSVGアイコン等を段階的に取り込みました。Shopify Theme Checkによる検証、Liquid・schema・localeの修正、外部リンクのセキュリティ改善まで含めて、本番公開と継続運用を一貫して担当しています。':'While preserving customizations based on Dawn 15.0.0, we reviewed Dawn 15.4.1 changes file by file and selectively integrated verified JavaScript and SVG improvements. Our work includes Shopify Theme Check validation, Liquid/schema/locale fixes, external-link security improvements, production release, and ongoing operation.',
      'Shopifyを基盤としたEC・オウンドメディア・ブランドプラットフォーム開発':'Shopify-based commerce, owned-media, and brand platform development',
      '自社ブランド「HAPIVERI」のShopifyサイトを企画、情報設計、デザイン、テーマ開発、SEO、コンテンツ運用まで一貫して構築。Shopifyを単なるオンラインストアではなく、ヘルスケア商品、デジタルマガジン、音楽、教育、パーソナルヘルスケア、メールマガジンをつなぐブランド全体の入口として設計しています。':'Planned and built the Shopify site for our HAPIVERI brand across information architecture, design, theme development, SEO, and content operations. Shopify is used not simply as an online store, but as the central gateway connecting healthcare products, digital publishing, music, education, personalized healthcare, and newsletters.',
      '公式テーマ「Dawn」をベースに、Liquid、CSS、JavaScript、JSONテンプレートで独自カスタマイズ。商品販売、NEWS、HAPIVERI MAGAZINE、HAPIVERI SOUNDS、特集ページ、ブランドストーリー、メールマガジン登録、検索、ログ