import React, { useEffect, useState } from "react";
import * as firebaseConfig from "../config/FirebaseConifg";
import * as firebase from "firebase";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import moment from "moment";


export function FundsView() {
  const [rowData, setRowData] = useState(null);
  const [columnDefs] = useState([
    {
      headerName: "Fund",
      field: "fund_name"
    },
    {
      headerName: "Sub Fund",
      field: "subfund_name"
    },
    {
      headerName: "Share Class",
      field: "share_class_name",
      minwidth: 300
    },
    {
      headerName: "Date",
      field: "date",
      filter: "agDateColumnFilter",
      filterParams: {
        
        comparator: function(filterLocalDateAtMidnight, cellValue) {
          var dateAsString = cellValue;          

          if (dateAsString == null) {
            return 0;
          }

          let d = moment(cellValue, "YYYYMMDD");         
          var cellDate = d.format("DD-MMM-YY");
          
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          } else {
            return 0;
          }
        }
      },
      valueFormatter: params => dateFormatter(params)
    },
    {
      headerName: "Report Status",
      field: "report_status",
      valueFormatter: params => reportStatusFormatter(params),
      cellStyle: params => reportStatusStyle(params)
    },
    {
      headerName: "No. of Alerts",
      field: "nb_alerts",
      width:240
    }
  ]);

  const defaultColDef = {
    sortable: true,
    filter: "agTextColumnFilter",
    menuTabs: "filterMenuTab" | "generalMenuTab" | "columnsMenuTab",    
    resizable :true
  };

  const dateFormatter = params => {
    if (
      params.value === null ||
      params.value === undefined ||
      params.value === ""
    )
      return "";
    let d = moment(params.value, "YYYYMMDD");   
    return d.format("DD-MMM-YY");    
  };

  const reportStatusFormatter = params => {
    if (params.value === "True") return "Ready";
    else return "Not Ready";
  };

  const reportStatusStyle = params => {
    if (params.value === "True") return { color: "#00b300" };
    else return { color: "red" };
  };

  const gridOptions = {
    defaultColDef: defaultColDef  
  };

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig.firebaseConfig);
    }

    var dbRef = firebase.database().ref("funds/");
    dbRef.on("value", function(snapshot) {
      setRowData(snapshot.val());
    });
  }, []);

  return (
    <>
      <div
        className="ag-theme-alpine"
        style={{
          height: "40rem",
          width: "90%"
        }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          gridOptions={gridOptions}
        ></AgGridReact>
      </div>
    </>
  );
}
