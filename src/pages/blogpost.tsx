import type { Post } from "../db/schema";
import PostView from "../components/post";

export default async function Page({ post }: { post: Post }) {
  return <PostView post={post} showMore={true} />;
}
