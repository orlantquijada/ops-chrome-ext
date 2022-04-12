async function startExamHandler() {
  const { examId, examineeId } = await chrome.storage.sync.get([
    'examId',
    'examineeId',
  ])

  // listen for `alt-tabs`
  window.addEventListener('blur', async (asd) => {
    const { url, activeTabUrl } = await asd.target.chrome.storage.sync.get()

    if (url === activeTabUrl)
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
  const { examId, examineeId, url, startExam } = await chrome.storage.sync.get()

  const tab = await chrome.tabs.get(activeInfo.tabId)
  await chrome.storage.sync.set({ activeTabUrl: tab.url })

  if (startExam) {
    const returned = url === tab.url

    fetch('http://127.0.0.1:8000/api/activities', {
      body: JSON.stringify({
        name: returned ? 'RETURNED' : 'SWITCHED_TAB',
        description: returned
          ? 'has returned to the exam tab.'
          : 'switched to another tab.',
        examId,
        examineeId,
        isSuspicious: !returned,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
  }
}

chrome.tabs.onActivated.addListener(handler)
chrome.tabs.onUpdated.addListener(async (_, changeInfo, tab) => {
  if (!changeInfo.url) return

  // search engine usage is tracked in `tabs.onUpdate` since the alternative, `history.onVisited`
  // does not track usage in incognito
  const { examId, examineeId } = await chrome.storage.sync.get()

  const searchEngines = [
    'google.com',
    'yahoo.com',
    'bing.com',
    'duckduckgo.com',
    'yandex.com',
    'swisscows.com',
    'startpage.com',
    'searchencrypt.com',
    'gibiru.com',
    'wiki.com',
    'onesearch.com',
    'boardreader.com',
    'givewater.com',
    'ekoru.org',
    'ecosia.org',
    'archive.org',
    'neeva.com',
    'wolframalpha.com',
  ]

  function googleQueryStringParser(url) {
    return new URL(url).searchParams.get('q')
  }

  if (searchEngines.some((searchEngine) => tab.url.includes(searchEngine)))
    fetch('http://127.0.0.1:8000/api/activities', {
      body: JSON.stringify({
        name: 'USED_SEARCH_ENGINE',
        description: `has searched "${googleQueryStringParser(
          tab.url
        )}" on google`,
        examId,
        examineeId,
        isSuspicious: true,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
  else if (!tab.url.startsWith('chrome')) {
    fetch('http://127.0.0.1:8000/api/activities', {
      body: JSON.stringify({
        name: 'ACCESSED_SITE',
        description: `has accessed ${tab.url}.`,
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
