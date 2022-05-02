async function startExamHandler() {
  const { examId, examineeId } = await chrome.storage.sync.get([
    'examId',
    'examineeId',
  ])

  window.addEventListener('keydown', async (event) => {
    const pasteCode = 'KeyV'
    const withMeta = event.metaKey || event.ctrlKey
    if (
      (withMeta && event.code === pasteCode) ||
      (withMeta && event.shiftKey && event.code === pasteCode)
    )
      navigator.clipboard.readText().then((pastedText) =>
        fetch('http://127.0.0.1:8000/api/activities', {
          body: JSON.stringify({
            name: 'LOSE_WINDOW_FOCUS',
            description: `did paste ${pastedText}`,
            examId,
            examineeId,
            isSuspicious: true,
          }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        })
      )
  })

  // wip: confirm exit exam
  window.addEventListener(
    'beforeunload',
    (e) => {
      e.preventDefault()
      return (e.returnValue = 'Wowowow')
    },
    { capture: true }
  )
}

async function handler(activeInfo) {
  const { startExam } = await chrome.storage.sync.get()
  if (!startExam) return

  const { examId, examineeId, url } = await chrome.storage.sync.get()

  const tab = await chrome.tabs.get(activeInfo.tabId)

  const returned = url === tab.url

  fetch('http://127.0.0.1:8000/api/activities', {
    body: JSON.stringify({
      name: returned ? 'RETURNED' : 'SWITCHED_TAB',
      description: returned
        ? 'has returned to the exam tab.'
        : `switched to another tab${tab.incognito ? ' (incognito)' : ''}.`,
      examId,
      examineeId,
      isSuspicious: !returned,
    }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
}

chrome.tabs.onActivated.addListener(handler)
chrome.tabs.onUpdated.addListener(async (_, changeInfo, tab) => {
  const { startExam } = await chrome.storage.sync.get()
  if (!changeInfo.url || !startExam) return

  // search engine usage is tracked in `tabs.onUpdate` since the alternative, `history.onVisited`
  // does not track usage in incognito
  const { examId, examineeId } = await chrome.storage.sync.get()

  const SEARCH_ENGINES = [
    {
      url: 'google.com/search',
      name: 'Google',
      queryParam: 'q',
    },
    {
      url: 'ecosia.org/search',
      name: 'Ecosia',
      queryParam: 'q',
    },
    {
      url: 'search.brave.com/search',
      name: 'Brave Search',
      queryParam: 'q',
    },
    {
      url: 'duckduckgo.com',
      name: 'DuckDuckGo',
      queryParam: 'q',
    },
    {
      url: 'bing.com/search',
      name: 'Bing',
      queryParam: 'q',
    },
    {
      url: 'search.yahoo.com/search',
      name: 'Yahoo Search',
      queryParam: 'p',
    },
  ]

  function searchQueryStringParser(url, queryParam) {
    return new URL(url).searchParams.get(queryParam)
  }

  const searchEngineUsed = SEARCH_ENGINES.find((searchEngine) =>
    tab.url.includes(searchEngine.url)
  )
  const searchString = searchEngineUsed
    ? searchQueryStringParser(tab.url, searchEngineUsed.queryParam)
    : null

  function removeQueryParams(url) {
    return url.split('?')[0]
  }

  if (searchString) {
    fetch('http://127.0.0.1:8000/api/activities', {
      body: JSON.stringify({
        name: 'USED_SEARCH_ENGINE',
        description: `has searched "${searchString}" on ${
          searchEngineUsed.name
        }${tab.incognito ? ' (incognito)' : ''}.`,
        examId,
        examineeId,
        isSuspicious: true,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
  } else if (!tab.url.startsWith('chrome')) {
    fetch('http://127.0.0.1:8000/api/activities', {
      body: JSON.stringify({
        name: 'ACCESSED_SITE',
        description: `has accessed ${removeQueryParams(tab.url)}${
          tab.incognito ? ' (incognito)' : ''
        }.`,
        examId,
        examineeId,
        isSuspicious: true,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
  }
})

chrome.storage.onChanged.addListener(async (changes) => {
  console.log('changes', changes)

  if (changes['startExam']?.newValue === true) {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true })

    for (const tab of tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
        func: startExamHandler,
      })
    }
  }
})

// set idle time to be 2 minutes
chrome.idle.setDetectionInterval(120)
chrome.idle.onStateChanged.addListener(async (idleState) => {
  const { startExam } = await chrome.storage.sync.get()
  if (idleState !== 'idle' || !startExam) return

  const { examId, examineeId } = await chrome.storage.sync.get()

  fetch('http://127.0.0.1:8000/api/activities', {
    body: JSON.stringify({
      name: 'WENT_IDLE',
      description: 'went idle for after 2 minutes',
      examId,
      examineeId,
      isSuspicious: true,
    }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
})

chrome.windows.onFocusChanged.addListener(async (windowId) => {
  const { startExam } = await chrome.storage.sync.get()
  if (!startExam) return

  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    const { examId, examineeId } = await chrome.storage.sync.get()
    fetch('http://127.0.0.1:8000/api/activities', {
      body: JSON.stringify({
        name: 'LOSE_WINDOW_FOCUS',
        description: 'has opened another application.',
        examId,
        examineeId,
        isSuspicious: true,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
  }
})

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'finish-exam') {
    const { examId, examineeId } = await chrome.storage.sync.get()

    fetch('http://127.0.0.1:8000/api/activities', {
      body: JSON.stringify({
        name: 'FINISHED_EXAM',
        description: 'has finished the exam',
        examId,
        examineeId,
        isSuspicious: false,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
    chrome.storage.sync.clear()
  }
})
