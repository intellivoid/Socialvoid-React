import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useSnackbar } from 'notistack'

import Loader from '../components/Loader'
import Post from '../components/Post'
import { dispatch } from '../socialvoid'
import { NotDeletedPost } from '../types'
import { redirectIfNotAuthenticated } from '../utils/redirect'

export default function Post_() {
  const navigate = useNavigate()
  const snackbar = useSnackbar()
  const [post, setPost] = useState<NotDeletedPost>()

  const query = Object.fromEntries(
    new URLSearchParams(useLocation().search).entries()
  )

  useEffect(() => {
    redirectIfNotAuthenticated(navigate)

    dispatch(async (client) => {
      const post = (await client.timeline.getPost(query.id)) as NotDeletedPost

      setPost(post)
    }, snackbar)
  })

  return post ? <Post post={post} navigate={navigate} /> : <Loader />
}
