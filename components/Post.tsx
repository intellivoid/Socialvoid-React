import { useEffect, useState } from 'react'

import { NextRouter } from 'next/router'

import Card, { CardProps } from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import moment from 'moment'
import * as sv from 'socialvoid'

import { getDocument } from '../cache'
import { dispatch } from '../socialvoid'
import { unparse } from '../utilities/parser'
import { NotDeletedPost, postNotDeleted } from '../utilities/types'

type PostProps = CardProps & {
  post: sv.Post
  repost?: boolean
  router?: NextRouter
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
          {postNotDeleted(post.reposted_post) ? (
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
  const { post, router } = props

  const body = postNotDeleted(post) ? (
    <PostView post={post} />
  ) : (
    <DeletedPostView />
  )

  return (
    <PostFrame variant="outlined" {...props}>
      {router ? (
        <CardActionArea
          onClick={() =>
            router.push({ pathname: '/post/[id]', query: { id: post.id } })
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
