import React, { useState } from "react";
import { post, get } from "../services/ApiEndpoint";
import CopyToClipboardComponent from "../components/CopyToClipboardComponent";

const Home = () => {
  const [value, setValue] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [error, setError] = useState("");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analyticsData, setAnalyticsData] = useState([]);

  const fetchAnalytics = async () => {
    try {
      const request = await get("http://localhost:8001/url/allAnalytics");
      if (request && request.data) {
        setAnalyticsData(request.data); // Set the full analytics data array
      } else {
        console.log("No analytics data found.");
        setAnalyticsData([]);
      }
    } catch (error) {
      console.log("Error fetching analytics", error);
      setAnalyticsData([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!value) {
      setError("Please enter a URL.");
      return;
    }
    const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/;

    if (!urlPattern.test(value)) {
      setError("Please enter a valid URL.");
      return;
    }

    const payload = { url: value };
    try {
      const request = await post("http://localhost:8001/url", payload);
      const response = request.data;
      const modifiedUrl = `http://localhost:8001/${response?.id}`;
      setShortURL(modifiedUrl);
    } catch (error) {
      console.log("error", error);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleViewAnalytics = () => {
    setShowAnalytics(!showAnalytics);
    if (!showAnalytics) {
      fetchAnalytics();
    }
  };

  return (
    <>
      <div className="login-container">
        <h2>URL SHORTENER</h2>
        <form>
          <div className="input-group">
            <label htmlFor="longUrl">Enter URL</label>
            <input
              type="url"
              name="longUrl"
              id="url"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              placeholder="Enter a valid URL"
            />
          </div>
          {error && <div className="error-message">{error}</div>}

          <div className="btn-container">
            <button type="submit" className="submit_btn" onClick={handleSubmit}>
              Submit
            </button>
            <button
              type="button"
              className="copy_btn"
              onClick={handleViewAnalytics}
            >
              View Analytics
            </button>
          </div>
          {shortURL && <CopyToClipboardComponent textToCopy={shortURL} />}
        </form>

        {showAnalytics && (
          <div className="analytics-table">
            <h3>All Link Analytics</h3>
            {analyticsData.length > 0 ? (
              <table className="analytics-table">
                <thead>
                  <tr>
                    <th>Short URL</th>
                    <th>Total Clicks</th>
                    <th>Click Analytics</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.map((data) => (
                    <tr key={data.shortId}>
                      <td>{`http://localhost:8001/${data.shortId}`}</td>
                      <td>{data.totalClicks}</td>
                      <td>
                        {data.analytics.length > 0 ? (
                          <ul>
                            {data.analytics.map((click) => (
                              <li key={click._id}>
                                {new Date(click.timestamp).toLocaleString()},
                              </li>
                            ))}
                          </ul>
                        ) : (
                          "No clicks recorded"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No analytics data available.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
