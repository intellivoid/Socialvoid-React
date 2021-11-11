import React from "react"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "notistack"
import { Post } from "../components"
import { dispatch } from "../socialvoid"
import { RouteProps, NotDeletedPost } from "../types"
import { notDeleted } from "../utils"

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

        this.setState({ posts: posts.filter(notDeleted) })
      },
      { ...this.props, requireToBeAuthenticated: true }
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

  return <Component navigate={navigate} snackbar={snackbar} />
}
