import { Component } from 'react'

import Card, { CardProps } from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import moment from 'moment'

import { getDocument } from '../cache'
import { dispatch } from '../socialvoid'
import { NotDeletedPost } from '../types'
import { unparse } from '../utils/parser'
import { postIsNotDeleted } from '../utils/types'

type PostProps = CardProps & { post: NotDeletedPost; repost?: boolean }

export default class Post extends Component<
  PostProps,
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
      <Card variant="outlined" {...this.props}>
        <CardHeader
          title={
            <Typography>
              <span style={{ fontWeight: 'bold' }}>
                {this.props.post.peer.name}
              </span>{' '}
              <span style={{ opacity: 0.5 }}>
                @{this.props.post.peer.username} &middot;{' '}
                {moment(this.props.post.posted_timestamp * 1000).fromNow()}
              </span>
            </Typography>
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

        {!this.props.repost &&
        this.props.post.reposted_post &&
        postIsNotDeleted(this.props.post.reposted_post) ? (
          <Post
            post={this.props.post.reposted_post}
            sx={{
              mb: 3,
              mr: 'auto',
              ml: 'auto',
              width: '90%',
            }}
            repost
          />
        ) : (
          ''
        )}
      </Card>
    )
  }
}
