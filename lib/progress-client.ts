export function logProgressOnce(type: string, payload?: any) {
  if (typeof window === 'undefined') return
  try {
    const key = `progress:${type}`
    const now = Date.now()
    const last = window.sessionStorage.getItem(key)
    if (last && now - parseInt(last, 10) < 5000) return
    window.sessionStorage.setItem(key, String(now))
    fetch('/api/progress/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, payload })
    }).catch(() => {})
  } catch {}
}


