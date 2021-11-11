import { Component } from "react"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "notistack"
import { Post as TypePost } from "socialvoid"
import { Post } from "../components"
import { dispatch } from "../socialvoid"
import { RouteProps } from "../types"

class HomeC extends Component<RouteProps, { posts: TypePost[]; page: number }> {
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

        this.setState({ posts })
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

  return <HomeC navigate={navigate} snackbar={snackbar} />
}
