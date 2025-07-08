// IronHide Background Script

// Handle keyboard shortcut
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'toggle-privacy') {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    try {
      await chrome.tabs.sendMessage(tab.id, { action: 'keyboardToggle' });
    } catch (error) {
      console.log('Could not send message to content script:', error);
    }
  }
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getCurrentTabId') {
    sendResponse({ tabId: sender.tab?.id });
  }
});

// Clean up storage when tabs are closed
chrome.tabs.onRemoved.addListener(async (tabId) => {
  await chrome.storage.local.remove([`ironhide_${tabId}`]);
});