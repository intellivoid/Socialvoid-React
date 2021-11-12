import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useSnackbar } from 'notistack'

import Loader from '../components/Loader'
import Post from '../components/Post'
import { dispatch } from '../socialvoid'
import { NotDeletedPost, RouteProps } from '../types'
import { redirectIfNotAuthenticated } from '../utils/redirect'

class Component extends React.Component<
  RouteProps & { query: NonNullable<RouteProps['query']> },
  { post?: NotDeletedPost; ready: boolean }
> {
  constructor(props: any) {
    super(props)

    this.state = { ready: false }
  }

  componentDidMount() {
    dispatch(
      async (client) => {
        const post = (await client.timeline.getPost(
          this.props.query.id
        )) as NotDeletedPost

        this.setState({ post, ready: true })
      },
      { ...this.props }
    )
  }

  ready(_post?: NotDeletedPost): _post is NotDeletedPost {
    return this.state.ready
  }

  render() {
    const post = this.state.post

    return this.ready(post) ? (
      <Post post={post} navigate={this.props.navigate} />
    ) : (
      <Loader />
    )
  }
}

export default function Post_() {
  const navigate = useNavigate()
  const snackbar = useSnackbar()

  const query = Object.fromEntries(
    new URLSearchParams(useLocation().search).entries()
  )

  React.useEffect(() => {
    redirectIfNotAuthenticated(navigate)
  })

  return <Component navigate={navigate} snackbar={snackbar} query={query} />
}
