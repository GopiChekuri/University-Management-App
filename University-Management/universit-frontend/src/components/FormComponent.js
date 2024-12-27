import React from "react";
import "./../styles/FormComponent.css";

const FormComponent = ({
  table,
  tableFields,
  formData,
  setFormData,
  id,
  setId,
  insertRecord,
  updateRecord,
  deleteRecord,
  searchRecord,
}) => {
  return (
    <div className="form-container">
      <h2>Manage {table.charAt(0).toUpperCase() + table.slice(1)} Records</h2>
      {tableFields.map((field) => (
        <div key={field} className="form-field">
          <label>{field}:</label>
          <input
            type="text"
            placeholder={`Enter ${field}`}
            value={formData[field] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [field]: e.target.value })
            }
          />
        </div>
      ))}

      <div className="form-field">
        <label>ID (for Update/Delete/Search):</label>
        <input
          type="text"
          placeholder="Enter ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button className="insert" onClick={insertRecord}>
          Insert
        </button>
        <button className="update" onClick={updateRecord}>
          Update
        </button>
        <button className="delete" onClick={deleteRecord}>
          Delete
        </button>
        <button className="search" onClick={searchRecord}>
          Search
        </button>
      </div>
    </div>
  );
};

export default FormComponent;
