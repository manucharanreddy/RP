
import React, { useEffect, useState } from "react";
import { Searchbar } from "./components/Searchbar";
import { Currentweather } from "./components/Currentweather";
import { Hourly } from "./components/Hourly";
import { Highlights } from "./components/Highlights";
import "./index.css"; 

const API_KEY = "EJ6UBL2JEQGYB3AA4ENASN62J";

export const App = () => {
  const [city, setCity] = useState("Hyderabad, Telangana, India");
  const [data, setData] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async (q) => {
    const location = q || city;
    setLoading(true);
    setError(null);
    try {
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
        location
      )}?unitGroup=${unit === "metric" ? "metric" : "us"}&key=${API_KEY}&contentType=json`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const json = await res.json();
      setData(json);
      setCity(location);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  if (loading && !data) {
    return (
      <div className="app-root d-flex vh-100 justify-content-center align-items-center">
        <div className="p-4 rounded bg-white">Loading weather...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-root d-flex vh-100 justify-content-center align-items-center">
        <div className="p-4 rounded bg-white text-danger">Error: {error}</div>
      </div>
    );
  }

  const today = data?.days?.[0] ?? {};
  const current = data?.currentConditions ?? {};

  return (
    <div className="app-root">
      <div className="app-sheet card rounded-3 shadow-sm">
        <div className="d-flex" style={{ minHeight: "70vh" }}>
          {}
          <aside className="left-aside d-flex flex-column">
            <div>
              <Searchbar initialValue={city} onSearch={(q) => fetchWeather(q)} />
              <div className="mt-4">
                <Currentweather locationName={data?.resolvedAddress} today={today} />
              </div>
            </div>

            <div className="mt-auto small text-muted mb-3">
              {data?.resolvedAddress}
            </div>
          </aside>

          
          <main className="flex-fill right-main d-flex flex-column">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div className="d-flex align-items-center">
                <div>
                  <button
                    onClick={() => { setUnit("metric"); fetchWeather(city); }}
                    className={`btn btn-sm ${unit === "metric" ? "btn-primary" : "btn-outline-secondary"}`}
                  >
                    °C
                  </button>
                  <button
                    onClick={() => { setUnit("us"); fetchWeather(city); }}
                    className={`btn btn-sm ms-2 ${unit === "us" ? "btn-primary" : "btn-outline-secondary"}`}
                  >
                    °F
                  </button>
                </div>
                <div className="ms-3 fw-semibold fs-5">Today</div>
              </div>

              <div className="text-muted small">{today?.datetime}</div>
            </div>

            <div className="right-scroll flex-fill">
              <div className="hourly-wrapper">
                <Hourly day={today} />
              </div>

              <h5 className="mt-4">Today's Highlights</h5>
              <Highlights day={today} current={current} />

              <div className="mt-3 small text-muted">Weather Prediction App by Manu Charan Reddy</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;