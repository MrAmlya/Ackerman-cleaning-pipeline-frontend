import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import Loader from './components/loader';

const App = () => {
  const [inputCategory, setInputCategory] = useState("");
  const [inputString, setInputString] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader when the form is submitted

    try {
      const response = await axios.post(`${API_BASE_URL}/api/process-data`, {
        inputCategory,
        inputString,
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false); // Hide loader when data is received
  };

  // Function to download CSV
  const downloadCSV = (filename) => {
    if (!filename) {
      console.error("Filename is required to download the CSV.");
      return;
    }

    const link = document.createElement("a");
    link.href = `${API_BASE_URL}/${filename}`; // Update this URL based on your API endpoint for downloading CSV
    // link.href = `${filename}`; // Update this URL based on your API endpoint for downloading CSV
    link.setAttribute("download", filename);
    // link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App container py-5">
      <h1 className="text-center mb-4">Data Extraction Tool</h1>
      
      <form onSubmit={handleSubmit} className="bg-light p-4 shadow-sm rounded">
        <div className="mb-3">
          <label htmlFor="categorySelect" className="form-label">Select Category:</label>
          <select
            id="categorySelect"
            className="form-select"
            value={inputCategory}
            onChange={(e) => setInputCategory(e.target.value)}
            required>
            <option value="">Choose...</option>
            <option value="P">Place</option>
            <option value="Y">Year</option>
            <option value="C">Cause of Death</option>
            <option value="L">Last Name</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="inputString" className="form-label">Enter Items (comma separated):</label>
          <input
            type="text"
            className="form-control"
            id="inputString"
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>Submit</button>
      </form>

      {loading ? ( 
        // Display Loader while the request is processing
        <Loader />
      ) : (
        result && (
          <div className="result-container mt-4">
            <h2 className="text-center">Result</h2>
            <pre className="bg-light p-3 rounded shadow-sm">{JSON.stringify(result, null, 2)}</pre>
            <button
              className="btn btn-secondary mt-3"
              onClick={() => downloadCSV(result.download_url)}>Download CSV
            </button>
            {/* <button onClick={downloadCSV} className="btn btn-success mt-3">Download CSV</button> */}
          </div>
        )
      )}
    </div>
  );
};

export default App;
