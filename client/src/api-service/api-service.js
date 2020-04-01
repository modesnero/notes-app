export default class ApiService {
  auth = async (type, userData) => {
    const response = await fetch(`/api/auth/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(userData)
    })
    return { result: await response.json(), status: await response.status }
  }

  getNote = async (token, id) => {
    const url = id ? `/api/notes/id=${id}` : '/api/notes/'
    const response = await fetch(url, { headers: { auth: token } })
    return { result: await response.json(), status: await response.status }
  }

  postNote = async (token, note) => {
    const response = await fetch('/api/notes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        auth: token
      },
      body: JSON.stringify(note)
    })
    return { result: await response.json(), status: await response.status }
  }

  deleteNote = async (token, id) => {
    const response = await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
      headers: { auth: token }
    })
    return { result: await response.json(), status: await response.status }
  }

  updateNote = async (token, id, note) => {
    const response = await fetch(`/api/notes/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        auth: token
      },
      body: JSON.stringify(note)
    })
    return { result: await response.json(), status: await response.status }
  }
}
