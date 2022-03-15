import { useEffect } from 'react'

// useKeydown([
//   {
//     ctrl: true,
//     code: 'KeyF',
//     callback: () => console.log('find'),
//   },
//   {
//     ctrl: true,
//     code: 'KeyC',
//     callback: () => console.log('copy'),
//   },
//   {
//     ctrl: true,
//     code: 'KeyV',
//     callback: () => console.log('paste'),
//   },
// ])

type Key = {
  ctrl?: boolean
  code: `Key${UpperAlphabet}`
  callback: () => void
}

export function useKeydown(keys: Key[]) {
  useEffect(() => {
    function handler(event: KeyboardEvent) {
      for (const { callback, code, ctrl } of keys) {
        const isCode = code === event.code
        if ((ctrl && isPressingCrtl(event) && isCode) || isCode) callback()
      }

      if ((event.ctrlKey || event.metaKey) && event.code === 'KeyF') {
      }
    }

    window.addEventListener('keydown', handler)

    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [])
}

function isPressingCrtl(event: KeyboardEvent) {
  return (event.ctrlKey || event.metaKey) && !event.shiftKey
}

type UpperAlphabet =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'
