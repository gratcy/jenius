import { ApiTree } from '@apicase/services'
import fetch from "@apicase/adapter-fetch"

export const ApiPost = new ApiTree(fetch, [
  {
    url: 'https://simple-contact-crud.herokuapp.com',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    children: [
      {
        url: 'contact',
        name: 'getContact',
        method: 'GET'
      },
      {
        url: 'contact',
        name: 'postContact',
        method: 'POST'
      },
      {
        url: 'contact/:id',
        name: 'deleteContact',
        method: 'DELETE'
      },
      {
        url: 'contact/:id',
        name: 'editContact',
        method: 'GET'
      },
      {
        url: 'contact/:id',
        name: 'submitEdit',
        method: 'PUT'
      }
    ]
  }
])