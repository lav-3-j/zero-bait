chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "zerobait-scan",
    title: "Scan with ZeroBait Lens",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "zerobait-scan" && info.selectionText) {
    // We send the selected text to the active tab to display an overlay
    chrome.tabs.sendMessage(tab.id, {
      action: "scan_text",
      text: info.selectionText
    });
  }
});
