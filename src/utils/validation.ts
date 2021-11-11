import { Post } from "socialvoid"
import { NotDeletedPost } from "../types"

export function notDeleted(post: Post): post is NotDeletedPost {
  return post.peer != null
}
