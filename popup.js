document.addEventListener('DOMContentLoaded', async () => {
  const toggleBtn = document.getElementById('toggleBtn');
  const opacitySlider = document.getElementById('opacitySlider');
  const opacityValue = document.getElementById('opacityValue');
  const status = document.getElementById('status');

  // Get current tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const tabId = tab.id;

  // Load saved state
  const result = await chrome.storage.local.get([`ironhide_${tabId}`]);
  const savedState = result[`ironhide_${tabId}`] || { enabled: false, opacity: 1.0 };

  // Initialize UI
  updateUI(savedState.enabled, savedState.opacity);

  // Toggle button event
  toggleBtn.addEventListener('click', async () => {
    const newEnabled = !savedState.enabled;
    savedState.enabled = newEnabled;
    
    await chrome.storage.local.set({ [`ironhide_${tabId}`]: savedState });
    
    // Send message to content script
    try {
      await chrome.tabs.sendMessage(tabId, {
        action: 'togglePrivacy',
        enabled: newEnabled,
        opacity: savedState.opacity
      });
    } catch (error) {
      console.log('Could not send message to content script:', error);
    }
    
    updateUI(newEnabled, savedState.opacity);
  });

  // Opacity slider event
  opacitySlider.addEventListener('input', async (e) => {
    const newOpacity = parseFloat(e.target.value);
    savedState.opacity = newOpacity;
    
    await chrome.storage.local.set({ [`ironhide_${tabId}`]: savedState });
    
    // Send message to content script
    if (savedState.enabled) {
      try {
        await chrome.tabs.sendMessage(tabId, {
          action: 'updateOpacity',
          opacity: newOpacity
        });
      } catch (error) {
        console.log('Could not send message to content script:', error);
      }
    }
    
    updateUI(savedState.enabled, newOpacity);
  });

  function updateUI(enabled, opacity) {
    // Update toggle button
    if (enabled) {
      toggleBtn.textContent = 'Disable';
      toggleBtn.classList.remove('disabled');
      opacitySlider.disabled = false;
      status.textContent = 'Privacy Mode: Enabled';
      status.className = 'status enabled';
    } else {
      toggleBtn.textContent = 'Enable';
      toggleBtn.classList.add('disabled');
      opacitySlider.disabled = true;
      status.textContent = 'Privacy Mode: Disabled';
      status.className = 'status disabled';
    }
    
    // Update opacity display
    opacitySlider.value = opacity;
    opacityValue.textContent = `${(opacity * 100).toFixed(0)}%`;
  }
});