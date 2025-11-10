// src/App.jsx
import React, { useEffect, useState } from "react";
import { Searchbar } from "./components/Searchbar";
import { Currentweather } from "./components/Currentweather";
import { Hourly } from "./components/Hourly";
import { Highlights } from "./components/Highlights";
import { Weekly } from "./components/Weekly";
import "./index.css";

const API_KEY = "EJ6UBL2JEQGYB3AA4ENASN62J";

export const App = () => {
  const [city, setCity] = useState("Hyderabad, Telangana, India");
  const [data, setData] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("today"); 

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const days = data?.days ?? [];
  const today = days[0] ?? {};
  const current = data?.currentConditions ?? {};

  return (
    <div className="app-root">
      <div className="app-sheet card rounded-3 shadow-sm">
        <div className="d-flex" style={{ minHeight: "70vh" }}>
          {/* Left fixed column */}
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

          {/* Right fluid column */}
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

                {/* VIEW TOGGLE */}
                <div className="ms-4 btn-group" role="group" aria-label="view-toggle">
                  <button
                    type="button"
                    className={`btn btn-sm ${view === "today" ? "btn-primary" : "btn-outline-secondary"}`}
                    onClick={() => setView("today")}
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ${view === "week" ? "btn-primary" : "btn-outline-secondary"}`}
                    onClick={() => setView("week")}
                  >
                    Week
                  </button>
                </div>

                <div className="ms-3 fw-semibold fs-5">Forecast</div>
              </div>

              <div className="text-muted small">{today?.datetime}</div>
            </div>

            {/* Scrollable content area */}
            <div className="right-scroll flex-fill">
              <div className="hourly-wrapper">
                {view === "today" ? (
                  <>
                    <Hourly day={today} />
                    <h5 className="mt-4">Today's Highlights</h5>
                    <Highlights day={today} current={current} />
                  </>
                ) : (
                  <>
                    <h5>Weekly Forecast</h5>
                    <Weekly days={days} />
                  </>
                )}
              </div>

              <div className="mt-3 small text-muted">Weather Prediction App by ADARSHA HELVAR</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};


export default App;