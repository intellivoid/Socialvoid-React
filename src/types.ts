import { NavigateFunction } from 'react-router-dom'

import { ProviderContext } from 'notistack'
import { Post } from 'socialvoid'

export interface RouteProps {
  navigate: NavigateFunction
  snackbar: ProviderContext
  query?: { [key: string]: string }
}

export type NotDeletedPost = {
  [P in keyof Post]: NonNullable<Post[P]>
}
