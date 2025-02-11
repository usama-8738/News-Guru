import React from "react";

const NewsItem = ({
  title,
  description,
  imgUrl,
  newsUrl,
  publishedDate,
  authorName,
}) => {
  const defaultImage =
    "https://play-lh.googleusercontent.com/SVPOOzexw-S0H2ll5xBKqgiRjGfIQoXwvJEDcB0ZsHRqKFkI4bFqMQX5MVv3IeBJQW4"; // Fallback for missing images
  const maxExcerptLength = 100; 
  const getExcerpt = (text) => {
    if (!text) return "No description available.";
    if (text.length <= maxExcerptLength) return text;
    const trimmedText = text.substring(0, maxExcerptLength);
    return `${trimmedText.substring(0, trimmedText.lastIndexOf(" "))}...`;
  };

  return (
    <div
      className="card mx-auto my-3"
      style={{
        minHeight: "28rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img
        src={imgUrl || defaultImage}
        className="card-img-top"
        alt={title || "News image"}
        style={{ height: "12rem", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5
          className="card-title"
          onClick={() => {
            window.open(newsUrl, "_blank", "noopener,noreferrer");
          }}
          style={{ color: "rgb(8, 177, 255)", cursor: "pointer" }}
        >
          {title || "No Title Available"}
        </h5>
        <p className="card-text">{getExcerpt(description)}</p>
        <p className="card-text mt-auto">
          <small className="text-muted">
            By {authorName} on {publishedDate}
          </small>
        </p>
        <a
          href={newsUrl}
          className="btn btn-primary btn-sm mt-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
