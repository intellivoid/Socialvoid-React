import moment from "moment"
import { useState } from "react"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"
import ChangeCircle from "@mui/icons-material/ChangeCircle"
import ChangeCircleOutlined from "@mui/icons-material/ChangeCircleOutlined"
import Star from "@mui/icons-material/Star"
import StarOutline from "@mui/icons-material/StarOutline"
import { Post as TypePost } from "socialvoid"
import { client } from "../socialvoid"

export default function Post({ post }: { post: TypePost }) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(post.like_count!)

  const like = async () => {
    if (liked) {
      await client.timeline.unlike(post)
      setLiked(false)
      setLikes(likes - 1)
    } else {
      await client.timeline.like(post)
      setLiked(true)
      setLikes(likes + 1)
    }
  }

  const [reposted, setReposted] = useState(false)
  // @ts-ignore
  const [reposts, setReposts] = useState(post.repost_count!)

  const repost = () => {}

  return (
    <Card>
      <CardHeader
        title={post.peer?.name}
        subheader={moment(post.posted_timestamp * 1000).fromNow()}
      />
      <CardContent>
        <Typography variant="body1">{post.text}</Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ width: "100%" }}>
        <Button
          fullWidth
          onClick={like}
          startIcon={liked ? <Star /> : <StarOutline />}
        >
          {likes}
        </Button>
        <Button
          fullWidth
          onClick={repost}
          startIcon={reposted ? <ChangeCircle /> : <ChangeCircleOutlined />}
        >
          {reposts}
        </Button>
      </CardActions>
    </Card>
  )
}
