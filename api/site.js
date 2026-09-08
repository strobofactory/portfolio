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
      <div class="caseMeta">
        <div><strong>Automation</strong><span>Lead / Outreach workflow</span></div>
        <div><strong>Stateful</strong><span>History / Suppression / Retry</span></div>
        <div><strong>In production</strong><span>Internal sales operations</span></div>
      </div>
      <div class="caseStack"><span>Python</span><span>Git / GitHub</span><span>Gmail</span><span>Web Forms</span><span>API Integration</span><span>Logging</span><span>State Management</span></div>
    </div>
  </article>
  <article class="caseStudy">
    <div class="caseIntro">
      <p class="category">Slack / Operations Automation</p>
      <h3>Slack Operations Automation</h3>
      <p class="desc">Slackを業務システムの通知・運用インターフェースとして活用</p>
    </div>
    <div class="caseBody">
      <p>Slackを単なるチャットツールではなく、営業や社内業務の実行結果、進捗、エラー、定期情報を集約する運用基盤として利用。外部システムやAPIから必要な情報を自動通知できる構成を開発しています。</p>
      <p>Google Apps Scriptや外部API等と連携し、担当者が個別の管理画面を巡回しなくても、Slack上で状況を把握できるように設計。複数ワークスペースを含む実運用に合わせて通知先と用途を整理しています。</p>
      <p class="caseWide">営業自動化や各種業務ツールと組み合わせ、異常時の通知、処理結果の共有、定期レポートなど、人が確認すべきポイントをSlackへ集約することで、日常業務の確認コストを減らす運用を構築しています。</p>
      <div class="caseMeta">
        <div><strong>Slack</strong><span>Operations interface</span></div>
        <div><strong>Integrated</strong><span>GAS / APIs / Business tools</span></div>
        <div><strong>Automated</strong><span>Alerts / Reports / Status</span></div>
      </div>
      <div class="caseStack"><span>Slack</span><span>Google Apps Script</span><span>API Integration</span><span>Automation</span><span>Notifications</span><span>Operations</span></div>
    </div>
  </article>
`;

    const marker = '</section>\n</main>';
    const pos = html.lastIndexOf(marker);
    if (pos === -1) throw new Error('systems section marker not found');
    html = html.slice(0, pos) + extraCases + html.slice(pos);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('site unavailable');
  }
};
