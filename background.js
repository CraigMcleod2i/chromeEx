chrome.tabs.onUpdated.addListener((tabId, tab) => {
      chrome.tabs.sendMessage(tabId, {
        type: "NEW"
    })
  });