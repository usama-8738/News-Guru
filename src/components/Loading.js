import React from "react";
import loadingSrc from "./loading.gif";

const Loading = () => {
  return (
    <div className="text-center my-3">
      <img
        src={loadingSrc}
        alt="Loading..."
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );
};

export default Loading;
