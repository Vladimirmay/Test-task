// components/PostList.tsx

import { useEffect, useState } from "react";
import PostItem from "./PostListItem";
import styles from "./styles/PostList.module.css";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostListProps {
  posts: Post[];
}

function PostList({ posts }: PostListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const FIRST_FIVE_SCROLLING_PAGES = 5;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10`
        );
        const data = await response.json();

        if (data.length) {
          setDataFetch((prevPosts) => [...prevPosts, ...data]);
        }

        if (currentPage >= FIRST_FIVE_SCROLLING_PAGES) {
          setFetching(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (fetching) {
      fetchData();
    }
  }, [currentPage, fetching]);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setFetching(true);
  };

  const handleScroll = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      currentPage < FIRST_FIVE_SCROLLING_PAGES
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const [dataFetch, setDataFetch] = useState<Post[]>([]);

  return (
    <div className={styles.postListContainer}>
      <h1 className={styles.title}>Blog posts</h1>
      <ol className={styles.postList}>
        {dataFetch.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ol>
      {/* Показываем кнопку "Load More" только если currentPage <= 5 */}
      {currentPage <= FIRST_FIVE_SCROLLING_PAGES ? (
        <button className={styles.loadMoreButton} onClick={handleLoadMore}>
          Load More
        </button>
      ) : (
        "loading..."
      )}
    </div>
  );
}

export default PostList;
