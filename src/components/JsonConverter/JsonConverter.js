import React, { useEffect } from "react";
import Papa from "papaparse";
import * as firebaseConfig from "../config/FirebaseConifg";
import * as firebase from "firebase";
import "./JsonConverter.css";

export function JsonConverter() {
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
        firebase
          .database()
          .ref("funds/")
          .set(jsonObj);
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
  }, []);

  return (
    <>
      <button className="button-upload" onClick={() => getCsvData()}>
        Convert Data to JSON and Upload to Cloud
      </button>
    </>
  );
}
