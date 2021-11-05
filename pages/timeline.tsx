import { useState } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import Post from "../components/Post";
import { dispatch } from "../utils";
import { Post as PostType } from "socialvoid";

export default function Timeline() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const [posts, setPosts] = useState<PostType[]>();

  dispatch(
    async (client) => {
      const posts = await client.timeline.retrieveFeed();
      setPosts(posts);
    },
    router,
    snackbar,
    {
      requireToBeAuthenticated: true,
    }
  );

  return (
    <>
      {posts?.map((post) => (
        <Post post={post} />
      ))}
    </>
  );
}
