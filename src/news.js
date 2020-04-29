/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
/**
 * Request Top Headline from https://newsapi.org/
 * Show loading message while fetching
 * Handle Error
 * Complete functionality of 'Load More' & 'Refresh' button
 */

const defaultNews = {
  status: "ok",
  totalResults: 0,
  articles: [],
};
const baseUrl =
  "http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=70440843494e40128e270b683409a14c";

function NewsFeed() {
  const [news, setNews] = useState(defaultNews);
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isrefresh, setRefersh] = useState(false);

  useEffect(() => {
    const fecthData = async () => {
      setLoading(true);
      try {
        const respone = await fetch(`${baseUrl}&page=${page}`);
        const result = await respone.json();
        setNews((current) => {
          return {
            ...result,
            articles: [...current.articles, ...result.articles],
            totalResults: result.totalResults,
            status: result.status,
          };
        });
        if (result.status !== "ok") {
          throw new Error("eror");
        }
      } catch (error) {
        console.log(error);
        setError(true);
      }
      setLoading(false);
    };
    fecthData();
  }, [page, isrefresh]);

  const handleRefresh = () => {
    setNews(defaultNews);
    setLoading(false);
    setPage(1);
    setLoading(false);
    setRefersh(false);
  };
  return (
    <>
      <div className="card" style={{justifyContent:"center"}}>
        <h3>
          Kabar Kabur Luar Negeri
          {isLoading && <p>Masih Loading Berita Nih......</p>}
          {isError && <p>Ada ganguan Kayak nya nihh ......</p>}
        </h3>
        <ol>
          {news.articles.map((item, index) => (
            <h3 key={index}>
              <p style={{fontSize:12}}>{item.title}</p>
              <a href="true" target="blank" style={{textAlign:"center",fontSize:12}}>
                {item.url}
              </a>
            </h3>
          ))}
        </ol>
        {news.articles.length < parseInt(news.totalResults) ? (
          <button style={{margin:"20px" ,backgroundColor:"#818d94", color:"white",width:"100px", height:"40px"}} disabled={isLoading} onClick={() => setPage((c) => c + 1)}>
            Load More
          </button>
        ) : null}
        <button  style={{margin:"20px",backgroundColor:"#818d94", color:"white",width:"100px", height:"40px"}} onClick={handleRefresh} disabled={isLoading}>
          Refresh
        </button>
      </div>
    </>
  );
}

export default NewsFeed;
