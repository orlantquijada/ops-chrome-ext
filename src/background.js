// const endpoint = 'https://ops-api-production.up.railway.app/api/activities'
const endpoint = 'http://127.0.0.1:8000/api/activities'

async function handler(activeInfo) {
  const { startExam } = await chrome.storage.sync.get()
  if (!startExam) return

  const { examId, examineeId, formId, platform } =
    await chrome.storage.sync.get()

  const tab = await chrome.tabs.get(activeInfo.tabId)

  let returned = false

  try {
    returned = formId === getFormId(platform, tab.url)
  } catch (error) {
    returned = false
  }

  fetch(endpoint, {
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
  const { settled, platform, formId } = await chrome.storage.sync.get()

  function equalityFn() {
    try {
      return formId === getFormId(platform, tab.url)
    } catch (error) {
      return false
    }
  }

  if (!changeInfo.url && equalityFn() && !settled) {
    chrome.storage.sync.set({
      startExam: true,
      ssttled: true,
    })
  }
})

chrome.tabs.onUpdated.addListener(async (_, changeInfo, tab) => {
  const { startExam } = await chrome.storage.sync.get()
  if (!changeInfo.url || !startExam || tab.url.startsWith('chrome')) return

  const { examId, examineeId, url, platform } = await chrome.storage.sync.get()

  if (platform === 'MOODLE' && getFormId(platform, tab.url)) return

  try {
    if (platform === 'GOOGLE_FORMS' && getFormId(platform, tab.url)) return
  } catch (error) {
    // try catch is necessary kay nag array indexing ko para makuha ang form id sa google
    // and possible ma array index out of bounds
  }

  // search engine usage is tracked in `tabs.onUpdate` since the alternative, `history.onVisited`
  // does not track usage in incognito
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
  } else if (tab.url !== url) {
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

const parseGoogleFormURL = (url) => {
  // google form url pattern
  // https://docs.google.com/forms/d/e/{form_id}/viewform?usp=sf_link
  const splitURL = url.split('/')

  return {
    id: splitURL[splitURL.length - 2],
  }
}

const parseTeamsFormURL = (url) => {
  // google form url pattern
  // https://docs.google.com/forms/d/e/{form_id}/viewform?usp=sf_link
  return {
    id: new URL(url).searchParams.get('id'),
  }
}

const parseMoodleFormURL = (url) => {
  // moodle form url pattern
  // https://lair.education/mod/quiz/attempt.php?attempt={attempt_id}&cmid={form_id}
  return {
    // only start tracking if `cmid` exists
    // note that `id` being present does not mean that the examinee has already started
    // taking the exam mao nang wa gi apil ang `id` sa parsing
    id: new URL(url).searchParams.get('cmid'),
  }
}

const getFormId = (platform, url) => {
  if (platform === 'TEAMS') return parseTeamsFormURL(url).id
  if (platform === 'GOOGLE_FORMS') return parseGoogleFormURL(url).id
  return parseMoodleFormURL(url).id
}
