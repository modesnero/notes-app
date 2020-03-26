export default class ApiService {
  auth = async (type, userData) => {
    const response = await fetch(`/api/auth/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(userData)
    })
    const status = await response.status
    const result = await response.json()
    return { result, status }
  }
}
