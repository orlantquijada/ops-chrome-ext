const endpoint = 'http://127.0.0.1:8000/api/activities'

async function handler(activeInfo) {
  const { startExam } = await chrome.storage.sync.get()
  if (!startExam) return

  const { examId, examineeId, url } = await chrome.storage.sync.get()

  const tab = await chrome.tabs.get(activeInfo.tabId)

  const returned = url === tab.url

  fetch(endpoint, {
    body: JSON.stringify({
      name: returned ? 'RETURNED' : 'SWITCHED_TAB',
      description: returned
        ? 'has returned to the exam tab.'
        : `1 switched to another tab${tab.incognito ? ' (incognito)' : ''}.`,
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
  const { url, settled } = await chrome.storage.sync.get()

  if (!changeInfo.url && url === tab.url && !settled) {
    chrome.storage.sync.set({
      startExam: true,
      ssttled: true,
    })
  }
})

chrome.tabs.onUpdated.addListener(async (_, changeInfo, tab) => {
  const { startExam } = await chrome.storage.sync.get()
  if (!changeInfo.url || !startExam) return

  // search engine usage is tracked in `tabs.onUpdate` since the alternative, `history.onVisited`
  // does not track usage in incognito
  const { examId, examineeId, url } = await chrome.storage.sync.get()

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
    fetch(endpoint, {
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
  } else if (!tab.url.startsWith('chrome') && tab.url !== url) {
    fetch(endpoint, {
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

chrome.storage.onChanged.addListener((changes) => {
  if (changes['settled']?.newValue === false) {
    const isLate = changes['isLate'].newValue
    const examId = changes['examId'].newValue
    const examineeId = changes['examineeId'].newValue

    fetch(endpoint, {
      body: JSON.stringify({
        name: 'JOINED_EXAM',
        description: isLate
          ? 'is late in starting the exam.'
          : 'has started answering the exam.',
        examId,
        examineeId,
        isSuspicious: false,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
  }
})

// set idle time to be 2 minutes
chrome.idle.setDetectionInterval(120)
chrome.idle.onStateChanged.addListener(async (idleState) => {
  const { startExam } = await chrome.storage.sync.get()
  if (idleState !== 'idle' || !startExam) return

  const { examId, examineeId } = await chrome.storage.sync.get()

  fetch(endpoint, {
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

  const { examId, examineeId, url } = await chrome.storage.sync.get()
  const examTab = await chrome.tabs.query({ url })
  const activeTab = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  })

  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    fetch(endpoint, {
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
  } else if (windowId !== examTab[0].windowId) {
    fetch(endpoint, {
      body: JSON.stringify({
        name: 'SWITCHED_TAB',
        description: `switched to another tab${
          activeTab[0].incognito ? ' (incognito)' : ''
        }.`,
        examId,
        examineeId,
        isSuspicious: true,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
  } else if (activeTab[0].url === examTab[0].url) {
    fetch(endpoint, {
      body: JSON.stringify({
        name: 'RETURNED',
        description: 'has returned to the exam tab.',
        examId,
        examineeId,
        isSuspicious: false,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
  }
})

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'finish-exam') {
    const { examId, examineeId } = await chrome.storage.sync.get()

    fetch(endpoint, {
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
