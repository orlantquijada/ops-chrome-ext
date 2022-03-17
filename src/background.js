function listenFocus() {
  window.addEventListener('blur', () => {
    fetch('http://192.168.1.14:8001/api/barangays/tabs', {
      body: 'lost focus',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
  })
}

function handler(tab) {
  return chrome.windows.getLastFocused().then(async (windowInfo) => {
    fetch('http://192.168.1.14:8001/api/barangays/tabs', {
      body: JSON.stringify({ ...tab, windowInfo, active, a: user }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
  })
}

chrome.tabs.onActivated.addListener(handler)

chrome.storage.onChanged.addListener(async (changes) => {
  console.log('changes', changes)

  if (changes['startExam']?.newValue === true) {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true })

    for (const tab of tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
        func: listenFocus,
      })
    }
  }
})
