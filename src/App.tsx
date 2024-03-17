import { useEffect, useState } from "react";
import styles from "./styles/App.module.css";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function App() {
  const FIRST_FIVE_SCROLLING_PAGES = 5;
  const DEFAULT_PAGES = 1;

  const [dataFetch, setDataFetch] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGES);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10`
        );
        const data = await response.json();

        if (data.length) {
          setDataFetch((prevData) => [...prevData, ...data]);
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
      currentPage < FIRST_FIVE_SCROLLING_PAGES // Добавляем условие, чтобы загружать посты только на первых 5 страницах при скроллинге
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <h1 className={styles.title}>Blog posts</h1>
      <div className={styles.container}>
        <ol className={styles.postList}>
          {dataFetch.map((item) => {
            return (
              <li key={item.id}>
                <h2 className={styles.postTitle}>{item.title}</h2>

                <p className={styles.postBody}>{item.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
      {/* Показываем кнопку "Load More" только если currentPage >= 5 */}
      {currentPage >= FIRST_FIVE_SCROLLING_PAGES ? (
        <button className={styles.loadMoreButton} onClick={handleLoadMore}>
          Load More
        </button>
      ) : null}
    </>
  );
}

export default App;
