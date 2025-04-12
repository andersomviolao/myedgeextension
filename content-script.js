// content-script.js
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === "S") {
    const mediaElement = document.querySelector("video, audio, img");
    if (mediaElement) {
      const mediaUrl = mediaElement.src;
      chrome.runtime.sendMessage({ action: "download", url: mediaUrl });
    }
  }
});