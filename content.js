// IronHide Content Script
let isPrivacyEnabled = false;
let currentOpacity = 100;
let privacyOverlay = null;

// Initialize on page load
initialize();

async function initialize() {
  // Get current tab state from storage
  const tabId = await getCurrentTabId();
  if (tabId) {
    const result = await chrome.storage.local.get([`ironhide_${tabId}`]);
    const savedState = result[`ironhide_${tabId}`] || { enabled: false, opacity: 100 };
    
    if (savedState.enabled) {
      applyPrivacyMode(savedState.opacity / 100); // Convert percentage to 0-1 range
    }
  }
}

async function getCurrentTabId() {
  try {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: 'getCurrentTabId' }, (response) => {
        resolve(response?.tabId);
      });
    });
  } catch (error) {
    return null;
  }
}

// Listen for messages from popup and background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'togglePrivacy':
      if (request.enabled) {
        applyPrivacyMode(request.opacity);
      } else {
        removePrivacyMode();
      }
      break;
    
    case 'updateOpacity':
      if (isPrivacyEnabled) {
        updateOpacity(request.opacity);
      }
      break;
    
    case 'keyboardToggle':
      togglePrivacyMode();
      break;
  }
  
  sendResponse({ success: true });
});

function applyPrivacyMode(opacity) {
  isPrivacyEnabled = true;
  currentOpacity = opacity * 100; // Convert 0-1 range to 0-100 for storage
  
  if (!privacyOverlay) {
    createPrivacyOverlay();
  }
  
  updateOverlayOpacity();
}

function removePrivacyMode() {
  isPrivacyEnabled = false;
  
  if (privacyOverlay) {
    privacyOverlay.remove();
    privacyOverlay = null;
  }
}

function createPrivacyOverlay() {
  privacyOverlay = document.createElement('div');
  privacyOverlay.id = 'ironhide-privacy-overlay';
  privacyOverlay.style.cssText = `
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background: rgba(255, 255, 255, 0.98) !important;
    z-index: 2147483647 !important;
    pointer-events: none !important;
    transition: opacity 0.3s ease !important;
    backdrop-filter: blur(8px) !important;
  `;
  
  document.documentElement.appendChild(privacyOverlay);
}

function updateOverlayOpacity() {
  if (privacyOverlay) {
    // Convert opacity value to overlay transparency
    // currentOpacity is now 0-100, convert to 0-1 range for calculations
    const normalizedOpacity = currentOpacity / 100;
    // 1.0 opacity = no overlay (transparent)
    // 0.0 opacity = full white overlay
    const overlayOpacity = 1 - normalizedOpacity;
    privacyOverlay.style.opacity = overlayOpacity.toString();
  }
}

function updateOpacity(opacity) {
  // opacity comes as 0-1 range, convert to 0-100 for storage
  currentOpacity = opacity * 100;
  updateOverlayOpacity();
}

async function togglePrivacyMode() {
  const tabId = await getCurrentTabId();
  if (!tabId) return;
  
  const result = await chrome.storage.local.get([`ironhide_${tabId}`]);
  const savedState = result[`ironhide_${tabId}`] || { enabled: false, opacity: 100 };
  
  savedState.enabled = !savedState.enabled;
  if (savedState.enabled) {
    savedState.opacity = 0; // Make invisible when toggling on
  }
  await chrome.storage.local.set({ [`ironhide_${tabId}`]: savedState });
  
  if (savedState.enabled) {
    applyPrivacyMode(savedState.opacity / 100); // Convert percentage to 0-1 range
  } else {
    removePrivacyMode();
  }
  
  // Show notification
  showNotification(`Privacy mode ${savedState.enabled ? 'enabled' : 'disabled'}`);
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed !important;
    top: 20px !important;
    right: 20px !important;
    background: #1e40af !important;
    color: white !important;
    padding: 12px 16px !important;
    border-radius: 8px !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    z-index: 2147483648 !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
    transition: all 0.3s ease !important;
    opacity: 0 !important;
    transform: translateX(100%) !important;
  `;
  notification.textContent = `IronHide: ${message}`;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}