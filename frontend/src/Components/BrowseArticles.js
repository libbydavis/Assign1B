import Table from 'react-bootstrap/Table'

function BrowseArticles() {
    const articles = [
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
    return (
        <div className="flexCentre">
            <Table className="table-bordered customTableWidth">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Authors</th>
                    <th>Year of Publication</th>
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
