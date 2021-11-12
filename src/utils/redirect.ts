import { NavigateFunction } from 'react-router'

import { client } from '../socialvoid'

export function redirectIfAuthenticated(navigate: NavigateFunction) {
  if (client.sessionExists) {
    navigate('/', { replace: true })
  }
}

export function redirectIfNotAuthenticated(navigate: NavigateFunction) {
  if (!client.sessionExists) {
    navigate('/signin', { replace: true })
  }
}
