import { ProviderContext } from 'notistack'
import { NavigateFunction } from 'react-router-dom'
import { Post } from 'socialvoid'

export interface RouteProps {
  navigate: NavigateFunction
  snackbar: ProviderContext
  query?: { [key: string]: string }
}

export type NotDeletedPost = {
  [P in keyof Post]: NonNullable<Post[P]>
}
