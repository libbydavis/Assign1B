import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";

function Moderation() {
  const [pendingArticles, setPendingArticles] = useState([]);
  const [SEPractice, setSEPractice] = useState("TDD");

  function getArticles() {
    axios
      .get("http://localhost:8082/viewModerated", {})
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

  async function analyseArticle(article, userID, title) {
    console.log(userID);
    console.log(title);

    article = {
      title: article.title,
      authors: article.authors,
      yearPublished: article.yearPublished,
      journalName: article.journalName,
      volume: article.volume,
      doi: article.doi,
      submitDate: article.submitDate,
      status: "moderated",
      sepractice: SEPractice,
    };

    console.log(SEPractice);

    // // Add the article to our moderatedArticles table
    axios
      .post("http://localhost:8082/analyseArticle", article, {
        params: {
          userID: userID,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("Article Analysed");
        } else if (res.status === 409) {
          alert("Article Unable To Be Analysed. " + res.data);
        }
      })
      .catch((er) => {
        console.log(er);
      });

    // Delete the article from our moderatedArtiles table
    axios
      .post("http://localhost:8082/deleteModeratedArticle", article, {
        params: {
          userID: userID,
          title: title,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("Article Removed from Submitted");
        } else if (res.status === 409) {
          alert("Article Unable To Be Removed from Submitted");
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
            <th>Choose SE Practice</th>
            <th>Submit</th>
          </tr>
        </thead>
        <tbody>
          {pendingArticles.map((user, key) => {
            let userID = user.userID;
            if (user.moderatedArticles.length > 0) {
              return user.moderatedArticles.map((article, key) => {
                if (article.status === "moderated") {
                  return (
                    <tr key={key}>
                      <td>{article.title}</td>
                      <td>{article.authors}</td>
                      <td>{formatDate(article.submitDate)}</td>
                      <td>{article.status}</td>
                      <td>
                        <select
                          name="sepractice"
                          id="sepractice"
                          onChange={(e) => setSEPractice(e.target.value)}
                        >
                          <option value="TDD">TDD</option>
                          <option value="MDD">Mob Driven Development</option>
                          <option value="Agile">Agile</option>
                        </select>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            analyseArticle(article, userID, article.title)
                          }
                        >
                          Submit
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
