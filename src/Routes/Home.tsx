import { useSnackbar } from 'notistack'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import Post from '../components/Post'
import { dispatch } from '../socialvoid'
import { NotDeletedPost, RouteProps } from '../types'
import { redirectIfNotAuthenticated } from '../utils/redirect'
import { postIsNotDeleted } from '../utils/types'

class Component extends React.Component<
  RouteProps,
  { posts: NotDeletedPost[]; page: number }
> {
  constructor(props: any) {
    super(props)

    this.state = {
      posts: [],
      page: 1,
    }
  }

  componentDidMount() {
    dispatch(
      async (client) => {
        const posts = await client.timeline.retrieveFeed(this.state.page)

        this.setState({ posts: posts.filter(postIsNotDeleted) })
      },
      { ...this.props }
    )
  }

  render() {
    return (
      <>
        {this.state.posts.map((post) => (
          <Post post={post} />
        ))}
      </>
    )
  }
}

export default function Home() {
  const navigate = useNavigate()
  const snackbar = useSnackbar()

  React.useEffect(() => {
    redirectIfNotAuthenticated(navigate)
  })

  return <Component navigate={navigate} snackbar={snackbar} />
}
