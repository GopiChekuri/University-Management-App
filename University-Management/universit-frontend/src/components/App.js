import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./../App.css";

const App = () => {
  const [table, setTable] = useState("student");
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const apiUrl = "http://localhost:3001"; // Backend URL

  const tableFields = {
    student: ["ID", "name", "dept_name", "tot_credit"],
    department: ["ID", "dept_name", "building", "budget"],
    instructor: ["ID", "name", "dept_name", "salary"],
    advisor: ["ID", "SID", "I_id"],
  };

  // Fetch all records
  const fetchRecords = useCallback(() => {
    axios.get(`${apiUrl}/display/${table}`).then((response) => {
      setData(response.data);
      setError("");
      setSuccess("");
    });
  }, [table]);

  // Validate form data
  const validateFormData = () => {
    const missingFields = tableFields[table].filter(
      (field) => !formData[field] || formData[field].trim() === ""
    );
    if (missingFields.length > 0) {
      setError(`Please fill all fields: ${missingFields.join(", ")}`);
      setSuccess("");
      return false;
    }
    setError("");
    return true;
  };

  // Insert a new record
  const insertRecord = () => {
    if (!validateFormData()) return;

    axios.post(`${apiUrl}/insert`, { table, data: formData })
      .then(() => {
        setSuccess("Record inserted successfully.");
        setError("");
        fetchRecords();
      })
      .catch(() => {
        setError("Failed to insert record. Please try again.");
        setSuccess("");
      });
  };

  // Update an existing record
  const updateRecord = () => {
    if (!id || isNaN(id)) {
      setError("Invalid ID: Please provide a valid numeric ID for updating.");
      setSuccess("");
      return;
    }
    if (!validateFormData()) return;

    axios.put(`${apiUrl}/update/${table}/${id}`, formData)
      .then(() => {
        setSuccess("Record updated successfully.");
        setError("");
        fetchRecords();
      })
      .catch(() => {
        setError("Failed to update record. Please check if the ID exists.");
        setSuccess("");
      });
  };

  // Delete a record
  const deleteRecord = () => {
    if (!id || isNaN(id)) {
      setError("Invalid ID: Please provide a valid numeric ID for deletion.");
      setSuccess("");
      return;
    }

    axios.delete(`${apiUrl}/delete/${table}/${id}`)
      .then(() => {
        setSuccess("Record deleted successfully.");
        setError("");
        fetchRecords();
      })
      .catch(() => {
        setError("Failed to delete record. Please check if the ID exists.");
        setSuccess("");
      });
  };

  // Search for a record
  const searchRecord = () => {
    if (!id || isNaN(id)) {
      setError("Invalid ID: Please provide a valid numeric ID for searching.");
      setSuccess("");
      return;
    }

    axios.get(`${apiUrl}/search/${table}/${id}`)
      .then((response) => {
        if (response.data.length > 0) {
          setData(response.data);
          setSuccess("Search completed successfully.");
          setError("");
        } else {
          setError("No record found with the provided ID.");
          setSuccess("");
        }
      })
      .catch(() => {
        setError("Failed to search record. Please try again.");
        setSuccess("");
      });
  };

  useEffect(() => {
    fetchRecords();
  }, [table, fetchRecords]);

  return (
    <div className="app-container">
      <h1>University Management System</h1>

      {/* Table Selection */}
      <label>
        Select Table:
        <select
          onChange={(e) => {
            setTable(e.target.value);
            setFormData({});
            setId("");
            setError("");
            setSuccess("");
          }}
        >
          <option value="student">Student</option>
          <option value="department">Department</option>
          <option value="instructor">Instructor</option>
          <option value="advisor">Advisor</option>
        </select>
      </label>

      {/* Form for CRUD Operations */}
      <div className="form-container">
        <h3>{`Manage ${table.charAt(0).toUpperCase() + table.slice(1)} Records`}</h3>

        {/* Form Inputs */}
        {tableFields[table].map((field) => (
          <div key={field}>
            <label>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
              <input
                type="text"
                placeholder={`Enter ${field}`}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
              />
            </label>
          </div>
        ))}

        {/* ID for Update/Delete/Search */}
        <label>
          ID (for Update/Delete/Search):
          <input
            type="text"
            placeholder="Enter ID"
            onChange={(e) => setId(e.target.value)}
          />
        </label>

        {/* Action Buttons */}
        <div>
          <button onClick={insertRecord}>Insert</button>
          <button onClick={updateRecord}>Update</button>
          <button onClick={deleteRecord}>Delete</button>
          <button onClick={searchRecord}>Search</button>
        </div>
      </div>

      {/* Display Records */}
      <div className="table-container">
        <h3>Records:</h3>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <table>
          <thead>
            <tr>
              {tableFields[table].map((field) => (
                <th key={field}>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((record, index) => (
                <tr key={index}>
                  {tableFields[table].map((field) => (
                    <td key={field}>{record[field]}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableFields[table].length}>No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
