import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";

function Submissions() {
  const [submittedArticles, setSubmittedArticles] = useState([]);

  useEffect(() => {
    let ID = sessionStorage.getItem("token");
    axios
      .get("/viewSubmissions", {
        params: {
          userID: ID,
        },
      })
      .then((res) => {
        setSubmittedArticles(res.data[0].submittedArticles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function formatDate(d) {
    let date = new Date(d);
    return date.toDateString();
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
          </tr>
        </thead>
        <tbody>
          {submittedArticles.map((article, key) => {
            return (
              <tr key={key}>
                <td>{article.title}</td>
                <td>{article.authors}</td>
                <td>{formatDate(article.submitDate)}</td>
                <td>{article.status}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Submissions;
