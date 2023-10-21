
// HELPER FUNCTIONS:
export default async function sendRequest(url, method = 'GET', payload = null) {
    const options = { method }
    const token = getToken()

    if (payload) {
        options.headers = { 'Content-Type': 'application/json' }
        options.body = JSON.stringify(payload)
    }

    if (token) {
        options.headers = options.headers || {}
        options.headers.Authorization = `Bearer ${token}`
    }

    const res = await fetch(url, options)
    if (res.ok) return res.json()
    throw new Error('Bad Request')
}
