import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import Article from "./Article";

function Moderation() {
  const [pendingArticles, setPendingArticles] = useState([]);

  function getArticles() {
    axios
      .get("/viewModerated", {})
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

  function analyseArticle(article, userID, analystDetail) {
    if (
      analystDetail.claim.length > 0 &&
      analystDetail.resultOfEvidence.length > 0 &&
      analystDetail.typeOfResearch.length > 0 &&
      analystDetail.typeOfParticipant.length > 0
    ) {
      article = {
        title: article.title,
        authors: article.authors,
        yearPublished: article.yearPublished,
        journalName: article.journalName,
        volume: article.volume,
        doi: article.doi,
        submitDate: article.submitDate,
        status: "analysed",
        sepractice: analystDetail.SEPractice,
        claim: analystDetail.claim,
        resultOfEvidence: analystDetail.resultOfEvidence,
        typeOfResearch: analystDetail.typeOfResearch,
        typeOfParticipant: analystDetail.typeOfParticipant,
      };

      // // Add the article to our moderatedArticles table
      axios
        .post(
          "/analyseArticle",
          article,
          {
            params: {
              userID: userID,
            },
          }
        )
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
        .post(
          "/deleteModeratedArticle",
          article,
          {
            params: {
              userID: userID,
              title: article.title,
            },
          }
        )
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
    } else {
      alert("Please fill all fields");
    }
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
            <th>Claim</th>
            <th>Result of Evidence</th>
            <th>Type of Research</th>
            <th>Type of Participant</th>
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
                    <Article
                      key={key}
                      article={article}
                      analyseArticle={analyseArticle}
                      userID={userID}
                    ></Article>
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
