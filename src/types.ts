import { NavigateFunction } from 'react-router-dom'

import { ProviderContext } from 'notistack'
import { Post } from 'socialvoid'

export interface RouteProps {
  navigate: NavigateFunction
  snackbar: ProviderContext
  query?: { [key: string]: string }
}

export type NotDeletedPost = Post & {
  peer: NonNullable<Post['peer']>
  source: NonNullable<Post['source']>
  text: NonNullable<Post['text']>
  like_count: NonNullable<Post['like_count']>
  repost_count: NonNullable<Post['repost_count']>
  quote_count: NonNullable<Post['quote_count']>
  reply_count: NonNullable<Post['reply_count']>
}
