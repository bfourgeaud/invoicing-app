import { FETCH, FETCH_WITH_BODY } from "types";

const get:FETCH = (url) => {
  const requestOptions = {
      method: 'GET'
  }
  return fetch(url, requestOptions).then(handleResponse)
}

const post:FETCH_WITH_BODY = (url, body) => {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
  }
  return fetch(url, requestOptions).then(handleResponse);
}

const put:FETCH_WITH_BODY = (url, body) => {
  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
const _delete = <T>(url:string):Promise<T> => {
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