import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Newsitem from './newsitem';
import Spinner from './Spinner';
// require('dotenv').config();
// const apikey = process.env.REACT_APP_API_KEY;
const News = ({ country, pageSize, category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  
  const handleNextClick = async () => {
    const apikey = process.env.REACT_APP_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${page + 1}&pageSize=${pageSize}`;
    setLoading(true);
    const data = await fetch(url);
    const parseData = await data.json();
    setArticles(parseData.articles);
    setPage(page + 1);
    setLoading(false);
  };
  
  const handlePreviousClick = async () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page - 1}&pageSize=${pageSize}`;
    setLoading(true);
    const data = await fetch(url);
    const parseData = await data.json();
    setArticles(parseData.articles);
    setPage(page - 1);
    setLoading(false);
  };
  
  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const fetchData = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
      setLoading(true);
      const data = await fetch(url);
      const parseData = await data.json();
      setArticles(parseData.articles);
      setLoading(false);
    };

    fetchData();
  }, [country, category, pageSize, page]);

  return (
    <div className="container my-3">
      <h1 className="text-center">NewsMonkey - Top Headlines</h1>
      <div className="row">
        {loading && <Spinner />}
        {!loading &&
          articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <Newsitem
                title={element.title ? element.title : ''}
                description={element.description ? element.description : ''}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                source={element.source}
                data={element.publishedAt}
              />
            </div>
          ))}
      </div>
      <div className="container d-flex justify-content-between my-2">
        <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePreviousClick}>
          &larr; Previous
        </button>
        <button type="button" className="btn btn-dark" onClick={handleNextClick}>
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general',
};

export default News;
