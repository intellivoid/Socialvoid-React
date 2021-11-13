import router, { NextRouter } from 'next/router'

import { client } from '../socialvoid'

export function redirectIfAuthenticated(router: NextRouter) {
  if (client.sessionExists) {
    router.replace('/')
  }
}

export function redirectIfNotAuthenticated(router: NextRouter) {
  if (!client.sessionExists) {
    router.replace('/signin')
  }
}
