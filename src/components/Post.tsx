import { useEffect, useState } from 'react'
import { NavigateFunction } from 'react-router'

import Card, { CardProps } from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Typography from '@mui/material/Typography'

import moment from 'moment'
import * as sv from 'socialvoid'

import { getDocument } from '../cache'
import { dispatch } from '../socialvoid'
import { NotDeletedPost } from '../types'
import { unparse } from '../utils/parser'
import { postIsNotDeleted } from '../utils/types'

type PostProps = CardProps & {
  post: sv.Post
  repost?: boolean
  navigate?: NavigateFunction
}

function PostFrame(props: CardProps) {
  return <Card variant="outlined" {...props} />
}

function InnerPostFrame(props: CardProps) {
  return (
    <PostFrame
      sx={{ mb: 3, mr: 'auto', ml: 'auto', width: '90%' }}
      {...props}
    />
  )
}

function DeletedPostView() {
  return (
    <CardContent>
      <Typography variant="body1">This post is deleted.</Typography>
    </CardContent>
  )
}

function PostView({ post }: { post: NotDeletedPost }) {
  const [attachmentSrcs, setattachmentSrcs] = useState<Array<string>>([])

  useEffect(() => {
    dispatch(async () => {
      const attachmentSrcs = new Array<string>()

      for (const document of post.attachments) {
        attachmentSrcs.push(await getDocument(document.id))
      }

      setattachmentSrcs(attachmentSrcs)
    })
  })

  return (
    <>
      <CardHeader
        title={
          <Typography>
            <span style={{ fontWeight: 'bold' }}>{post.peer.name}</span>{' '}
            <span style={{ opacity: 0.5 }}>
              @{post.peer.username} &middot;{' '}
              {moment(post.posted_timestamp * 1000).fromNow()}
            </span>
          </Typography>
        }
      />

      {post.attachments.length !== 0 && (
        <CardMedia component="img" image={attachmentSrcs[0]} />
      )}

      <CardContent>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{
            __html: unparse(post.text, post.entities),
          }}
        ></Typography>
      </CardContent>

      {post.reposted_post && (
        <InnerPostFrame>
          {postIsNotDeleted(post.reposted_post) ? (
            <PostView post={post.reposted_post} />
          ) : (
            <DeletedPostView />
          )}
        </InnerPostFrame>
      )}
    </>
  )
}

export default function Post(props: PostProps) {
  const { post, navigate } = props

  const body = postIsNotDeleted(post) ? (
    <PostView post={post} />
  ) : (
    <DeletedPostView />
  )

  return (
    <PostFrame variant="outlined" {...props}>
      {navigate ? (
        <CardActionArea
          onClick={() =>
            navigate('/post?id=' + encodeURIComponent(props.post.id))
          }
        >
          {body}
        </CardActionArea>
      ) : (
        body
      )}
    </PostFrame>
  )
}
