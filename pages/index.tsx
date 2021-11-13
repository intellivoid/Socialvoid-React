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

  const [posts, setPosts] = useState<NotDeletedPost[]>()
  const [page, setPage] = useState(1)

  useEffect(() => {
    redirectIfNotAuthenticated(router)

    dispatch(async (client) => {
      const posts = (await client.timeline.retrieveFeed(page)).filter(
        postNotDeleted
      )

      setPosts(posts)
    }, snackbar)
  }, [page])

  return (
    <>
      {posts ? (
        posts.map((post) => (
          <Post key={post.id} post={post} router={router} sx={{ mt: 3 }} />
        ))
      ) : (
        <Loader />
      )}
    </>
  )
}
