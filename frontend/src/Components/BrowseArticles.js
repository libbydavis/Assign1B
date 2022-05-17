import Table from 'react-bootstrap/Table'
import {useEffect, useRef, useState} from "react";
import axios from "axios";

function BrowseArticles() {
    const [articles, setArticles] = useState([]);
    const [sortOrder, setSortOrder] = useState("descending");
    const [showSort, setShowSort] = useState({
        title: true,
        authors: false,
        yearPublished: false
    })
    const didMount = useRef(false);
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
        if (!didMount.current) {
            axios.get("http://localhost:8082/articles")
                .then((res) => {
                    setArticles(res.data);
                })
                .catch((er) => {
                    console.log(er);
                })
        }
    }, []);

    function sort(sortBy) {
        let articlesCopy = [...articles];
        if (sortOrder == "ascending") {
            console.log("sorting")
            articlesCopy.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1);
        }
        else if (sortOrder == "descending") {
            console.log("sort de")
            articlesCopy.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1).reverse();
        }

        setArticles(articlesCopy);

        if (sortBy == "title") {
            setShowSort({
                title: true,
                authors: false,
                yearPublished: false
            })
        }
        else if (sortBy == "authors") {
            setShowSort({
                title: false,
                authors: true,
                yearPublished: false
            })
        }
        else if (sortBy == "yearPublished") {
            setShowSort({
                title: false,
                authors: false,
                yearPublished: true
            })
        }
    }

    function changeSortOrder() {
        sortOrder == "descending" ? setSortOrder("ascending") : setSortOrder("descending");

    }

    return (
        <div className="flexCentre">
            <Table className="table-bordered customTableWidth">
                <thead>
                <tr>
                    <th>{showSort.title? <p onClick={changeSortOrder}>Title {sortOrder}</p> : <p onClick={() => sort("title")}>Title</p>}</th>
                    <th>{showSort.authors? <p onClick={changeSortOrder}>Authors {sortOrder}</p> : <p onClick={() => sort("authors")}>Authors</p>}</th>
                    <th>{showSort.yearPublished? <p onClick={changeSortOrder}>Year Published {sortOrder}</p> : <p onClick={() => sort("yearPublished")}>Year Published</p>}</th>
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
