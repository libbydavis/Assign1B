import Table from "react-bootstrap/Table";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Search from "./Search";

function BrowseArticles() {
  const [articles, setArticles] = useState([]);
  const [sortOrder, setSortOrder] = useState("descending");
  const [showSort, setShowSort] = useState({
    title: true,
    authors: false,
    yearPublished: false,
    journalName: false,
  });
  const [columnView, setColumnView] = useState({
    title: true,
    authors: true,
    yearPublished: true,
    journalName: true,
    SEPractice: true,
    rating: true,
    claim: true,
    evidenceResult: true,
    researchType: true,
    participantType: true
  })
  const [sortByCurrent, setSortByCurrent] = useState("title");
  const [selectedPractice, setSelectedPractice] = useState("All");
  const didMount = useRef(false);

  const getData = () => {
    axios
      .get("http://localhost:8082/articles")
      .then((res) => {
        setArticles(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  /**
   *
   */
  useEffect(() => {
    if (!didMount.current) {
      getData();
    }
  }, []);

  function sort(sortBy) {
    let articlesCopy = [...articles];
    if (sortOrder == "ascending") {
      articlesCopy.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
    } else if (sortOrder == "descending") {
      articlesCopy.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1)).reverse();
      if (sortBy == "title") {
        setShowSort({
          title: true,
          authors: false,
          yearPublished: false,
          journalName: false,
          rating: false,
        });
      } else if (sortBy == "authors") {
        setShowSort({
          title: false,
          authors: true,
          yearPublished: false,
          journalName: false,
          rating: false,
        });
      } else if (sortBy == "yearPublished") {
        setShowSort({
          title: false,
          authors: false,
          yearPublished: true,
          journalName: false,
          rating: false,
        });
      } else if (sortBy == "journalName") {
        setShowSort({
          title: false,
          authors: false,
          yearPublished: false,
          journalName: true,
          rating: false,
        });
      } else if (sortBy == "rating") {
        setShowSort({
          title: false,
          authors: false,
          yearPublished: false,
          journalName: false,
          rating: true,
        });
      }
    }

    setArticles(articlesCopy);

    if (sortBy == "title") {
      setShowSort({
        title: true,
        authors: false,
        yearPublished: false,
        journalName: false,
      });
    } else if (sortBy == "authors") {
      setShowSort({
        title: false,
        authors: true,
        yearPublished: false,
        journalName: false,
      });
    } else if (sortBy == "yearPublished") {
      setShowSort({
        title: false,
        authors: false,
        yearPublished: true,
        journalName: false,
      });
    } else if (sortBy == "journalName") {
      setShowSort({
        title: false,
        authors: false,
        yearPublished: false,
        journalName: true,
      });
    } else if (sortBy == "rating") {
      setShowSort({
        title: false,
        authors: false,
        yearPublished: false,
        journalName: false,
        rating: true,
      });
    }
  }

  function changeSortOrder(sortBy) {
    setSortByCurrent(sortBy);
    sortOrder == "descending"
      ? setSortOrder("ascending")
      : setSortOrder("descending");
  }

  function hideandshow( columnName){
   let hidden = !columnView[columnName] 
   setColumnView({...columnView,[columnName]: hidden})
  }
   useEffect(() => {
    sort(sortByCurrent);
  }, [sortOrder]);

  return (
    <>
      <div style={{ marginLeft: "2.5%" }}>
        <label style={{ color: "black" }}>Select SE Practice</label>
        <div>
          <select
            name="sePractice"
            id="sePractice"
            onChange={(e) => setSelectedPractice(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Programming Concepts">Programming Concepts</option>
            <option value="Agile">Agile</option>
          </select>
        </div>
      </div>
    
      <div className="flexCentre">
        <Table
          data-testid="tableTest"
          className="table-bordered customTableWidth"
        >
          <thead>
            <tr>
              <th>
                {showSort.title ? (
                  <p onClick={() => changeSortOrder("title")}>
                    Title <span className="sortOrder">{sortOrder}</span>
                  </p>
                ) : (
                  <p onClick={() => sort("title")}>Title</p>
                )}
              </th>
              <th>
                {showSort.authors ? (
                  <p onClick={() => changeSortOrder("authors")}>
                    Authors{" "}
                    <span className="sortOrder" data-testid="sortOrderTest">
                      {sortOrder}
                    </span>
                  </p>
                ) : (
                  <p data-testid="authorsTest" onClick={() => sort("authors")}>
                    Authors
                  </p>
                )}
              </th>
              <th>
                {showSort.yearPublished ? (
                  <p onClick={() => changeSortOrder("yearPublished")}>
                    Year Published{" "}
                    <span className="sortOrder">{sortOrder}</span>
                  </p>
                ) : (
                  <p onClick={() => sort("yearPublished")}>Year Published</p>
                )}
              </th>
              <th>
                {showSort.journalName ? (
                  <p onClick={() => changeSortOrder("journalName")}>
                    Journal Name <span className="sortOrder">{sortOrder}</span>
                  </p>
                ) : (
                  <p onClick={() => sort("journalName")}>Journal Name</p>
                )}
              </th>
              <th>SE Practice</th>
              <th>
                {showSort.rating ? (
                  <p onClick={() => changeSortOrder("rating")}>
                    Rating <span className="sortOrder">{sortOrder}</span>
                  </p>
                ) : (
                  <p onClick={() => sort("rating")}>Rating</p>
                )}
              </th>
              <th>Claim <input onClick = {() => hideandshow ("claim") }type = "checkbox"/> </th>
              <th>Result of Evidence </th>
              <th>Type of Research</th>
              <th>Type of Participant</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, key) => {
              if (article.SEPractice === selectedPractice) {
                return (
                  <tr key={key}>
                    <td>{article.title}</td>
                    <td>
                      {article.authors.length <= 1
                        ? article.authors
                        : article.authors.map((author, key) => {
                            return (
                              <span key={key}>
                                {author}
                                {key + 1 < article.authors.length ? ", " : " "}
                              </span>
                            );
                          })}
                    </td>
                    <td>{article.yearPublished}</td>
                    <td>{article.journalName}</td>
                    <td>{article.SEPractice}</td>
                    <td>{article.rating}</td>
                    {columnView.claim ? <td>{article.claim}</td> : <td> </td>}
                    <td>{article.evidenceResult}</td>
                    <td>{article.researchType}</td>
                    <td>{article.participantType}</td>
                  </tr>
                );
              } else if (selectedPractice === "All") {
                return (
                  <tr key={key}>
                    <td>{article.title}</td>
                    <td>
                      {article.authors.length <= 1
                        ? article.authors
                        : article.authors.map((author, key) => {
                            return (
                              <span key={key}>
                                {author}
                                {key + 1 < article.authors.length ? ", " : " "}
                              </span>
                            );
                          })}
                    </td>
                    <td>{article.yearPublished}</td>
                    <td>{article.journalName}</td>
                    <td>{article.SEPractice}</td>
                    <td>{article.rating}</td>
                    {columnView.claim ? <td>{article.claim}</td> : <td> </td>}
                    <td>{article.evidenceResult}</td>
                    <td>{article.researchType}</td>
                    <td>{article.participantType}</td>   
                  </tr>
                );
              }
            })}
          </tbody>
        </Table>
      </div>
      
    </>
  );
}

export default BrowseArticles;
