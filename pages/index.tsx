import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useSnackbar } from 'notistack'

import Loader from '../components/Loader'
import Post from '../components/Post'
import { dispatch } from '../socialvoid'
import { redirectIfNotAuthenticated } from '../utilities/redirect'
import { NotDeletedPost, postNotDeleted } from '../utilities/types'

export default function Home() {
  const router = useRouter()
  const snackbar = useSnackbar()

  const [state, setState] = useState<{
    posts?: NotDeletedPost[]
    page: number
  }>({ page: 1 })

  useEffect(() => {
    redirectIfNotAuthenticated(router)

    dispatch(async (client) => {
      const posts = (await client.timeline.retrieveFeed(state.page)).filter(
        postNotDeleted
      )

      setState((state) => {
        return {
          posts: state.posts ? state.posts.concat(posts) : posts,
          page: state.page + 1,
        }
      })
    }, snackbar)
  }, [state.page])

  return (
    <>
      {state.posts ? (
        state.posts.map((post) => (
          <Post key={post.id} post={post} router={router} sx={{ mt: 3 }} />
        ))
      ) : (
        <Loader />
      )}
    </>
  )
}
