import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import Loader from './components/loader';
import Footer from './components/footer';
import Navbar from './components/navbar';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [inputCategory, setInputCategory] = useState("");
  const [inputString, setInputString] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5000";


  // useEffect(() => {
  //   const sessionId = localStorage.getItem("session_id");
  //   if (sessionId) {
  //     setAuthenticated(true);
  //   }
  // }, []);

  
  // Check for session on load
  useEffect(() => {
    const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds
    let timeoutId;
  
    const resetTimer = () => {
      clearTimeout(timeoutId); // Clear the existing timeout
      timeoutId = setTimeout(() => {
        localStorage.removeItem("session_id"); // Clear session ID after timeout
        setAuthenticated(false); // Set authenticated state to false
        console.log("Session expired due to inactivity.");
      }, INACTIVITY_TIMEOUT);
    };
  
    // Attach event listeners to track user activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
  
    // Start the initial timer
    resetTimer();
  
    return () => {
      // Cleanup event listeners and timeout on unmount
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, { password });
      if (response.data.status === "success") {
        localStorage.setItem("session_id", response.data.session_id);
        setAuthenticated(true);
        resetAppState(); // Reset the app state
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("session_id");
    setAuthenticated(false);
    resetAppState(); // Reset the app state
  };

  // const handleLogout = async () => {
  //   try {
  //     const sessionId = localStorage.getItem("session_id");
  //     if (!sessionId) {
  //       console.error("No session ID found.");
  //       return;
  //     }
  
  //     const response = await axios.post(`${API_BASE_URL}/api/logout`, {}, {
  //       headers: { Authorization: sessionId },
  //     });
  
  //     if (response.data.status === "success") {
  //       localStorage.removeItem("session_id"); // Clear session ID
  //       resetAppState(); // Reset the app state
  //       console.log("Logged out successfully.");
  //     } else {
  //       console.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Logout failed:", error.response?.data || error.message);
  //   }
  // };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader when the form is submitted
    const sessionId = localStorage.getItem("session_id");

    try {
      const response = await axios.post(`${API_BASE_URL}/api/process-data`, 
        { inputCategory, inputString },
        {
          headers: {
            Authorization: sessionId, // Include the session ID
          },
        });
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false); // Hide loader when data is received
  };

  const downloadCSV = async (filename) => {
    if (!filename) {
      console.error("Filename is required to download the CSV.");
      return;
    }
  
    const sessionId = localStorage.getItem("session_id"); // Retrieve the session ID
    if (!sessionId) {
      console.error("User is not authenticated. Session ID is missing.");
      return;
    }
  
    try {
      // Fetch the file from the server
      const response = await axios.get(`${API_BASE_URL}/${filename}`, {
        headers: {
          Authorization: sessionId, // Include the session ID in the header
        },
        responseType: "blob", // Ensure the response is treated as a file
      });
  
      // Create a blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); // Set the filename for download
      document.body.appendChild(link);
      link.click();
      link.remove(); // Clean up the DOM
      console.log(`File ${filename} downloaded successfully.`);
    } catch (error) {
      console.error("Error downloading the file:", error.response?.data || error.message);
    }
  };

  const resetAppState = () => {
    setInputCategory(""); // Reset form fields
    setInputString("");   // Reset form input
    setResult(null);      // Clear output/result
    setPassword("");
  };
  
  

  if (!authenticated) {
    return (
      <div className="">
      <Navbar authenticated={authenticated}/>
      <div className="App container py-5">
          <div className="login-container container py-5">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleLogin} className="bg-light p-4 shadow-sm rounded">
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Enter Password:</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-custom w-100">Login</button>
          </form>
        </div>
      </div>
      <Footer />
      </div>
    );
  }

  return (
    <div className="">
      <Navbar authenticated={authenticated} handleLogout={handleLogout} />
      <div className="container">
      <h1 className="p-4 mb-2" style={{ color: "#C95100"}}>Record Search Tool for The Central Database of Shoah Victims' Names</h1>
      
      <section className="bg-white p-4 mb-4">
        {/* <h3>Project Description</h3> */}
        <p>
          The Ackerman Center's Digital Studies of the Holocaust project seeks to analyze records kept about the victims of the Third Reich by applying exploratory data analysis (EDA), descriptive analysis, and statistical analysis techniques. The results of this study aim to illustrate and visually represent patterns in Holocaust records to better understand the brutal history of the Third Reich.
        </p>
        <p>
          This tool retrieves victim records from a dataset originally collected by Yad Vashem, known as The Central Database of Shoah Victims' Names. To use this tool, select a category, enter a search parameter (e.g., “Year”, “1942”), and submit. Note: Large queries may produce CSV files exceeding the Excel row limit.
        </p>
        <a href="https://ackerman.utdallas.edu/digital-studies-of-the-holocaust/" target="_blank" rel="noopener noreferrer">
          Learn more about the project
        </a>
      </section>
      </div>
    <div className="App container py-5">
      {/* <h1 className="text-center mb-4">Record Search Tool for The Central Database of Shoah Victims' Names</h1> */}
      
      <form onSubmit={handleSubmit} className="bg-light p-4 shadow-sm rounded">
        <h2 className="text-center mb-3">Ackerman Record Search Tool</h2>
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

        <button type="submit" className="btn btn-custom w-100" disabled={loading}>Submit</button>
      </form>

      {loading ? ( 
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
          </div>
        )
      )}
    </div>
    <Footer />
    </div>
  );
};

export default App;