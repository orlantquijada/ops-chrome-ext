function listenFocus() {
  window.addEventListener('blur', async () => {
    fetch('http://192.168.1.3:8000/api/activities', {
      body: JSON.stringify({
        name: 'LOSE_WINDOW_FOCUS',
        description: 'User has switch his/her tab',
        examId: 1,
        examineeId: 2,
        isSuspicious: true,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
  })
}

async function handler(tab) {
  const { examId, examineeId, ...rest } = await chrome.storage.sync.get([
    'examId',
    'examineeId',
    'startExam',
  ])

  if (rest.startExam)
    fetch('http://127.0.0.1:8000/api/activities', {
      body: JSON.stringify({
        name: 'SWITCHED_TAB',
        description: 'Examinee has switch to another tab',
        examId,
        examineeId,
        isSuspicious: true,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
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
