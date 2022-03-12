import { DELETE, GET, POST, PUT } from "types"

const get:GET = (url) => {
  const requestOptions = {
      method: 'GET'
  }
  return fetch(url, requestOptions).then(handleResponse)
}

const post:POST = (url, body) => {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
  }
  return fetch(url, requestOptions).then(handleResponse);
}

const put:PUT = (url, body) => {
  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
const _delete:DELETE = (url:string) => {
  const requestOptions = {
      method: 'DELETE'
  }
  return fetch(url, requestOptions).then(handleResponse);
}

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete
}

// helper functions

const handleResponse = (response: Response) => {
  return response.json().then(data => {
    if (!response.ok) {
      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }
    return data
  })
}