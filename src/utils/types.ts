import { Post } from "socialvoid"

import { NotDeletedPost } from "../types"

export function postIsNotDeleted(post: Post): post is NotDeletedPost {
  return post.peer != null
}
