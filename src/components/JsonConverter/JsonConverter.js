import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import * as firebaseConfig from "../config/FirebaseConifg";
import * as firebase from "firebase";
import { useToasts } from "react-toast-notifications";
import "./JsonConverter.css";

export function JsonConverter() {
  const [buttonText, setButtonText] = useState(
    "Convert Data to JSON and Upload to Cloud"
  );
  const uploadedText='Data uploaded, Click to override and upload new data';
  const { addToast } = useToasts();
  const fetchCsv = () => {
    return fetch("/data/tests-data.csv").then(function(response) {
      let reader = response.body.getReader();
      let decoder = new TextDecoder("utf-8");

      return reader.read().then(function(result) {
        return decoder.decode(result.value);
      });
    });
  };

  const getCsvData = async () => {
    let csvData = await fetchCsv();
    Papa.parse(csvData, {
      complete: result => {
        const jsonStr = csvJSON(result);
        let jsonObj = JSON.parse(jsonStr);
        try {
          firebase
            .database()
            .ref("funds/")
            .set(jsonObj);
            setButtonText(uploadedText);
          addToast("Data uploaded successfully.", { appearance: "success", autoDismiss : true });
        } catch (err) {
          addToast(err.message, { appearance: "error" });
        }
      }
    });
  };

  const csvJSON = csv => {
    var lines = csv.data;

    var result = [];

    var headers = lines[0];
    for (var i = 1; i < lines.length; i++) {
      var obj = {};

      var currentline = lines[i];
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    return JSON.stringify(result);
  };

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig.firebaseConfig);
    }

    let dbRef = firebase.database().ref("funds/");
    dbRef.remove();
    dbRef.once("value", snapshot => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log("exists!", userData);
        setButtonText(uploadedText);
      }
    });
  }, []);

  return (
    <>
      <button className="button-upload" onClick={() => getCsvData()}>
        {buttonText}
      </button>
    </>
  );
}
