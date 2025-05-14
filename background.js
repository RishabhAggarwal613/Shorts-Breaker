const REEL_PATTERNS = [
  "instagram.com/reels",
  "instagram.com/reel/",
  "facebook.com/reels",
  "youtube.com/shorts",
];

// Checks if URL matches a reel pattern
function isReelURL(url) {
  return REEL_PATTERNS.some((pattern) => url.includes(pattern));
}

// Checks all tabs every 5 seconds
function checkAllTabs() {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.url && isReelURL(tab.url)) {
        chrome.tabs.remove(tab.id);
      }
    });
  });
}

// React to SPA navigations (e.g., YouTube internal routing)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url && isReelURL(tab.url)) {
    chrome.tabs.remove(tabId);
  }
});

// Also run a 5-second interval check
setInterval(checkAllTabs, 5000);
