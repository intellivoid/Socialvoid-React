import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography,
  CardActions,
} from "@mui/material";
import {
  Star,
  StarOutline,
  ChangeCircle,
  ChangeCircleOutlined,
} from "@mui/icons-material";
import { Post as PostType } from "socialvoid";
import { useState } from "react";
import { unparse } from "../utils";

export default function Post({ post }: { post: PostType }) {
  const [liked, setLiked] = useState(post.flags.includes("liked"));
  const [reposted, setReposted] = useState(post.flags.includes("reposted"));

  const like = async () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
    }
  };

  const repost = async () => {
    console.log(reposted);
    if (reposted) {
      setReposted(false);
    } else {
      setReposted(true);
    }
  };

  return (
    <Card>
      <CardHeader
        title={post.peer?.name}
        subheader={"@" + post.peer?.username}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          dangerouslySetInnerHTML={{
            __html: unparse(post.text!, post.entities!),
          }}
        ></Typography>
      </CardContent>
      <CardActions
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          color="success"
          startIcon={liked ? <Star /> : <StarOutline />}
          onClick={like}
        >
          {" "}
          {post.like_count}
        </Button>
        <Button
          color="info"
          startIcon={reposted ? <ChangeCircle /> : <ChangeCircleOutlined />}
          onClick={repost}
        >
          {" "}
          {post.like_count}
        </Button>
      </CardActions>
    </Card>
  );
}
