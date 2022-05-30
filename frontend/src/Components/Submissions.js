import Table from "react-bootstrap/Table";
import {useEffect, useState} from "react";
import axios from "axios";

function Submissions() {
    const [submittedArticles, setSubmittedArticles] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8082/login", {
            params: {
                userID: "627c5fcdec3e0ce3532e74e2"
            }
        }).then(res => {
            setSubmittedArticles(res.data);
        }).catch(err => {
            console.log(err);
        })
    })
    return (
        <div>
            <Table>
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
                        <tr>
                            <td>{article.title}</td>
                            <td>{article.authors}</td>
                            <td>{article.submitDate}</td>
                            <td>{article.status}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </div>
    );
}

export default Submissions;
