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
        let value = e.target.value;
        let target = e.target.id + "";
        console.log(article)

        article[target] = value;
    }

    function submit() {
        axios.post("http://localhost:8082/submitArticle", article)
            .then((res) => {
                if (res.status == 200) {
                    alert("Article Submitted");
                }
            })
            .catch((er) => {
                console.log(er);
            })
    }

    return (
        <div className="submitDiv">
            <h2>Submit An Article To SPEED</h2>
            <input placeholder="title" id="title" onChange={handleChange}></input>
            <input placeholder="authors" id="authors" onChange={handleChange}></input>
            <input placeholder="year published" id="yearPublished" onChange={handleChange}></input>
            <input placeholder="journal name" id="journalName" onChange={handleChange}></input>
            <input placeholder="volume" id="volume" onChange={handleChange}></input>
            <input placeholder="doi" id="doi" onChange={handleChange}></input>

            <input type="button" value="submit" onClick={submit}/>
        </div>
    )

}

export default SubmitArticle;
