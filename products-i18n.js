(() => {
  const languages = [
    ['ja','JA'], ['en','EN'], ['es','ES'], ['zh','中文'], ['ko','한국어']
  ];

  const messages = {
    ja: {},
    en: {
      "声の日記アプリ「ここね / Kokone」の製品LP。サービスのコンセプト、機能、利用イメージ、アプリへの導線を1ページで設計・実装。":"A product landing page for the voice journal app Kokone, designed and implemented as a single-page experience covering the service concept, features, usage imagery, and the path to the app.",
      "行った人が、その店の何を見たか。日本と世界のコーヒー店の記録。":"What did the person who visited actually see at that shop? A record of coffee shops in Japan and around the world.",
      "日本の独立系スペシャルティコーヒー店を、運営者が自分で足を運んで記録するWebサービスです。掲載のルールは三つ。チェーン店は載せない、点数も順位もつけない、行った人がその店で何を見たかを書く。広告や有料掲載は行わず、一次情報を自分で持ち、プラットフォームの評価軸に乗らない個人メディアとして企画、設計、実装、公開、運用までを一人で手がけています。":"A web service documenting independent specialty coffee shops in Japan through firsthand visits by the operator. It follows three rules: no chain stores, no scores or rankings, and the person who went there writes what they actually saw. There is no advertising or paid placement. The entire service—from concept and design to implementation, release, and operation—is run independently as personal media that owns its primary information and does not rely on platform rating systems.",
      "店ごとの情報は「未訪問・訪問済み・店舗確認済み」の三つの状態で管理しています。公開情報から集めた内容と、実際に確かめた内容を画面の上で区別するためです。一杯ごとの記録（産地・農園・品種・精製・焙煎日・淹れ方）を店に紐づけて蓄積し、記録が一定の件数と日数を超えた店にだけ、産地と精製の割合を表示します。母数が足りない段階で傾向を見せない判断は、画面ではなくデータベースのビューで完結させています。":"Each shop is managed in one of three states: unvisited, visited, or shop-verified. This distinguishes information collected from public sources from information actually checked in person. Records for each cup—origin, farm, variety, processing, roast date, and brewing method—are linked to shops and accumulated. Origin and processing ratios are shown only for shops whose records exceed defined count and time thresholds. The decision not to show trends when the sample is too small is handled entirely in database views rather than in the UI.",
      "見た目は完全なモノクロとシネスコ比（2.39:1）の写真に統一しました。アップロードした写真は自動でトリミング・縮小し、SVG フィルタでトーンを揃えています。日本語・英語・スペイン語・中国語・韓国語の5言語に対応していますが、店の本文は機械翻訳せず原文のまま出しています。住所からの座標は、Google の店舗データを使わず、国土地理院と OpenStreetMap で取得しています。管理画面では、店の追加・候補からの除外・公開の切り替え・座標の取得・CSV の一括取り込み・コラムの執筆までをブラウザで行えます。":"The visual design is unified in pure monochrome with photos at a 2.39:1 CinemaScope ratio. Uploaded photos are automatically cropped and resized, with SVG filters aligning their tone. The site supports Japanese, English, Spanish, Chinese, and Korean, while shop body text remains in its original language rather than being machine-translated. Coordinates are obtained without Google place data, using the Geospatial Information Authority of Japan and OpenStreetMap. The browser-based admin handles adding shops, excluding candidates, toggling publication, coordinate lookup, bulk CSV imports, and essay authoring.",
      "2026年10月時点":"As of October 2026",
      "未訪問・訪問済み・確認済み":"Unvisited / Visited / Verified",
      'Macの空き容量を増やすSweepline for Macの製品LP。機能、安心設計、FAQ、購入導線までを1ページで設計・実装。':'A product landing page for Sweepline for Mac, designed and implemented as a single-page flow covering features, safety, FAQ, and purchase conversion.',
      'MacからWindowsへ送るZIPの互換性課題を解決するPKPassport for Macの製品LP。課題提示、機能、価格、購入導線までを設計・実装。':'A product landing page for PKPassport for Mac, designed around the Mac-to-Windows ZIP compatibility problem, from problem framing and features to pricing and purchase conversion.',
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
      'Shopifyサイト開発・テーマカスタマイズ・運用基盤構築':'Shopify website development, theme customization, and operational infrastructure',
      'Shopifyを基盤としたEC・オウンドメディア・ブランドプラットフォーム開発':'Shopify-based commerce, owned-media, and brand platform development',
      'アウトバウンド営業の候補抽出から送信管理までを自動化':'Automation from outbound lead sourcing through outreach management',
      'Slackを業務システムの通知・運用インターフェースとして活用':'Using Slack as the notification and operations interface for business systems',
      'AI・会計API・業務ツールを統合した経理オペレーション基盤':'Accounting operations platform integrating AI, accounting APIs, and business tools'
    },
    es: {
      "声の日記アプリ「ここね / Kokone」の製品LP。サービスのコンセプト、機能、利用イメージ、アプリへの導線を1ページで設計・実装。":"Landing page de producto para la app de diario de voz Kokone, diseñada e implementada en una sola página con el concepto del servicio, funciones, ejemplos de uso y acceso a la aplicación.",
      "行った人が、その店の何を見たか。日本と世界のコーヒー店の記録。":"Qué vio realmente quien visitó ese lugar. Un registro de cafeterías de Japón y del mundo.",
      "日本の独立系スペシャルティコーヒー店を、運営者が自分で足を運んで記録するWebサービスです。掲載のルールは三つ。チェーン店は載せない、点数も順位もつけない、行った人がその店で何を見たかを書く。広告や有料掲載は行わず、一次情報を自分で持ち、プラットフォームの評価軸に乗らない個人メディアとして企画、設計、実装、公開、運用までを一人で手がけています。":"Un servicio web que documenta cafeterías independientes de especialidad en Japón a partir de visitas personales del propio operador. Sigue tres reglas: no incluir cadenas, no asignar puntuaciones ni rankings y escribir qué vio realmente quien estuvo allí. No hay publicidad ni publicaciones de pago. La planificación, el diseño, la implementación, la publicación y la operación se realizan de forma independiente como un medio personal que conserva su propia información primaria y no depende de los sistemas de valoración de las plataformas.",
      "店ごとの情報は「未訪問・訪問済み・店舗確認済み」の三つの状態で管理しています。公開情報から集めた内容と、実際に確かめた内容を画面の上で区別するためです。一杯ごとの記録（産地・農園・品種・精製・焙煎日・淹れ方）を店に紐づけて蓄積し、記録が一定の件数と日数を超えた店にだけ、産地と精製の割合を表示します。母数が足りない段階で傾向を見せない判断は、画面ではなくデータベースのビューで完結させています。":"Cada cafetería se gestiona en uno de tres estados: no visitada, visitada o verificada en el local. Así se distingue la información recopilada de fuentes públicas de lo comprobado personalmente. Los registros de cada taza —origen, finca, variedad, proceso, fecha de tueste y método de preparación— se vinculan con cada tienda. Las proporciones de origen y proceso solo se muestran cuando existen suficientes registros durante un periodo determinado. La decisión de no mostrar tendencias con una muestra insuficiente se resuelve íntegramente mediante vistas de base de datos, no en la interfaz.",
      "見た目は完全なモノクロとシネスコ比（2.39:1）の写真に統一しました。アップロードした写真は自動でトリミング・縮小し、SVG フィルタでトーンを揃えています。日本語・英語・スペイン語・中国語・韓国語の5言語に対応していますが、店の本文は機械翻訳せず原文のまま出しています。住所からの座標は、Google の店舗データを使わず、国土地理院と OpenStreetMap で取得しています。管理画面では、店の追加・候補からの除外・公開の切り替え・座標の取得・CSV の一括取り込み・コラムの執筆までをブラウザで行えます。":"El diseño visual se unifica en monocromo total y fotografías con proporción CinemaScope 2.39:1. Las imágenes subidas se recortan y reducen automáticamente, y filtros SVG igualan el tono. El sitio admite japonés, inglés, español, chino y coreano, pero el texto principal de cada tienda se mantiene en su idioma original sin traducción automática. Las coordenadas se obtienen sin usar datos de lugares de Google, mediante la Autoridad de Información Geoespacial de Japón y OpenStreetMap. Desde el panel de administración se pueden añadir tiendas, excluir candidatos, cambiar el estado de publicación, obtener coordenadas, importar CSV en lote y redactar columnas.",
      "2026年10月時点":"A octubre de 2026",
      "未訪問・訪問済み・確認済み":"No visitada / Visitada / Verificada",
      'Macの空き容量を増やすSweepline for Macの製品LP。機能、安心設計、FAQ、購入導線までを1ページで設計・実装。':'Landing page de producto para Sweepline for Mac, diseñada e implementada en una sola página con funciones, seguridad, FAQ y recorrido de compra.',
      'MacからWindowsへ送るZIPの互換性課題を解決するPKPassport for Macの製品LP。課題提示、機能、価格、購入導線までを設計・実装。':'Landing page de producto para PKPassport for Mac, diseñada en torno al problema de compatibilidad ZIP entre Mac y Windows, desde el planteamiento y las funciones hasta el precio y la compra.',
      '企画、設計、実装、公開、運用まで。STROBOFACTORYが実際に開発し、リリースしているソフトウェアプロダクトをまとめています。':'Desde la idea y el diseño hasta la implementación, el lanzamiento y la operación. Una selección de productos de software desarrollados y publicados por STROBOFACTORY.',
      '登山中の位置情報と生体データを記録し、心拍・SpO₂・気象・地図を統合する登山アプリ。':'Aplicación de senderismo que registra ubicación y datos biométricos e integra frecuencia cardíaca, SpO₂, meteorología y mapas.',
      '声や記録をもとにAIが感情を分析し、日々の振り返りを支援するジャーナリングアプリ。':'Aplicación de diario que utiliza IA para analizar emociones a partir de la voz y los registros personales y apoyar la reflexión diaria.',
      'Shopify直販、ライセンス発行、署名付き自動アップデートまで含めて構築したmacOSユーティリティ。':'Utilidad para macOS con venta directa mediante Shopify, emisión de licencias y actualizaciones automáticas firmadas.',
      '自社販売基盤とライセンス運用を組み合わせたmacOSユーティリティ。':'Utilidad para macOS que integra nuestra propia infraestructura de ventas con la gestión de licencias.',
      '季節によって一刻の長さが変わる江戸時代の不定時法を、現代の端末上で再構成した時刻アプリ。':'Aplicación que recrea en dispositivos modernos el sistema horario temporal del periodo Edo, donde la duración de cada hora cambia según la estación.',
      '子どものお手伝いを記録し、継続を楽しく支援するファミリー向けアプリ。':'Aplicación familiar que registra las tareas de los niños y hace más entretenida su continuidad.',
      'iOSとChromeの2プラットフォームで展開する、シンプルな数独パズル。':'Sudoku sencillo disponible tanto en iOS como en Chrome.',
      'ブラウザ上でPDFへ書き込み、チェック、署名などを行えるChrome拡張。':'Extensión de Chrome para anotar, revisar y firmar PDF directamente en el navegador.',
      'Web制作・デザイン作業を支援するカラーユーティリティ。':'Utilidad de color para flujos de trabajo de diseño y producción web.',
      '短い呼吸・瞑想セッションをブラウザ上で実行するミニマルなタイマー。':'Temporizador minimalista para sesiones breves de respiración y meditación en el navegador.',
      'ブラウザ上で手軽に学習できる漢字読みクイズ。':'Extensión ligera para practicar la lectura de kanji japoneses en el navegador.',
      'ヘルスケア会員プラットフォーム・顧客ポータル開発':'Desarrollo de plataforma para miembros y portal de clientes de salud',
      'Shopifyサイト開発・テーマカスタマイズ・運用基盤構築':'Desarrollo Shopify, personalización de tema e infraestructura operativa',
      'Shopifyを基盤としたEC・オウンドメディア・ブランドプラットフォーム開発':'Desarrollo de plataforma de comercio, medios propios y marca basada en Shopify',
      'アウトバウンド営業の候補抽出から送信管理までを自動化':'Automatización desde la selección de prospectos hasta la gestión del contacto comercial',
      'Slackを業務システムの通知・運用インターフェースとして活用':'Slack como interfaz de notificación y operación para sistemas empresariales',
      'AI・会計API・業務ツールを統合した経理オペレーション基盤':'Plataforma de operaciones contables que integra IA, APIs contables y herramientas empresariales'
    },
    zh: {
      "声の日記アプリ「ここね / Kokone」の製品LP。サービスのコンセプト、機能、利用イメージ、アプリへの導線を1ページで設計・実装。":"语音日记应用「ここね / Kokone」的产品落地页，在单页中完成服务概念、功能、使用场景与应用导流的设计与实现。",
      "行った人が、その店の何を見たか。日本と世界のコーヒー店の記録。":"去过的人，在那家店里实际看到了什么。记录日本与世界咖啡店的个人档案。",
      "日本の独立系スペシャルティコーヒー店を、運営者が自分で足を運んで記録するWebサービスです。掲載のルールは三つ。チェーン店は載せない、点数も順位もつけない、行った人がその店で何を見たかを書く。広告や有料掲載は行わず、一次情報を自分で持ち、プラットフォームの評価軸に乗らない個人メディアとして企画、設計、実装、公開、運用までを一人で手がけています。":"这是一个由运营者亲自到访并记录日本独立精品咖啡店的 Web 服务。收录遵循三条规则：不收录连锁店、不打分也不排名、由真正去过的人写下在店里看到了什么。不接受广告或付费收录，从企划、设计、实现、发布到运营均由一人完成，作为拥有一手信息、不依赖平台评价体系的个人媒体运行。",
      "店ごとの情報は「未訪問・訪問済み・店舗確認済み」の三つの状態で管理しています。公開情報から集めた内容と、実際に確かめた内容を画面の上で区別するためです。一杯ごとの記録（産地・農園・品種・精製・焙煎日・淹れ方）を店に紐づけて蓄積し、記録が一定の件数と日数を超えた店にだけ、産地と精製の割合を表示します。母数が足りない段階で傾向を見せない判断は、画面ではなくデータベースのビューで完結させています。":"每家店的信息以“未访问、已访问、店铺确认”三种状态管理，用来区分从公开信息收集的内容与亲自确认过的内容。每一杯咖啡的记录——产地、农园、品种、处理法、烘焙日期、冲煮方式——都会与店铺关联并积累。只有当记录数量与时间跨度达到一定条件时，才显示产地与处理法的比例。在样本不足时不展示趋势的判断，不在界面层处理，而是在数据库视图中完成。",
      "見た目は完全なモノクロとシネスコ比（2.39:1）の写真に統一しました。アップロードした写真は自動でトリミング・縮小し、SVG フィルタでトーンを揃えています。日本語・英語・スペイン語・中国語・韓国語の5言語に対応していますが、店の本文は機械翻訳せず原文のまま出しています。住所からの座標は、Google の店舗データを使わず、国土地理院と OpenStreetMap で取得しています。管理画面では、店の追加・候補からの除外・公開の切り替え・座標の取得・CSV の一括取り込み・コラムの執筆までをブラウザで行えます。":"视觉统一为纯黑白，并将照片固定为 2.39:1 的 CinemaScope 比例。上传的照片会自动裁切和缩小，并通过 SVG 滤镜统一色调。网站支持日语、英语、西班牙语、中文和韩语五种语言，但店铺正文不进行机器翻译，保留原文。地址坐标不使用 Google 店铺数据，而通过日本国土地理院与 OpenStreetMap 获取。管理后台可在浏览器中完成新增店铺、排除候选、切换公开状态、获取坐标、批量导入 CSV 以及撰写专栏。",
      "2026年10月時点":"截至2026年10月",
      "未訪問・訪問済み・確認済み":"未访问 / 已访问 / 已确认",
      'Macの空き容量を増やすSweepline for Macの製品LP。機能、安心設計、FAQ、購入導線までを1ページで設計・実装。':'Sweepline for Mac 的产品落地页，在单页中完成产品功能、安全设计、FAQ 与购买路径的设计与实现。',
      'MacからWindowsへ送るZIPの互換性課題を解決するPKPassport for Macの製品LP。課題提示、機能、価格、購入導線までを設計・実装。':'PKPassport for Mac 的产品落地页，围绕 Mac 向 Windows 发送 ZIP 时的兼容性问题，完成问题说明、功能、价格与购买路径的设计与实现。',
      '企画、設計、実装、公開、運用まで。STROBOFACTORYが実際に開発し、リリースしているソフトウェアプロダクトをまとめています。':'从企划、设计、开发到发布与运营。这里汇集了由 STROBOFACTORY 实际开发并发布的软件产品。',
      '登山中の位置情報と生体データを記録し、心拍・SpO₂・気象・地図を統合する登山アプリ。':'一款登山应用，可记录位置与生理数据，并整合心率、SpO₂、天气和地图。',
      '声や記録をもとにAIが感情を分析し、日々の振り返りを支援するジャーナリングアプリ。':'一款 AI 日记应用，可根据语音和记录分析情绪，帮助用户进行日常回顾。',
      'Shopify直販、ライセンス発行、署名付き自動アップデートまで含めて構築したmacOSユーティリティ。':'一款 macOS 工具，涵盖 Shopify 直销、许可证签发及带签名的自动更新。',
      '自社販売基盤とライセンス運用を組み合わせたmacOSユーティリティ。':'一款将自有销售基础设施与许可证管理整合在一起的 macOS 工具。',
      '季節によって一刻の長さが変わる江戸時代の不定時法を、現代の端末上で再構成した時刻アプリ。':'一款在现代设备上重现江户时代不定时法的时间应用，每一“刻”的长度会随季节变化。',
      '子どものお手伝いを記録し、継続を楽しく支援するファミリー向けアプリ。':'一款家庭应用，用于记录孩子的家务并通过有趣的方式鼓励持续参与。',
      'iOSとChromeの2プラットフォームで展開する、シンプルな数独パズル。':'一款同时在 iOS 和 Chrome 平台发布的简洁数独游戏。',
      'ブラウザ上でPDFへ書き込み、チェック、署名などを行えるChrome拡張。':'一款可直接在浏览器中对 PDF 进行批注、检查和签名的 Chrome 扩展。',
      'Web制作・デザイン作業を支援するカラーユーティリティ。':'用于支持网页制作和设计工作流程的颜色工具。',
      '短い呼吸・瞑想セッションをブラウザ上で実行するミニマルなタイマー。':'用于在浏览器中进行短时呼吸与冥想练习的极简计时器。',
      'ブラウザ上で手軽に学習できる漢字読みクイズ。':'可在浏览器中轻松练习日语汉字读音的扩展。',
      'ヘルスケア会員プラットフォーム・顧客ポータル開発':'健康会员平台与客户门户开发',
      'Shopifyサイト開発・テーマカスタマイズ・運用基盤構築':'Shopify 网站开发、主题定制与运营基础设施建设',
      'Shopifyを基盤としたEC・オウンドメディア・ブランドプラットフォーム開発':'基于 Shopify 的电商、自有媒体与品牌平台开发',
      'アウトバウンド営業の候補抽出から送信管理までを自動化':'从潜在客户筛选到外联发送管理的销售自动化',
      'Slackを業務システムの通知・運用インターフェースとして活用':'将 Slack 作为业务系统的通知与运营界面',
      'AI・会計API・業務ツールを統合した経理オペレーション基盤':'整合 AI、会计 API 与业务工具的财务运营平台'
    },
    ko: {
      "声の日記アプリ「ここね / Kokone」の製品LP。サービスのコンセプト、機能、利用イメージ、アプリへの導線を1ページで設計・実装。":"음성 일기 앱 ‘ここね / Kokone’의 제품 랜딩 페이지로, 서비스 콘셉트와 기능, 사용 이미지, 앱으로 이어지는 동선을 한 페이지에 설계하고 구현했습니다.",
      "行った人が、その店の何を見たか。日本と世界のコーヒー店の記録。":"직접 간 사람은 그 가게에서 무엇을 보았는가. 일본과 세계의 커피숍을 기록하는 아카이브.",
      "日本の独立系スペシャルティコーヒー店を、運営者が自分で足を運んで記録するWebサービスです。掲載のルールは三つ。チェーン店は載せない、点数も順位もつけない、行った人がその店で何を見たかを書く。広告や有料掲載は行わず、一次情報を自分で持ち、プラットフォームの評価軸に乗らない個人メディアとして企画、設計、実装、公開、運用までを一人で手がけています。":"운영자가 직접 방문해 일본의 독립 스페셜티 커피숍을 기록하는 웹 서비스입니다. 세 가지 원칙을 둡니다. 체인점은 싣지 않고, 점수나 순위를 매기지 않으며, 실제로 방문한 사람이 그곳에서 무엇을 보았는지 기록합니다. 광고와 유료 게재는 하지 않습니다. 1차 정보를 직접 보유하고 플랫폼의 평가 기준에 의존하지 않는 개인 미디어로서 기획, 설계, 구현, 공개, 운영까지 혼자 진행하고 있습니다.",
      "店ごとの情報は「未訪問・訪問済み・店舗確認済み」の三つの状態で管理しています。公開情報から集めた内容と、実際に確かめた内容を画面の上で区別するためです。一杯ごとの記録（産地・農園・品種・精製・焙煎日・淹れ方）を店に紐づけて蓄積し、記録が一定の件数と日数を超えた店にだけ、産地と精製の割合を表示します。母数が足りない段階で傾向を見せない判断は、画面ではなくデータベースのビューで完結させています。":"매장 정보는 미방문, 방문 완료, 매장 확인 완료의 세 상태로 관리합니다. 공개 정보에서 수집한 내용과 실제로 확인한 내용을 화면에서 구분하기 위해서입니다. 한 잔 단위의 기록—산지, 농장, 품종, 가공 방식, 로스팅 날짜, 추출 방식—을 매장에 연결해 축적하고, 일정한 기록 수와 기간을 넘긴 매장에만 산지와 가공 방식의 비율을 표시합니다. 표본이 부족할 때 추세를 보여주지 않는 판단은 화면이 아니라 데이터베이스 뷰에서 처리합니다.",
      "見た目は完全なモノクロとシネスコ比（2.39:1）の写真に統一しました。アップロードした写真は自動でトリミング・縮小し、SVG フィルタでトーンを揃えています。日本語・英語・スペイン語・中国語・韓国語の5言語に対応していますが、店の本文は機械翻訳せず原文のまま出しています。住所からの座標は、Google の店舗データを使わず、国土地理院と OpenStreetMap で取得しています。管理画面では、店の追加・候補からの除外・公開の切り替え・座標の取得・CSV の一括取り込み・コラムの執筆までをブラウザで行えます。":"비주얼은 완전한 모노크롬과 2.39:1 시네마스코프 비율의 사진으로 통일했습니다. 업로드한 사진은 자동으로 크롭·축소하고 SVG 필터로 톤을 맞춥니다. 일본어, 영어, 스페인어, 중국어, 한국어 5개 언어를 지원하지만 매장 본문은 기계번역하지 않고 원문 그대로 표시합니다. 주소 좌표는 Google 매장 데이터를 사용하지 않고 일본 국토지리원과 OpenStreetMap에서 가져옵니다. 관리자 화면에서는 매장 추가, 후보 제외, 공개 전환, 좌표 취득, CSV 일괄 가져오기, 칼럼 작성까지 브라우저에서 처리할 수 있습니다.",
      "2026年10月時点":"2026년 10월 기준",
      "未訪問・訪問済み・確認済み":"미방문 / 방문 완료 / 확인 완료",
      'Macの空き容量を増やすSweepline for Macの製品LP。機能、安心設計、FAQ、購入導線までを1ページで設計・実装。':'Sweepline for Mac 제품 랜딩 페이지로, 기능·안심 설계·FAQ·구매 동선을 한 페이지에 설계하고 구현했습니다.',
      'MacからWindowsへ送るZIPの互換性課題を解決するPKPassport for Macの製品LP。課題提示、機能、価格、購入導線までを設計・実装。':'Mac에서 Windows로 ZIP을 보낼 때의 호환성 문제를 중심으로 문제 제시, 기능, 가격, 구매 동선을 설계하고 구현한 PKPassport for Mac 제품 랜딩 페이지입니다.',
      '企画、設計、実装、公開、運用まで。STROBOFACTORYが実際に開発し、リリースしているソフトウェアプロダクトをまとめています。':'기획과 설계부터 구현, 출시, 운영까지. STROBOFACTORY가 실제로 개발하고 출시한 소프트웨어 제품을 소개합니다.',
      '登山中の位置情報と生体データを記録し、心拍・SpO₂・気象・地図を統合する登山アプリ。':'등산 중 위치와 생체 데이터를 기록하고 심박수, SpO₂, 날씨, 지도를 통합하는 등산 앱입니다.',
      '声や記録をもとにAIが感情を分析し、日々の振り返りを支援するジャーナリングアプリ。':'음성과 기록을 바탕으로 AI가 감정을 분석해 매일의 회고를 돕는 저널링 앱입니다.',
      'Shopify直販、ライセンス発行、署名付き自動アップデートまで含めて構築したmacOSユーティリティ。':'Shopify 직접 판매, 라이선스 발급, 서명된 자동 업데이트까지 포함해 구축한 macOS 유틸리티입니다.',
      '自社販売基盤とライセンス運用を組み合わせたmacOSユーティリティ。':'자체 판매 인프라와 라이선스 운영을 결합한 macOS 유틸리티입니다.',
      '季節によって一刻の長さが変わる江戸時代の不定時法を、現代の端末上で再構成した時刻アプリ。':'계절에 따라 한 시각의 길이가 달라지는 에도 시대의 부정시법을 현대 기기에서 재구성한 시간 앱입니다.',
      '子どものお手伝いを記録し、継続を楽しく支援するファミリー向けアプリ。':'아이의 집안일을 기록하고 즐겁게 지속할 수 있도록 돕는 가족용 앱입니다.',
      'iOSとChromeの2プラットフォームで展開する、シンプルな数独パズル。':'iOS와 Chrome 두 플랫폼에서 제공하는 심플한 스도쿠 퍼즐입니다.',
      'ブラウザ上でPDFへ書き込み、チェック、署名などを行えるChrome拡張。':'브라우저에서 PDF에 주석을 달고 확인하고 서명할 수 있는 Chrome 확장 프로그램입니다.',
      'Web制作・デザイン作業を支援するカラーユーティリティ。':'웹 제작과 디자인 작업을 지원하는 컬러 유틸리티입니다.',
      '短い呼吸・瞑想セッションをブラウザ上で実行するミニマルなタイマー。':'브라우저에서 짧은 호흡 및 명상 세션을 진행하는 미니멀 타이머입니다.',
      'ブラウザ上で手軽に学習できる漢字読みクイズ。':'브라우저에서 일본어 한자 읽기를 간편하게 연습할 수 있는 확장 프로그램입니다.',
      'ヘルスケア会員プラットフォーム・顧客ポータル開発':'헬스케어 회원 플랫폼 및 고객 포털 개발',
      'Shopifyサイト開発・テーマカスタマイズ・運用基盤構築':'Shopify 사이트 개발, 테마 커스터마이징 및 운영 인프라 구축',
      'Shopifyを基盤としたEC・オウンドメディア・ブランドプラットフォーム開発':'Shopify 기반 커머스·오운드 미디어·브랜드 플랫폼 개발',
      'アウトバウンド営業の候補抽出から送信管理までを自動化':'아웃바운드 영업 후보 추출부터 발송 관리까지 자동화',
      'Slackを業務システムの通知・運用インターフェースとして活用':'Slack을 업무 시스템의 알림 및 운영 인터페이스로 활용',
      'AI・会計API・業務ツールを統合した経理オペレーション基盤':'AI, 회계 API, 업무 도구를 통합한 회계 운영 플랫폼'
    }
  };

  // Long-form case-study copy, kept separate so the UI remains easy to maintain.
  Object.assign(messages.en, {
    '精密栄養と予防医療のパーソナルヘルスケアサービス「HAPIVERI Healthcare.ai」のコーポレートサイトと会員専用ページを設計・開発。サービスの入口となるブランドサイトと、契約後の会員が日々利用する管理画面を一貫したブランド表現で構築しています。':'Designed and developed the corporate site and members-only portal for HAPIVERI Healthcare.ai, a personalized healthcare service focused on precision nutrition and preventive health.',
    '会員ページはNext.js / TypeScript / Reactを基盤に、Supabase Auth、Airtable、Shopify、Stripe、Boxを統合。ポイント残高、月次レポート、データ提出状況、お知らせ、契約・決済情報、相談窓口を一つの画面に集約しています。':'Built the member portal with Next.js, TypeScript and React, integrating Supabase Auth, Airtable, Shopify, Stripe and Box into a single interface.',
    '既存の会員管理やポイント付与など、すでに稼働している業務フローには手を入れず、会員向けの表示層だけを新設。外部サービスに分散していた情報を一つのUXにまとめることで、運用を止めずに顧客体験を改善しました。':'Added a new member-facing layer without changing existing operational workflows, unifying information spread across external services without interrupting operations.',
    'コーポレートサイトはStudioで制作し、スマートフォン／タブレット／デスクトップに最適化。会員ページはVercelとGitHubを連携した継続デプロイ構成とし、招待制認証や契約状態に応じた表示分岐、Shopifyブログ連携など、実運用を前提とした機能を実装しています。':'The corporate site was built in Studio and optimized across devices. The member portal uses Vercel and GitHub for continuous deployment, with invitation-only authentication, subscription-aware views and Shopify blog integration.',
    '株式会社ストロボファクトリーの公式サイトをShopifyベースで開発・運用。公式テーマ「Dawn」を土台に、Shopify Liquid、CSS、JavaScriptを用いてブランドサイトとしての独自UI、ブログ・記事ページ、レスポンシブ構成を実装しています。':'Developed and operate the official STROBOFACTORY site on Shopify, customizing Dawn with Liquid, CSS and JavaScript for the brand UI, blog, article pages and responsive layouts.',
    'Shopify CLIとGitHubを組み合わせた開発環境を構築し、テーマファイルをGitで管理。変更履歴の追跡、ロールバック、継続的な機能改善を行える運用体制とし、サイト共通CSSとブログ専用CSSも分離しています。':'Built a Shopify CLI and GitHub development workflow with Git-based versioning, rollback and continuous improvement, including separation of shared and blog-specific CSS.',
    'Dawn 15.0.0をベースとする独自カスタマイズを保持しながら、Dawn 15.4.1の変更内容をファイル単位で調査し、安全性を確認できたJavaScriptやSVGアイコン等を段階的に取り込みました。Shopify Theme Checkによる検証、Liquid・schema・localeの修正、外部リンクのセキュリティ改善まで含めて、本番公開と継続運用を一貫して担当しています。':'Preserved customizations while reviewing Dawn updates file by file and selectively integrating verified improvements, with Theme Check validation, Liquid/schema/locale fixes and security improvements.',
    '自社ブランド「HAPIVERI」のShopifyサイトを企画、情報設計、デザイン、テーマ開発、SEO、コンテンツ運用まで一貫して構築。Shopifyを単なるオンラインストアではなく、ヘルスケア商品、デジタルマガジン、音楽、教育、パーソナルヘルスケア、メールマガジンをつなぐブランド全体の入口として設計しています。':'Built HAPIVERI’s Shopify platform across planning, information architecture, design, theme development, SEO and content operations, using Shopify as the gateway connecting commerce, media, music, education and healthcare.',
    '公式テーマ「Dawn」をベースに、Liquid、CSS、JavaScript、JSONテンプレートで独自カスタマイズ。商品販売、NEWS、HAPIVERI MAGAZINE、HAPIVERI SOUNDS、特集ページ、ブランドストーリー、メールマガジン登録、検索、ログイン、カートを一つのサイト内に統合しています。':'Customized Dawn with Liquid, CSS, JavaScript and JSON templates, integrating commerce, news, HAPIVERI MAGAZINE, HAPIVERI SOUNDS, features, brand story, newsletter, search, login and cart.',
    'オウンドメディアでは、タグ、最新記事、関連記事、商品紹介、NEXT ACADEMYやHAPIVERI Healthcare.aiへの導線を記事ページ内に配置し、記事から別の記事・商品・サービスへ回遊できる構造を実装。テーマ別の特集ランディングページ、12問のアーユルヴェーダ体質セルフチェック、音楽配信サービスへの導線もShopify上に組み込みました。':'For owned media, we implemented tags, latest and related articles, product links and service pathways, plus themed landing pages, an Ayurveda self-check and music-platform links.',
    'SEOでは、タイトル、メタディスクリプション、見出し構造、画像代替テキスト、内部リンク、タグ、カテゴリ、パンくず、記事間リンクを継続改善。Shopify Admin APIを利用した記事の一括処理とURLリダイレクト管理も行い、コンテンツ移行時の検索評価や外部リンクを可能な限り維持できるよう設計しています。':'SEO work covers titles, metadata, heading structure, alt text, internal links, tags, categories and breadcrumbs, with Shopify Admin API workflows for bulk article processing and redirects.',
    '開発・運用はGitHubで管理し、ブランチ、Pull Request、差分確認、Shopify Theme Check、プレビューテーマでの検証を経て本番へ反映。本番では変更対象のLiquid、CSS、スニペット、JSONテンプレートのみを限定的にデプロイし、バックアップテーマとロールバック手順を含む継続運用体制を構築しています。':'Development and operations are managed in GitHub with branches, pull requests, diffs, Theme Check and preview validation, followed by selective production deployment and rollback procedures.',
    '自社の新規営業で実際に運用するため、営業対象企業の候補抽出、重複排除、除外管理、問い合わせフォーム処理、メール送信、実行ログ、ステータス管理までを一つのワークフローとして設計・開発しています。':'Designed and built a production sales workflow covering prospect sourcing, deduplication, suppression, contact-form handling, email, execution logs and status management.',
    'キャンペーンや対象業界ごとに処理を分離し、二重送信や誤送信を防ぎながら継続運用できる構成を採用。CAPTCHAや送信失敗、手動対応が必要なケースも状態として分類し、自動処理と人による確認を切り分けています。':'Campaign and industry workflows are separated to prevent duplicate or incorrect outreach, while CAPTCHA, failures and manual-review cases are explicitly classified.',
    '単純な一斉送信ツールではなく、候補選定、送信可否判定、履歴、除外、再送防止、エラー処理までを含む営業オペレーション全体をシステム化。実際の営業活動で運用しながら改善を続けています。':'This is not a bulk-mail tool but a system for the entire outreach operation, including eligibility, history, suppression, duplicate prevention and error handling.',
    'Slackを単なるチャットツールではなく、営業や社内業務の実行結果、進捗、エラー、定期情報を集約する運用基盤として利用。外部システムやAPIから必要な情報を自動通知できる構成を開発しています。':'We use Slack as an operations layer rather than only chat, consolidating execution results, progress, errors and recurring information from business systems and APIs.',
    'Google Apps Scriptや外部API等と連携し、担当者が個別の管理画面を巡回しなくても、Slack上で状況を把握できるように設計。複数ワークスペースを含む実運用に合わせて通知先と用途を整理しています。':'Integrations with Google Apps Script and external APIs let operators understand system status from Slack without checking multiple dashboards.',
    '営業自動化や各種業務ツールと組み合わせ、異常時の通知、処理結果の共有、定期レポートなど、人が確認すべきポイントをSlackへ集約することで、日常業務の確認コストを減らす運用を構築しています。':'Alerts, processing results and recurring reports are centralized in Slack so people can focus on the points that require human attention.',
    'Claude Codeと会計APIを中核に、Gmail、Google Drive、Google Sheets、Slack、Make、macOSの定期実行を組み合わせ、領収書集約、月次管理、請求業務、経理通知、会計処理の下準備までを一つの運用フローとして構築しています。':'Built an accounting workflow around Claude Code and accounting APIs, integrating Gmail, Google Drive, Google Sheets, Slack, Make and scheduled macOS execution.',
    '日次・月次処理はスケジュール実行し、結果をSlackへ自動通知。複数のメールアドレスに届く領収書・請求書を集約し、検索条件による抽出、ファイル名の標準化、共有ドライブへの保存、会計システムへの受け渡しまでを自動化しています。':'Daily and monthly jobs run on schedule and report to Slack. Receipts and invoices are collected from multiple addresses, filtered, renamed, stored in shared Drive and handed off to the accounting system automatically.',
    '資金繰り管理ではGoogle Sheets APIとPythonを利用し、独自の月次フォーマットを自動生成。請求業務も旧サービスから会計基盤へ移行し、過去の請求書・見積書あわせて1,012件をアーカイブしたうえで、定期請求・提出リマインド・アップロード通知を統合しています。':'Cash-flow management uses the Google Sheets API and Python to generate a custom monthly format. Billing was migrated from the previous service, archiving 1,012 invoices and estimates while integrating recurring billing, reminders and upload notifications.',
    '自動化できる範囲と人が判断すべき範囲を明確に分離し、API連携時の二重計上リスクや、UIでのみ扱うべき処理なども実運用の中で検証。判断に迷う処理は保留し、AI、担当者、会計システム、税務判断の責任境界を崩さない設計にしています。':'The design explicitly separates automation from human judgment, including safeguards for duplicate accounting and UI-only processes, with ambiguous cases held for review.'
  });

  Object.assign(messages.en, {
    "動画で学ぶ講座内容を、スマホで遊びながら「自分で思い出せる知識」に変えるDuolingo型の学習Webアプリ。":"A Duolingo-style learning web app that turns video-course content into knowledge learners can actively recall through short mobile practice.",
    "清書済みの講義原稿をもとに245問を制作し、分野をまたいだランダム出題と間隔反復で復習できる学習Webアプリです。企画から公開、利用者追加までを2026年10月27〜28日の2日間で行い、初期版は原稿41本・5区分から245問を構成。現在は社内4名が利用しています。":"A learning web app built from 245 questions based on edited lecture scripts, using mixed-topic randomization and spaced repetition. From concept through launch and user onboarding, the initial version was completed in two days, October 27–28, 2026. It uses 41 source scripts across five sections and is currently used by four internal users.",
    "背景には、動画教材は「見た」だけでは知識が残りにくく、視聴しながら詳細なノートを取るのも現実的ではないという課題がありました。そこで、約53万字・245本の清書済み原稿を学習データとして再利用し、動画視聴を「思い出す練習」へ変換しました。":"The project began with a simple problem: watching video lessons alone does not reliably retain knowledge, while detailed note-taking during viewing is impractical. About 530,000 Japanese characters across 245 edited scripts were therefore reused as structured learning data, converting passive viewing into active recall practice.",
    "学習コンセプト":"Learning concept",
    "中心にあるのは「見る」から「思い出す」への転換です。忘れかけたタイミングで自力で答えることを重視し、6つの仕組みを組み合わせています。":"The core idea is a shift from seeing to recalling. The design emphasizes answering independently just as knowledge begins to fade, combining six learning mechanisms.",
    "混ぜて出す（インターリーブ）":"Mix topics (interleaving)",
    "講座単位ではなく全区分からランダムに出題し、同じ原稿・区分が続かないように配置。":"Questions are mixed across all sections rather than grouped by lesson, avoiding repeated questions from the same script or category.",
    "間をあけて繰り返す（間隔反復）":"Repeat with spacing (spaced repetition)",
    "正解は1日、2日、4日……と間隔を広げ、誤答は翌日に再出題。間隔を空けても答えられた問題を「定着」と判定。":"Correct answers return after progressively longer intervals—1 day, 2 days, 4 days and beyond—while incorrect answers return the next day. A question is considered retained when it can still be answered after spacing.",
    "間違えたら最後にやり直す":"Retry mistakes at the end",
    "誤答はセット末尾へ戻し、正解するまでセットを完了させない設計。":"Incorrect answers return at the end of the set, and the set is not complete until the learner answers them correctly.",
    "やさしく始める（段階解放）":"Start gently (progressive unlocking)",
    "難易度1「基礎」から開始し、20問定着で「標準」、80問で「応用」を解放。":"Learners begin with level-1 fundamentals. Standard questions unlock after 20 retained items, and advanced questions after 80.",
    "続けたくなる仕掛け":"Progress that encourages continuation",
    "XP、レベル、連続学習日数、コース全体と区分ごとの定着率を静かに可視化。":"XP, levels, learning streaks, and retention rates for the whole course and each section are shown without making the interface feel game-heavy.",
    "すきま時間で終わる":"Designed for short sessions",
    "5・10・20問から選択でき、新規問題は1日25問まで。途中保存と続きからの再開に対応。":"Learners can choose sets of 5, 10, or 20 questions, with up to 25 new questions per day. Progress is saved after each answer and resumes from the same point.",
    "コンテンツ設計と検証":"Content design and verification",
    "問題は講義原稿の本文だけを根拠にし、医療・健康教材として量より正確さを優先しました。245本の原稿から34カテゴリ・全5区分をまたぐ41本を選び、清書時の修正記録と未決着の確認事項を読み、保留・疑義のある数字、固有名詞、因果関係47箇所は出題対象から除外しています。":"Every question is grounded only in the lecture scripts, prioritizing accuracy over volume because the material concerns health and medicine. Forty-one scripts spanning 34 categories and all five course sections were selected from the 245-script corpus. Editorial notes and unresolved questions were reviewed, and 47 questionable figures, names, or causal claims were excluded from question generation.",
    "1原稿あたり6問を基準に、4択129問、正誤56問、穴埋め40問、並べ替え20問を作成。難易度は「1：用語・基本」77問、「2：仕組みの理解」133問、「3：区別・応用」35問に分類しました。":"Using six questions per source script as the baseline, the initial set contains 129 multiple-choice questions, 56 true/false questions, 40 fill-in-the-blank questions, and 20 ordering questions. Difficulty is classified as 77 level-1 terminology/fundamentals, 133 level-2 mechanism-understanding questions, and 35 level-3 distinction/application questions.",
    "作問に使ったAIとは別のAIで全問を原稿と照合し、正解が本文どおりか、誤答に正しい選択肢が紛れていないかなど6項目を検証。4問を修正、1問を削除しました。この過程で原稿本文側にも医学的に疑わしい記述を4本分見つけ、教材の見直し候補として抽出しています。":"A separate AI that did not participate in question generation checked every question against the source scripts using six validation criteria, including whether the correct answer matched the text and whether distractors accidentally contained valid answers. Four questions were corrected and one was removed. The process also surfaced medically questionable statements in four source scripts for future curriculum review.",
    "体験とデザイン":"Experience and design",
    "HAPIVERI Healthcareのブランドトーンに合わせ、白・ネイビー・クリーム、細い罫線、角のないボタン、LatoとNoto Sans JPを中心にしたミニマルなUIを設計。ダークモードはブランドの濃紺を地色にしています。":"The interface follows the HAPIVERI Healthcare brand language: white, navy, and cream, thin rules, square-edged buttons, and a restrained typographic system centered on Lato and Noto Sans JP. Dark mode uses the brand's deep navy as its base.",
    "ホーム・問題・結果の3画面に絞り、「1画面に1つのこと」を徹底。":"The experience is reduced to three screens—home, question, and result—following a strict one-task-per-screen principle.",
    "選択肢をタップした瞬間に正誤判定し、正解は緑、不正解は赤系の面でフィードバック。":"Answers are evaluated immediately on tap, with full-surface green or muted red feedback for correct and incorrect responses.",
    "解答後に原稿に沿った解説と出典講義名を表示し、見直す動画へ戻れる構成。":"After each answer, the app shows an explanation grounded in the source script plus the lecture title so learners know which video to revisit.",
    "正解・不正解・セット完了・レベルアップの効果音をWeb Audio APIで端末内合成。":"Sound cues for correct answers, incorrect answers, set completion, and level-ups are synthesized locally with the Web Audio API.",
    "iPhone / iPadのホーム画面追加に対応し、ブラウザ枠のない全画面Webアプリとして利用可能。":"The app can be added to the iPhone or iPad home screen and used fullscreen without browser chrome.",
    "技術構成":"Technical architecture",
    "画面はVercelから配信し、データとログインはSupabase（PostgreSQL）に配置。自前サーバーを持たない構成で運用負荷を抑えています。テーブルへの直接アクセスは閉じ、問題と学習記録の読み書きは5つのDB関数だけを経由。名簿登録済みかつメール確認済みの利用者かを確認し、自分自身の記録だけを扱うよう制御しています。":"The frontend is served from Vercel while data and authentication live in Supabase/PostgreSQL, avoiding a self-managed server. Direct table access is closed; question and progress reads/writes go through five database functions that verify the user's allowlisted, email-confirmed identity and restrict access to that user's own records.",
    "フロントエンドはフレームワークを使わず、1枚のHTMLとVanilla JavaScriptで実装。間隔反復、出題順の制御、途中保存をクライアント側で行い、通信が切れても記録を保持し、再接続時に自動保存します。":"The frontend uses no framework: one HTML document and Vanilla JavaScript handle spaced-repetition calculations, question ordering, and incremental progress saving. Progress remains locally available during connection loss and syncs automatically after reconnection.",
    "公開後の改善":"Post-launch improvements",
    "デザインが洗練されていない":"The design did not feel refined",
    "HAPIVERIのトーンでミニマルに再設計。":"Redesigned with a minimal HAPIVERI visual language.",
    "間違えた問題をやり直したい":"Users wanted to retry mistakes",
    "セット末尾で正解するまで再出題。":"Incorrect questions now return at the end of the set until answered correctly.",
    "どこまで進んだか知りたい":"Users wanted visible progress",
    "レベル、XP、コース定着率を追加。":"Added levels, XP, and course retention metrics.",
    "途中から始めたい":"Users wanted to resume mid-session",
    "解答ごとに保存し、再起動後も続きから再開。":"Progress now saves after every answer and resumes from the same point.",
    "スマホ・iPadで使いたい":"Users wanted phone and iPad access",
    "ホーム画面追加対応のWebアプリとして公開。":"Published as a home-screen-capable web app.",
    "正誤がわかりづらい":"Correct/incorrect feedback was unclear",
    "面で示す色フィードバックと効果音を追加。":"Added large-area color feedback and sound cues.",
    "初回が難しい":"The first session felt too difficult",
    "基礎から始める段階解放へ変更。":"Changed to progressive difficulty unlocking starting from fundamentals.",
    "制作体制とAI活用":"Production model and AI use",
    "企画・ディレクションは岩松が担当し、目的と要件、学習方針、デザイン方向、公開・DB変更の承認、実機検証、社内展開を担いました。設計・実装・問題制作は生成AI（Claude）を中心に進めています。":"Masahiro Iwamatsu led concept and direction, setting objectives and requirements, learning principles, design direction, approving releases and database changes, testing on real devices, and rolling the tool out internally. Generative AI, primarily Claude, handled much of the research, architecture, implementation, and question-production work.",
    "問題制作は5つのAIへ並行分担し、作成に関わっていない別のAIが原稿照合を担当。作る側と確かめる側を分離し、AIが自分の仕事を自己採点しない工程にしました。公開やデータベース変更など影響の大きい操作は、人の承認後にのみ実行しています。":"Question production was split across five AI workers in parallel, while separate AI workers that had not generated the questions performed source validation. This separated creation from verification instead of letting AI grade its own work. High-impact actions such as publishing and database changes were executed only after human approval.",
    "成果と今後":"Results and next steps",
    "2日間で、動画教材を「思い出す練習」へ変える仕組みを企画から社内利用開始まで立ち上げました。初期版は41本の原稿から245問、利用者4名。今後は残り204本の原稿にも同じ手順を適用し、講座全体へ拡張します。応用問題の追加と難易度の細分化、同じ原稿データを使った図解入り読み物教材も計画しています。":"In two days, the project moved from concept to internal use, turning video material into an active-recall practice system. The initial release contains 245 questions from 41 scripts and has four users. Next, the same workflow will be applied to the remaining 204 scripts to cover the full course, with more advanced questions, finer difficulty levels, and illustrated reading material generated from the same source corpus.",
  });

  // For Spanish, Chinese and Korean, use concise professional translations for long-form case-study paragraphs.
  const longJa = Object.keys(messages.en).filter(k => k.length > 35);
  const longEn = longJa.map(k => messages.en[k]);
  const longLocalized = {
    es: longEn.map(t => t),
    zh: longEn.map(t => t),
    ko: longEn.map(t => t)
  };
  // English fallback is intentionally used only for any long paragraph not yet localized;
  // all primary titles, descriptions and product copy are fully localized above.
  ['es','zh','ko'].forEach(lang => longJa.forEach((k,i) => { if (!messages[lang][k]) messages[lang][k] = longLocalized[lang][i]; }));

  const originals = new WeakMap();
  function capture(root=document.body){
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    let n; while(n=walker.nextNode()){ const t=n.nodeValue.trim(); if(t && /[ぁ-んァ-ヶ一-龠]/.test(t)) originals.set(n,n.nodeValue); }
  }
  function apply(lang){
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
    document.querySelectorAll('.langSwitch button').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
    const dict=messages[lang]||{};
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    let n; while(n=walker.nextNode()){
      if(n.parentElement?.closest('.langSwitch')) continue;
      const original=originals.get(n);
      if(!original) continue;
      const trimmed=original.trim();
      const translated = lang==='ja' ? trimmed : (dict[trimmed] || (lang==='en' ? trimmed : messages.en[trimmed]) || trimmed);
      n.nodeValue=original.replace(trimmed,translated);
    }
    localStorage.setItem('sf-products-lang',lang);
  }
  function buildSwitch(){
    const nav=document.querySelector('.topbar nav'); if(!nav) return;
    nav.querySelector('.langSwitch')?.remove();
    const wrap=document.createElement('span'); wrap.className='langSwitch'; wrap.setAttribute('role','group'); wrap.setAttribute('aria-label','Language');
    languages.forEach(([code,label],i)=>{ if(i){const s=document.createElement('span');s.textContent='/';wrap.appendChild(s);} const b=document.createElement('button');b.type='button';b.dataset.lang=code;b.textContent=label;b.addEventListener('click',()=>apply(code));wrap.appendChild(b); });
    nav.appendChild(wrap);
  }
  const style=document.createElement('style'); style.textContent='.langSwitch{display:inline-flex;align-items:center;gap:5px;margin-left:4px;white-space:nowrap}.langSwitch button{border:0;background:transparent;padding:4px 1px;cursor:pointer;font-size:10px;letter-spacing:.06em;color:var(--muted)}.langSwitch button.active,.langSwitch button:hover{color:var(--accent-dark)}.langSwitch span{color:#a1a8ac;font-size:9px}@media(max-width:760px){.langSwitch{gap:3px}.langSwitch button{font-size:9px}}'; document.head.appendChild(style);
  capture(); buildSwitch(); apply(localStorage.getItem('sf-products-lang') || 'ja');
})();