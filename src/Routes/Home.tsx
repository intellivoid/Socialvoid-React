import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSnackbar } from 'notistack'

import Post from '../components/Post'
import { dispatch } from '../socialvoid'
import { NotDeletedPost } from '../types'
import { redirectIfNotAuthenticated } from '../utils/redirect'
import { postIsNotDeleted } from '../utils/types'

export default function Home() {
  const navigate = useNavigate()
  const snackbar = useSnackbar()

  const [state, setState] = useState<{ posts: NotDeletedPost[]; page: number }>(
    { posts: [], page: 1 }
  )

  useEffect(() => {
    redirectIfNotAuthenticated(navigate)

    dispatch(async (client) => {
      const posts = await client.timeline.retrieveFeed(state.page)

      setState({
        posts: posts.filter(postIsNotDeleted),
        page: state.page + 1,
      })
    }, snackbar)
  }, [state.page])

  return (
    <>
      {state.posts.map((post) => (
        <Post post={post} sx={{ mt: 3 }} navigate={navigate} />
      ))}
    </>
  )
}
