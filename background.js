console.log("Background script loaded");

let lastMessage = null;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received message in background script:", request.action);
  if (request.action === "videoData") {
    lastMessage = request.data;
  }
  if (request.action === "getVideoData") {
    sendResponse({ data: lastMessage });
    console.log("Sending response:", lastMessage);
  }

  if (request.action === "API_REQUEST") {
    let data = JSON.stringify(request.data);
    console.log("send download request:", data);
    fetch(request.url, {
      method: request.method,
      body: data,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log("send download request response:", res.status);
      })
      .catch((err) => {
        console.error("send download request :", err);
      });
  }
  return true;
});
