import moment from "moment"
import { Component } from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { Post as TypePost } from "socialvoid"
import { getDocument } from "../cache"
import { dispatch } from "../socialvoid"

export default class Post extends Component<
  { post: TypePost },
  { attachmentSrcs: string[] }
> {
  constructor(props: any) {
    super(props)
    this.state = { attachmentSrcs: [] }
  }

  componentDidMount() {
    dispatch(async () => {
      const attachmentSrcs = new Array<string>()

      for (const document of this.props.post.attachments) {
        attachmentSrcs.push(await getDocument(document.id))
      }

      this.setState({ attachmentSrcs })
    })
  }

  render() {
    return (
      <Card variant="outlined" square>
        <CardHeader
          title={this.props.post.peer?.name}
          subheader={
            "@" +
            this.props.post.peer?.username +
            " · " +
            moment(this.props.post.posted_timestamp * 1000).fromNow() +
            " with " +
            this.props.post.source
          }
        />
        {this.props.post.attachments.length !== 0 ? (
          <CardMedia component="img" image={this.state.attachmentSrcs[0]} />
        ) : (
          ""
        )}
        <CardContent>
          <Typography variant="body1">{this.props.post.text}</Typography>
        </CardContent>
      </Card>
    )
  }
}
