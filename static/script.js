"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /* horizontal scroll */
  const stickyContainers = document.querySelectorAll(".horizontal_scroll");

  stickyContainers.forEach((stickyContainer) => {
    // get elements
    const stickyItem = stickyContainer.querySelector(".sticky");
    const scroller = stickyContainer.querySelector(".scroller");
    scroller.classList.add("nobar");

    // set sticky height
    const updateStickyHeight = () => {
      const stickyHeight =
        scroller.scrollWidth - scroller.clientWidth + stickyItem.clientHeight;
      stickyContainer.style.setProperty(
        "--sticky-container-height",
        `${stickyHeight}px`
      );
    };
    updateStickyHeight();
    new ResizeObserver(updateStickyHeight).observe(scroller);
    new ResizeObserver(updateStickyHeight).observe(stickyItem);

    // sync scroll
    const syncScroll = () => {
      const rect = stickyContainer.getBoundingClientRect();
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        scroller.scrollLeft = window.scrollY - stickyContainer.offsetTop;
      } else if (rect.bottom < window.innerHeight) {
        scroller.scrollLeft = scroller.scrollWidth - scroller.clientWidth;
      } else {
        scroller.scrollLeft = 0;
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener("scroll", syncScroll, { passive: true });
            syncScroll();
          } else {
            window.removeEventListener("scroll", syncScroll);
          }
        });
      },
      { threshold: 0 }
    );
    observer.observe(stickyContainer);

    // end of forEach
  });

  // end of DOMContentLoaded
});

// skrollr.init();

const videos = document.querySelectorAll(".video");

videos.forEach((video) => {
  video.addEventListener("mouseover", () => {
    video.play(); // ホバー時に動画再生
    console.log("Video playing"); // デバッグ用メッセージ
  });

  video.addEventListener("mouseout", () => {
    video.pause(); // ホバーが外れたら動画を一時停止
    console.log("Video paused"); // デバッグ用メッセージ
  });
});

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-container"); // 'canvas-container'が親要素
}

window.addEventListener("DOMContentLoaded", function () {
  const loadingElement = document.getElementById("loading");

  // ローディング画面を非表示にする関数
  function hideLoading() {
    loadingElement.style.opacity = "0";
    loadingElement.style.visibility = "hidden";
    loadingElement.style.zIndex = "-1"; // 非表示時はz-indexを-1に設定
  }

  // 再訪問のチェックを無効化し、常にローディング画面を表示
  setTimeout(function () {
    hideLoading();
  }, 4000); // 4秒後に非表示
});

// メニュー展開時に背景を固定
// メニュー展開時に背景を固定
const backgroundFix = (bool) => {
  const scrollingElement = () => {
    const browser = window.navigator.userAgent.toLowerCase();
    if ("scrollingElement" in document) return document.scrollingElement;
    return document.documentElement;
  };

  const scrollY = bool
    ? scrollingElement().scrollTop
    : parseInt(document.body.style.top || "0");

  const fixedStyles = {
    height: "100vh",
    position: "fixed",
    top: `${scrollY * -1}px`,
    left: "0",
    width: "100vw",
  };

  Object.keys(fixedStyles).forEach((key) => {
    document.body.style[key] = bool ? fixedStyles[key] : "";
  });

  if (!bool) {
    window.scrollTo(0, scrollY * -1);
  }
};

// 変数定義
const CLASS = "-active";
let flg = false;
let accordionFlg = false;

let hamburger = document.getElementById("js-hamburger");
let focusTrap = document.getElementById("js-focus-trap");
let menu = document.querySelector(".js-nav-area");
let accordionTrigger = document.querySelectorAll(".js-sp-accordion-trigger");
let accordion = document.querySelectorAll(".js-sp-accordion");

// メニュー開閉制御
hamburger.addEventListener("click", (e) => {
  //ハンバーガーボタンが選択されたら
  e.currentTarget.classList.toggle(CLASS);
  menu.classList.toggle(CLASS);
  if (flg) {
    // flgの状態で制御内容を切り替え
    backgroundFix(false);
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.focus();
    flg = false;
  } else {
    backgroundFix(true);
    hamburger.setAttribute("aria-expanded", "true");
    flg = true;
  }
});
window.addEventListener("keydown", () => {
  //escキー押下でメニューを閉じられるように
  if (event.key === "Escape") {
    hamburger.classList.remove(CLASS);
    menu.classList.remove(CLASS);

    backgroundFix(false);
    hamburger.focus();
    hamburger.setAttribute("aria-expanded", "false");
    flg = false;
  }
});

// メニュー内アコーディオン制御
accordionTrigger.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle(CLASS);
    e.currentTarget.nextElementSibling.classList.toggle(CLASS);
    if (accordionFlg) {
      e.currentTarget.setAttribute("aria-expanded", "false");
      accordionFlg = false;
    } else {
      e.currentTarget.setAttribute("aria-expanded", "true");
      accordionFlg = true;
    }
  });
});

// フォーカストラップ制御
focusTrap.addEventListener("focus", (e) => {
  hamburger.focus();
});

// modalwindow
document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScriptが実行されました！");

  const hamburger = document.querySelector(".c-hamburger");
  const headNav = document.querySelector(".p-header__nav");

  if (!hamburger || !headNav) {
    console.log("要素が見つかりません");
    return;
  }

  console.log("スクリプトが読み込まれた！"); // これが出ればJSは読み込まれてる

  hamburger.addEventListener("click", (e) => {
    console.log("ハンバーガーメニューがクリックされた！");

    hamburger.classList.toggle("is-active");
    headNav.classList.toggle("is-active");
  });

  document.addEventListener("click", (e) => {
    if (!headNav.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove("is-active");
      headNav.classList.remove("is-active");
    }
  });
});
