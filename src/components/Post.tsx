import { Component } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import moment from 'moment'

import { getDocument } from '../cache'
import { dispatch } from '../socialvoid'
import { NotDeletedPost } from '../types'
import { unparse } from '../utils/parser'

export default class Post extends Component<
  { post: NotDeletedPost },
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
    const media =
      this.props.post.attachments.length !== 0 ? (
        <CardMedia component="img" image={this.state.attachmentSrcs[0]} />
      ) : undefined

    return (
      <Card variant="outlined" square className="Post" sx={{ mt: 1 }}>
        <CardHeader
          title={this.props.post.peer.name}
          subheader={
            '@' +
            this.props.post.peer.username +
            ' · ' +
            moment(this.props.post.posted_timestamp * 1000).fromNow() +
            ' with ' +
            this.props.post.source
          }
        />
        {media}
        <CardContent>
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{
              __html: unparse(this.props.post.text, this.props.post.entities),
            }}
          ></Typography>
        </CardContent>
      </Card>
    )
  }
}
