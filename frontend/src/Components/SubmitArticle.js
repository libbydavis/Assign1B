import { useContext, useEffect, useState } from "react";
import axios from "axios";
import bibtexParse from "bibtex-parse-js";
import { AppContext } from "../Context";

function SubmitArticle() {
  const [article, setArticle] = useState({
    title: "",
    authors: "",
    yearPublished: "",
    journalName: "",
    volume: "",
    doi: "",
    status: "submitted",
    sepractice: "",
  });

  useEffect(() => {
    let date = new Date();
    setArticle({ ...article, submitDate: date });
  }, []);

  function handleChange(e) {
    let target = e.target.id + "";
    let value = e.target.value;

    //validation
    if (target === "yearPublished") {
      validateRegex(value, /^[0-9]{4}$/, "yearError");
    } else if (target === "title") {
      validateLength(value, 1, "titleError");
    } else if (target === "authors") {
      validateLength(value, 1, "authorsError");
    }

    //set input into state
    setArticle({ ...article, [target]: value });
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
    let yearValid = validateRegex(
      article.yearPublished,
      /^[0-9]{4}$/,
      "yearError"
    );
    let authorsValid = validateLength(article.authors, 1, "authorsError");
    let titleValid = validateLength(article.title, 1, "titleError");

    if (yearValid && authorsValid && titleValid) {
      return true;
    }
    return false;
  }

  function submit() {
    const token = sessionStorage.getItem("token");
    if (valid()) {
      axios
        .post(
          "/api/submitArticle",
          article,
          {
            params: {
              userID: token,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            alert("Article Submitted");

            //clear form
            setArticle({
              title: "",
              authors: "",
              yearPublished: "",
              journalName: "",
              volume: "",
              doi: "",
              status: "submitted",
            });
          } else if (res.status === 409) {
            alert("Article Unable To Be Submitted. " + res.data);
          }
        })
        .catch((er) => {
          console.log(er);
        });
    }
  }

  function handleFileUpload(e) {
    let file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = function (e) {
      console.log(e.target.result);

      let parsedFile = bibtexParse.toJSON(e.target.result);

      populateFields(parsedFile[0].entryTags);
    };
    fileReader.readAsText(file);
  }

  function populateFields(data) {
    const inputTitle = data.title ? data.title : "";
    const inputAuthors = data.author ? data.author : "";
    const inputYear = data.year ? data.year : "";
    const inputJournal = data.journal ? data.journal : "";
    const inputVolume = data.volume ? data.volume : "";
    const doi = data.doi ? data.doi : "";

    setArticle({
      ...article,
      title: inputTitle,
      authors: inputAuthors,
      yearPublished: inputYear,
      journalName: inputJournal,
      volume: inputVolume,
      doi: doi,
    });
  }

  return (
    <div className="submitDiv">
      <h2>Submit An Article To SPEED</h2>
      <input type="file" onChange={handleFileUpload} accept=".bibtex"></input>
      <p id="fileUploadInfo">
        Accepted file formats include bibtex. Only upload one article per bibtex
        file.
      </p>
      <p style={{ display: "none" }} id="titleError" className="errorP">
        Please enter a title
      </p>
      <input
        placeholder="title"
        id="title"
        value={article.title}
        onChange={handleChange}
      ></input>
      <p style={{ display: "none" }} id="authorsError" className="errorP">
        Please enter at least one author
      </p>
      <input
        placeholder="authors"
        id="authors"
        value={article.authors}
        onChange={handleChange}
      ></input>
      <p style={{ display: "none" }} id="yearError" className="errorP">
        Please enter four numbers 0-9
      </p>
      <input
        placeholder="year published"
        value={article.yearPublished}
        id="yearPublished"
        onChange={handleChange}
      ></input>
      <input
        placeholder="journal name"
        id="journalName"
        value={article.journalName}
        onChange={handleChange}
      ></input>
      <input
        placeholder="volume"
        id="volume"
        value={article.volume}
        onChange={handleChange}
      ></input>
      <input
        placeholder="doi"
        id="doi"
        value={article.doi}
        onChange={handleChange}
      ></input>

      <button
        type="button"
        className="buttonLinkStyle submitButton"
        onClick={submit}
      >
        Submit
      </button>
    </div>
  );
}

export default SubmitArticle;
