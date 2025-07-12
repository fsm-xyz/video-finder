console.log("Load aikanbot script ok!");

let videoArr = [];
function getData() {
  let data = document.querySelectorAll("[udata]");
  let title = document.querySelector("#video_title");
  if (!data || data.length === 0) {
    console.log("No data found");
    return false;
  }
  for (i = 0, j = 0; i < data.length; i++, j++) {
    let link = data[i].getAttribute("udata");
    let name = title.innerText + "-" + data[i].innerText;

    videoArr.push({
      name: name,
      link: link,
    });
  }

  console.log("Get data ok", videoArr);
  chrome.runtime.sendMessage({
    action: "videoData",
    data: videoArr,
  });
  return true;
}

if (!getData()) {
  setTimeout(getData, 2000);
}
