import React, { useState, useEffect, useRef } from "react";
import NewItem from "./NewsItem";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ newsCategory, newsCountry, apiKey, loadingBarRef }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const articleUrls = useRef(new Set()); // Ref to track URLs and prevent duplicates
  const convertToLocalTime = (utcTime) => {
    const date = new Date(utcTime);
    return date.toLocaleString();
  };
  const fetchArticles = async () => {
    const url = `https://newsapi.org/v2/top-headlines?category=${newsCategory}&country=${newsCountry}&apiKey=${apiKey}&page=${pageNumber}&pageSize=6`;
    loadingBarRef.current.continuousStart();
    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "ok") {
        const uniqueArticles = data.articles.filter(
          (article) => article.url && !articleUrls.current.has(article.url)
        );

        uniqueArticles.forEach((article) =>
          articleUrls.current.add(article.url)
        );

        setArticles((prevArticles) => [...prevArticles, ...uniqueArticles]);
        setTotalResults(data.totalResults);
      } else {
        console.error("Error fetching news:", data.message);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      loadingBarRef.current.complete();
      setLoading(false);
    }
  };

  // Initial fetch when the component mounts
  useEffect(() => {
    setArticles([]); // Reset articles on category or country change
    articleUrls.current.clear(); // Clear URL tracker
    setPageNumber(1); // Reset page number
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsCategory, newsCountry]);

  // Fetch more data for infinite scroll
  const fetchMoreData = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  // Fetch articles whenever the page number changes
  useEffect(() => {
    if (pageNumber > 1) {
      fetchArticles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  return (
    <div className="container">
      <div className="text-center mt-5">
        <h2>
          Trending News in {newsCountry.toUpperCase()} -{" "}
          {newsCategory.toUpperCase()}
        </h2>
      </div>
      {loading && <Loading />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Loading />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="row my-3">
          {articles.map((article) => {
            const { title, description, urlToImage, url, publishedAt, author } =
              article;
            if (
              title &&
              description &&
              urlToImage &&
              url &&
              !title.toLowerCase().includes("[removed]") &&
              !description.toLowerCase().includes("[removed]")
            ) {
              return (
                <div className="col-md-4" key={url}>
                  <NewItem
                    title={title}
                    description={description}
                    imgUrl={urlToImage}
                    newsUrl={url}
                    publishedDate={convertToLocalTime(publishedAt)}
                    authorName={author || "Unknown"}
                  />
                </div>
              );
            }
            return null; // Skip invalid articles
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default News;
