import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";

function Moderation() {
  const [pendingArticles, setPendingArticles] = useState([]);

  function getArticles() {
    axios
      .get("/viewSubmissions", {})
      .then((res) => {
        setPendingArticles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    getArticles();
  }, [pendingArticles]);

  function formatDate(d) {
    let date = new Date(d);
    return date.toDateString();
  }

  async function approveArticle(article, userID, title) {
    article = {
      title: article.title,
      authors: article.authors,
      yearPublished: article.yearPublished,
      journalName: article.journalName,
      volume: article.volume,
      doi: article.doi,
      submitDate: article.submitDate,
      status: "moderated",
      sepractice: article.sepractice,
      claim: "",
      resultOfEvidence: "",
      typeOfResearch: "",
      typeOfParticipant: "",
    };

    // Add the article to our moderatedArticles table
    axios
      .post(
        "https://cise-assign1b-deploy.herokuapp.com/approveArticle",
        article,
        {
          params: {
            userID: userID,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Article Approved");
        } else if (res.status === 409) {
          alert("Article Unable To Be Approved. " + res.data);
        }
      })
      .catch((er) => {
        console.log(er);
      });

    // Delete the article from our submittedArticles table
    axios
      .post(
        "https://cise-assign1b-deploy.herokuapp.com/deleteSubmittedArticle",
        article,
        {
          params: {
            userID: userID,
            title: title,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Article Removed from old table");
        } else if (res.status === 409) {
          alert("Article Unable To Be removed");
        }
      })
      .catch((er) => {
        console.log(er);
      });

    setPendingArticles([]);
  }

  async function removeArticle(article, userID, title) {
    article = {
      title: article.title,
      authors: article.authors,
      yearPublished: article.yearPublished,
      journalName: article.journalName,
      volume: article.volume,
      doi: article.doi,
      submitDate: article.submitDate,
      status: "removed",
    };

    // Add the article to our removedArticles table
    axios
      .post(
        "https://cise-assign1b-deploy.herokuapp.com:8082/removeArticle",
        article,
        {
          params: {
            userID: userID,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Article Removed");
        } else if (res.status === 409) {
          alert("Article Unable To Be Removed. " + res.data);
        }
      })
      .catch((er) => {
        console.log(er);
      });

    // Delete the article from our submittedArticles table
    axios
      .post(
        "https://cise-assign1b-deploy.herokuapp.com:8082/deleteSubmittedArticle",
        article,
        {
          params: {
            userID: userID,
            title: title,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Article Removed from old table");
        } else if (res.status === 409) {
          alert("Article Unable To Be removed");
        }
      })
      .catch((er) => {
        console.log(er);
      });

    setPendingArticles([]);
  }

  return (
    <div className="flexCentre">
      <Table className="table-bordered customTableWidth">
        <thead>
          <tr>
            <th>Title</th>
            <th>Authors</th>
            <th>Date Submitted</th>
            <th>Status</th>
            <th>Approve</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {pendingArticles.map((user, key) => {
            let userID = user.userID;
            if (user.submittedArticles.length > 0) {
              return user.submittedArticles.map((article, key) => {
                if (article.status === "submitted") {
                  return (
                    <tr key={key}>
                      <td>{article.title}</td>
                      <td>{article.authors}</td>
                      <td>{formatDate(article.submitDate)}</td>
                      <td>{article.status}</td>
                      <td>
                        <button
                          onClick={() =>
                            approveArticle(article, userID, article.title)
                          }
                        >
                          Approve
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            removeArticle(article, userID, article.title)
                          }
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                }
              });
            }
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Moderation;
