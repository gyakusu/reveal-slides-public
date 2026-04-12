/* ================================================================
   Reveal.js 共有初期化モジュール
   ================================================================
   使い方:
     <script src="../../common/js/reveal-init.js"></script>
     <script>
       // 基本（デフォルト設定で初期化）
       RevealInit.start();

       // 複数ファイルに分割されたスライドを結合して読み込む
       RevealInit.start({
         slides: [
           "slides-01-foo.html",
           "slides-02-bar.html",
         ]
       });

       // カスタム設定 + プレゼン固有ロジック
       RevealInit.start({
         config: { transition: "fade" },
         onReady: function(Reveal) {
           Reveal.on("slidechanged", function(event) { ... });
         }
       });
     </script>

   前提:
     - Reveal.js コア・プラグイン・Mermaid の <script> タグが
       このファイルより前に読み込まれていること
     - #slides-container 要素が存在すること
     - slides オプション省略時は slides.html を読み込む
   ================================================================ */

window.RevealInit = {
  start: function (options) {
    options = options || {};

    // slides オプションで複数ファイルを指定可能（省略時は slides.html を使用）
    var slideFiles = options.slides || ["slides.html"];

    Promise.all(
      slideFiles.map(function (file) {
        return fetch(file).then(function (r) {
          return r.text();
        });
      })
    )
      .then(function (htmlList) {
        var combined = htmlList
          .map(function (html) {
            var doc = new DOMParser().parseFromString(html, "text/html");
            var content = doc.querySelector(".slides");
            return content ? content.innerHTML : "";
          })
          .join("\n");
        document.getElementById("slides-container").innerHTML = combined;
      })
      .then(function () {
        var config = Object.assign(
          {
            // ナビゲーション設定
            controls: false,
            progress: true,
            slideNumber: false,
            hash: true,
            history: true,
            keyboard: true,
            overview: true,

            // レイアウト
            center: false,
            touch: true,

            // スライドサイズ（16:9）
            width: 1600,
            height: 900,

            // トランジション
            transition: "slide",
            transitionSpeed: "default",

            // プラグイン
            plugins: [RevealNotes, RevealHighlight, RevealMath, RevealMermaid],
          },
          options.config || {},
        );

        Reveal.initialize(config).then(function () {
          // ページ番号を「現在 / 合計」形式で更新
          function updatePageNumber() {
            var el = document.getElementById("page-number");
            if (!el) return;
            el.textContent =
              Reveal.getIndices().h + 1 + " / " + Reveal.getTotalSlides();
          }

          Reveal.on("slidechanged", updatePageNumber);
          Reveal.on("ready", updatePageNumber);
          updatePageNumber();

          // プレゼン固有コールバック
          if (options.onReady) options.onReady(Reveal);
        });
      })
      .catch(function (err) {
        console.error("スライドの読み込みに失敗しました:", err);
      });
  },
};
