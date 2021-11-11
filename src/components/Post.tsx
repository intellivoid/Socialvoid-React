import moment from "moment"
import { Component, useState } from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { Post as TypePost } from "socialvoid"
import { dispatch, getDocumentSrc } from "../socialvoid"

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
        attachmentSrcs.push(await getDocumentSrc(document))
      }

      this.setState({ attachmentSrcs })
    })
  }

  render() {
    return (
      <Card variant="outlined" square>
        <CardHeader
          title={this.props.post.peer?.name}
          subheader={moment(this.props.post.posted_timestamp * 1000).fromNow()}
        />
        {this.props.post.attachments.length != 0 ? (
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
