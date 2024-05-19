import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/EBooks.css";
import NavBar2 from "./NavBar2";

const EBooks = () => {
  const [ebooks, setEbooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchEbooks();
  }, [page]);

  const fetchEbooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/subjects/ebooks.json?limit=10&page=${page}`
      );

      const ebooksData = response.data.works.map((work) => ({
        title: work.title,
        author: work.authors ? work.authors[0].name : "Unknown",
        link: `https://openlibrary.org${work.key}`,
      }));

      setEbooks((prevEbooks) => [...prevEbooks, ...ebooksData]);
      setHasMore(ebooksData.length > 0);
    } catch (error) {
      console.error("Error fetching ebooks:", error);
    }
    setLoading(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEbooks = ebooks.filter((ebook) =>
    ebook.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    )
      return;
    if (!hasMore) return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="container">
      <NavBar2 />
      <br />
      <div>
        <input
          type="text"
          placeholder="Search books"
          value={searchTerm}
          onChange={handleSearch}
          className="Search"
        />
        <br />
        <div>
          {filteredEbooks.map((ebook, index) => (
            <div className="ebook-item" key={index}>
              <h3 className="ebook-title">{ebook.title}</h3>
              <p className="ebook-author">Author: {ebook.author}</p>
              <a
                href={ebook.link}
                className="read-online-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Online
              </a>
            </div>
          ))}
          {loading && <p>Loading more books...</p>}
          {!loading && hasMore && <p>Loading...</p>}
          {!hasMore && <p>No more books to load</p>}
        </div>
      </div>
    </div>
  );
};

export default EBooks;
