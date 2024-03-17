import { useNavigate } from "react-router-dom";
import styles from "./styles/PostItem.module.css";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostItemProps {
  post: Post;
}

function PostListItem({ post }: PostItemProps) {
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <li className={styles.postItem} onClick={handlePostClick}>
      <h2 className={styles.postTitle}>{post.title}</h2>
      <p className={styles.postBody}>{post.body}</p>
    </li>
  );
}

export default PostListItem;
