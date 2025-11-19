// Get DOM elements
const captureBtn = document.getElementById('captureBtn');
const statusDiv = document.getElementById('status');
const statusText = document.getElementById('statusText');

// Add click event listener to full screen capture button
captureBtn.addEventListener('click', async () => {
  try {
    // Add loading state
    captureBtn.classList.add('loading');
    hideStatus();

    // Get the current active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Check if the URL is restricted
    if (tab.url.startsWith('chrome://') ||
      tab.url.startsWith('chrome-extension://') ||
      tab.url.startsWith('edge://') ||
      tab.url.startsWith('about:')) {
      showStatus('Cannot capture on this page. Please navigate to a regular webpage.', 'error');
      captureBtn.classList.remove('loading');
      return;
    }

    // Capture the visible area of the tab
    const dataUrl = await chrome.tabs.captureVisibleTab(tab.windowId, {
      format: 'png'
    });

    // Convert data URL to blob
    const blob = await dataUrlToBlob(dataUrl);

    // Copy to clipboard using the Clipboard API
    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': blob
      })
    ]);

    // Show success message
    showStatus('Screenshot copied to clipboard!', 'success');

  } catch (error) {
    console.error('Error capturing screenshot:', error);
    showStatus('Failed to capture screenshot. Please try again.', 'error');
  } finally {
    // Remove loading state
    captureBtn.classList.remove('loading');
  }
});

// Helper function to convert data URL to Blob
async function dataUrlToBlob(dataUrl) {
  const response = await fetch(dataUrl);
  return await response.blob();
}

// Helper function to show status message
function showStatus(message, type = 'success') {
  statusText.textContent = message;
  statusDiv.classList.remove('hidden', 'error');

  if (type === 'error') {
    statusDiv.classList.add('error');

    // Update error icon
    const statusIcon = statusDiv.querySelector('.status-icon');
    statusIcon.innerHTML = '<path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
  } else {
    // Reset to success icon
    const statusIcon = statusDiv.querySelector('.status-icon');
    statusIcon.innerHTML = '<path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
  }

  // Auto-hide after 3 seconds
  setTimeout(() => {
    hideStatus();
  }, 3000);
}

// Helper function to hide status message
function hideStatus() {
  statusDiv.classList.add('hidden');
}
