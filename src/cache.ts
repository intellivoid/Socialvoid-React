import { IDBPDatabase, openDB } from 'idb'

import { client } from './socialvoid'

let _db: IDBPDatabase | undefined

async function getDB() {
  if (typeof _db !== 'undefined') {
    return _db
  }

  _db = await openDB('socialvoidCaches', 1, {
    upgrade(db) {
      db.createObjectStore('documents')
    },
  })
  return _db
}

async function getStore() {
  return (await getDB())
    .transaction('documents', 'readwrite')
    .objectStore('documents')
}

export async function getDocument(id: string): Promise<string> {
  const cache = await (await getStore()).get(id)

  if (typeof cache !== 'undefined') {
    return URL.createObjectURL(new Blob([cache]))
  }

  const data = (await client.cdn.download(id)) as ArrayBuffer

  await (await getStore()).put(data, id)

  return URL.createObjectURL(new Blob([data]))
}
