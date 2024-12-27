import React from "react";
import "./../styles/TableComponent.css";

const TableComponent = ({ data, tableFields }) => {
  return (
    <div className="table-container">
      <h2>Records</h2>
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              {tableFields.map((field) => (
                <th key={field}>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((record, index) => (
              <tr key={index}>
                {tableFields.map((field) => (
                  <td key={field}>{record[field]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No records to display.</p>
      )}
    </div>
  );
};

export default TableComponent;
