import {useState} from "react";

function Article(props) {
    const [analystEntries, setAnalystEntries] = useState({
        claim: "",
        SEPractice: "TDD",
        resultOfEvidence: "",
        typeOfResearch: "",
        typeOfParticipant: ""
    });

    function formatDate(d) {
        let date = new Date(d);
        return date.toDateString();
    }

    function handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        setAnalystEntries({...analystEntries, [name]: value})

    }
    return (
        <tr key={props.key}>
            <td>{props.article.title}</td>
            <td>{props.article.authors}</td>
            <td>{formatDate(props.article.submitDate)}</td>
            <td>{props.article.status}</td>
            <td>
                <select
                    name="sepractice"
                    value={analystEntries.SEPractice}
                    onChange={(e) =>
                        handleChange(e)
                    }
                >
                    <option value="TDD">TDD</option>
                    <option value="MDD">Mob Driven Development</option>
                    <option value="Agile">Agile</option>
                </select>
            </td>
            <td>
                <input type="text"
                       onChange={(e) => handleChange(e)}
                       name="claim"
                       value={analystEntries.claim}/>
            </td>
            <td>
                <input type="text"
                       onChange={(e) => handleChange(e)}
                       name="resultOfEvidence"
                       value={analystEntries.resultOfEvidence}/>
            </td>
            <td>
                <input type="text"
                       onChange={(e) => handleChange(e)}
                       name="typeOfResearch"
                       value={analystEntries.typeOfResearch}/>
            </td>
            <td>
                <input type="text"
                       onChange={(e) => handleChange(e)}
                       name="typeOfParticipant"
                       value={analystEntries.typeOfParticipant}/>
            </td>
            <td>
                <button
                    onClick={() => {
                        props.analyseArticle(props.article, props.userID, analystEntries)
                    }

                    }
                >
                    Submit
                </button>
            </td>
        </tr>
    )
}

export default Article;
