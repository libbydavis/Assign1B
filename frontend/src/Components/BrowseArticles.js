import Table from 'react-bootstrap/Table'
import {useEffect, useState} from "react";
import axios from "axios";

function BrowseArticles() {
    const [articles, setArticles] = useState([]);
    const articles1 = [
        {title: "dogs are cool",
        authors: ["david"],
        yearPublished: "2001",
        journalName: "cool dogs journal",
        SEPractice: "Dogs",
        claim: "dogs are indeed cool",
        evidenceResult: "agree",
        researchType: "case study",
        participantType: "dogs"},

        {title: "cats are cool",
            authors: ["rachel", "gia"],
            yearPublished: "2001",
            journalName: "cool dogs journal",
            SEPractice: "Dogs",
            claim: "dogs are indeed cool",
            evidenceResult: "agree",
            researchType: "case study",
            participantType: "dogs"}
    ]

    useEffect(() => {
        axios.get("http://localhost:8082/articles")
            .then((res) => {
                setArticles(res.data);
            })
            .catch((er) => {
            console.log(er);
        })
    }, []);

    function sort(sortBy) {
        let articlesCopy = [...articles];
        articlesCopy.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1);
        setArticles(articlesCopy);
    }

    return (
        <div className="flexCentre">
            <Table className="table-bordered customTableWidth">
                <thead>
                <tr>
                    <th onClick={() => sort("title")}>Title</th>
                    <th>Authors</th>
                    <th onClick={() => sort("yearPublished")}>Year of Publication</th>
                    <th>Journal Name</th>
                    <th>SE Practice</th>
                    <th>Claim</th>
                    <th>Result of Evidence</th>
                    <th>Type of Research</th>
                    <th>Type of Participant</th>
                </tr>
                </thead>
                <tbody>
                {
                    articles.map((article, key) => {
                        return (
                            <tr key={key}>
                                <td>{article.title}</td>
                                <td>{article.authors}</td>
                                <td>{article.yearPublished}</td>
                                <td>{article.journalName}</td>
                                <td>{article.SEPractice}</td>
                                <td>{article.claim}</td>
                                <td>{article.evidenceResult}</td>
                                <td>{article.researchType}</td>
                                <td>{article.participantType}</td>
                            </tr>
                        )
                    })
                }
                </tbody>

            </Table>
        </div>

    )

}


export default BrowseArticles;
