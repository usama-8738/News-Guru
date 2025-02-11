import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import PrimaryNav from "./components/PrimaryNav";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const [newsCategory, setNewsCategory] = useState("general");
  const [newsCountry, setNewsCountry] = useState("us");
  const [title, setTitle] = useState("Trending");
  const loadingBarRef = React.useRef(null);
  const updateChange = (category, country, newTitle) => {
    setNewsCategory(category);
    setNewsCountry(country);
    setTitle(newTitle);
  };
  document.title = `NewsGuru - ${title}`;
  const apiKey = process.env.REACT_APP_NEWSGURU_API_KEY;
  return (
    <Router>
      <div>
        <LoadingBar color="#f11946" ref={loadingBarRef} />
        <PrimaryNav updateChange={updateChange} />
        <Routes>
          <Route
            path="/"
            element={
              <News
                newsCategory={newsCategory}
                newsCountry={newsCountry}
                apiKey={apiKey}
                loadingBarRef={loadingBarRef}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
