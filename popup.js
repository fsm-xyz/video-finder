let m3u8Urls = [];

chrome.runtime.sendMessage({ action: "getVideoData" }, (response) => {
  console.log("收到数据:", response);
  m3u8Urls = response.data || [];
  initPopup();
});

// 初始化函数
function initPopup() {
  const urlList = document.getElementById("urlList");
  const statusDot = document.getElementById("statusDot");
  const statusText = document.getElementById("statusText");
  if (m3u8Urls.length > 0) {
    // 显示检测到的URL
    let nourls = urlList.querySelector(".no-urls");
    if (nourls) {
      urlList.removeChild(nourls);
    }
    m3u8Urls.forEach((item, index) => {
      const urlItem = document.createElement("div");
      urlItem.className = "url-item fade-in";
      urlItem.style.animationDelay = `${index * 0.1}s`;

      urlItem.innerHTML = `
            <div class="url-text">${item.link}</div>
            <div class="actions">
                <button class="btn btn-name">
                    <i>▶️</i> ${item.name}
                </button>
                <button class="btn btn-copy" data-url="${item.link}">
                    <i>📋</i> 复制
                </button>
                <button class="btn btn-download" data-url="${item.link}" data-name="${item.name}">
                    <i>💾</i> 下载
                </button>
            </div>
        `;
      urlList.appendChild(urlItem);
    });

    // 更新状态
    statusDot.classList.add("pulse");
    statusText.textContent = `检测到 ${m3u8Urls.length} 个M3U8地址`;
  } else {
    // 没有检测到URL
    const noUrls = document.createElement("div");
    noUrls.className = "no-urls";
    noUrls.innerHTML = `
          <i>🔍</i>
          <p>未检测到M3U8地址<br>请访问包含流媒体的网页</p>
      `;
    urlList.appendChild(noUrls);

    // 更新状态
    statusDot.classList.add("inactive");
    statusText.textContent = "未检测到M3U8地址";
  }

  // 添加事件监听器
  document.querySelectorAll(".btn-copy").forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = btn.getAttribute("data-url");
      copyToClipboard(url);

      // 视觉反馈
      const originalText = btn.innerHTML;
      btn.innerHTML = "<i>✓</i> 已复制";
      btn.style.background = "#4CAF50";

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = "";
      }, 1500);
    });
  });

  document.querySelectorAll(".btn-download").forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = btn.getAttribute("data-url");
      const name = btn.getAttribute("data-name");
      // 视觉反馈
      btn.innerHTML = "<i>⏳</i> 下载中...";

      const data = {
        uri: url,
        name: name,
      };

      chrome.runtime.sendMessage({
        action: "API_REQUEST",
        url: "http://127.0.0.1:8080/m3u8",
        method: "POST",
        data: data,
      });

      setTimeout(() => {
        btn.innerHTML = "<i>✓</i> 已下载";
        btn.style.background = "#2196F3";
      }, 500);
    });
  });
}

// 复制到剪贴板函数
function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

// 初始化页面
document.addEventListener("DOMContentLoaded", initPopup);
