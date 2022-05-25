import {useState} from "react";
import axios from "axios";


function SubmitArticle() {
    const [article, setArticle] = useState({
        title: "",
        authors: "",
        yearPublished: "",
        journalName: "",
        volume: "",
        doi: ""
    });

    function handleChange(e) {
        let target = e.target.id + "";
        let value = e.target.value;

        //validation
        if (target === "yearPublished") {
            validateRegex(value, /^[0-9]{4}$/, "yearError");
        }
        else if (target === "title") {
            validateLength(value, 1, "titleError");
        }
        else if (target === "authors") {
            validateLength(value, 1, "authorsError");
        }

        console.log(article)
        //set input into state
        setArticle({...article, [target]: value});


    }

    function validateRegex(value, regex, errorID) {
        if (!value.match(regex)) {
            document.getElementById(errorID).style.display = "block";
            return false;
        }
        document.getElementById(errorID).style.display = "none";
        return true;

    }

    function validateLength(value, length, errorID) {
        if (value.length < length) {
            document.getElementById(errorID).style.display = "block";
            return false;
        }
        document.getElementById(errorID).style.display = "none";
        return true;

    }

    function valid() {
        let yearValid = validateRegex(article.yearPublished, /^[0-9]{4}$/, "yearError");
        let authorsValid = validateLength(article.authors, 1, "authorsError");
        let titleValid = validateLength(article.title, 1, "titleError");

        if (yearValid && authorsValid && titleValid) {
            return true;
        }
        return false;

    }

    function submit() {
        if (valid()) {
            axios.post("http://localhost:8082/submitArticle", article)
                .then((res) => {
                    if (res.status === 200) {
                        alert("Article Submitted");
                    }
                    else if (res.status === 409) {
                        alert("Article Unable To Be Submitted. " + res.data);
                    }
                })
                .catch((er) => {
                    console.log(er);
                })
        }

    }
    return (
        <div className="submitDiv">
            <h2>Submit An Article To SPEED</h2>
            <p style={{display: 'none'}} id="titleError" className="errorP">Please enter a title</p>
            <input placeholder="title" id="title" onChange={handleChange}></input>
            <p style={{display: 'none'}} id="authorsError" className="errorP">Please enter at least one author</p>
            <input placeholder="authors" id="authors" onChange={handleChange}></input>
            <p style={{display: 'none'}} id="yearError" className="errorP">Please enter four numbers 0-9</p>
            <input placeholder="year published" value={article.yearPublished} id="yearPublished" onChange={handleChange}></input>
            <input placeholder="journal name" id="journalName" onChange={handleChange}></input>
            <input placeholder="volume" id="volume" onChange={handleChange}></input>
            <input placeholder="doi" id="doi" onChange={handleChange}></input>

            <button type="button" className="buttonLinkStyle submitButton" onClick={submit}>Submit</button>
        </div>
    )

}

export default SubmitArticle;
