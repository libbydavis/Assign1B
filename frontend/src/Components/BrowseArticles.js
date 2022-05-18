import Table from 'react-bootstrap/Table'
import {useEffect, useRef, useState} from "react";
import axios from "axios";

function BrowseArticles() {
    const [articles, setArticles] = useState([]);
    const [sortOrder, setSortOrder] = useState("descending");
    const [showSort, setShowSort] = useState({
        title: true,
        authors: false,
        yearPublished: false,
        journalName: false
    })
    const [sortByCurrent, setSortByCurrent] = useState("title");
    const didMount = useRef(false);

    /**
     *
     */
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
            articlesCopy.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1);
        }
        else if (sortOrder == "descending") {
            articlesCopy.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1).reverse();
        }

        setArticles(articlesCopy);

        if (sortBy == "title") {
            setShowSort({
                title: true,
                authors: false,
                yearPublished: false,
                journalName: false
            })
        }
        else if (sortBy == "authors") {
            setShowSort({
                title: false,
                authors: true,
                yearPublished: false,
                journalName: false
            })
        }
        else if (sortBy == "yearPublished") {
            setShowSort({
                title: false,
                authors: false,
                yearPublished: true,
                journalName: false
            })
        }
        else if (sortBy == "journalName") {
            setShowSort({
                title: false,
                authors: false,
                yearPublished: false,
                journalName: true
            })
        }
    }

    function changeSortOrder(sortBy) {
        setSortByCurrent(sortBy);
        sortOrder == "descending" ? setSortOrder("ascending") : setSortOrder("descending");

    }

    useEffect(() => {
        sort(sortByCurrent);
    }, [sortOrder])

    return (
        <div className="flexCentre">
            <Table className="table-bordered customTableWidth">
                <thead>
                <tr>
                    <th>{showSort.title? <p onClick={() => changeSortOrder("title")}>Title <span className="sortOrder">{sortOrder}</span></p> : <p onClick={() => sort("title")}>Title</p>}</th>
                    <th>{showSort.authors? <p onClick={() => changeSortOrder("authors")}>Authors <span className="sortOrder">{sortOrder}</span></p> : <p onClick={() => sort("authors")}>Authors</p>}</th>
                    <th>{showSort.yearPublished? <p onClick={() => changeSortOrder("yearPublished")}>Year Published <span className="sortOrder">{sortOrder}</span></p> : <p onClick={() => sort("yearPublished")}>Year Published</p>}</th>
                    <th>{showSort.journalName? <p onClick={() => changeSortOrder("journalName")}>Journal Name <span className="sortOrder">{sortOrder}</span></p> : <p onClick={() => sort("journalName")}>Journal Name</p>}</th>
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
                                <td>{article.authors.length <= 1 ? article.authors : article.authors.map((author, key) => {
                                    return <span key={key}>{author}{key + 1 < article.authors.length ? ", " : " "}</span>;
                                })}</td>
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
