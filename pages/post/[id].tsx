import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import * as sv from 'socialvoid'
import { z } from 'zod'

import Loader from '../../components/Loader'
import Post from '../../components/Post'
import { dispatch } from '../../socialvoid'

export default function Post_() {
  const router = useRouter()
  const [post, setPost] = useState<sv.Post>()

  useEffect(() => {
    dispatch(async (client) => {
      const post = await client.timeline.getPost(
        z.string().parse(router.query.id)
      )

      setPost(post)
    })
  })

  return post ? <Post post={post} sx={{ mt: 3 }} /> : <Loader />
}
