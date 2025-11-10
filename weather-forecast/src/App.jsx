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
        <div className="loader-card p-4 rounded">Loading weather...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="app-root d-flex vh-100 justify-content-center align-items-center">
        <div className="loader-card p-4 rounded text-danger">Error: {error}</div>
      </div>
    );
  }

  const days = data?.days ?? [];
  const today = days[0] ?? {};
  const current = data?.currentConditions ?? {};

  return (
    <div className="app-root">
      <div className="app-sheet">
        <div className="sheet-inner d-flex">
          {/* LEFT */}
          <aside className="left-aside d-flex flex-column">
            <div className="left-top">
              <div className="search-wrap mb-3">
                <Searchbar initialValue={city} onSearch={(q) => fetchWeather(q)} />
              </div>

              <div className="weather-hero mt-2">
                <Currentweather locationName={data?.resolvedAddress} today={today} />
              </div>

              <div className="meta mt-4">
                <div className="muted small mb-2">Precipitation: <strong>{Math.round(today?.precip ?? 0)}%</strong></div>
                <div className="muted small">Humidity: <strong>{Math.round(today?.humidity ?? 0)}%</strong></div>
              </div>
            </div>

            <div className="left-footer mt-auto small text-muted">
              {data?.resolvedAddress}
            </div>
          </aside>

          {/* RIGHT */}
          <main className="flex-fill right-main d-flex flex-column">
            <div className="top-controls d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center">
                <div className="unit-toggle btn-group me-3" role="group">
                  <button
                    onClick={() => { setUnit("metric"); fetchWeather(city); }}
                    className={`btn btn-sm ${unit === "metric" ? "btn-solid" : "btn-ghost"}`}
                  >
                    °C
                  </button>
                  <button
                    onClick={() => { setUnit("us"); fetchWeather(city); }}
                    className={`btn btn-sm ${unit === "us" ? "btn-solid" : "btn-ghost"}`}
                  >
                    °F
                  </button>
                </div>

                <div className="view-toggle btn-group me-3" role="group" aria-label="view-toggle">
                  <button
                    type="button"
                    className={`btn btn-sm ${view === "today" ? "btn-solid-primary" : "btn-ghost"}`}
                    onClick={() => setView("today")}
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ${view === "week" ? "btn-solid-primary" : "btn-ghost"}`}
                    onClick={() => setView("week")}
                  >
                    Week
                  </button>
                </div>

                <h4 className="mb-0 ms-2 fw-semibold">Forecast</h4>
              </div>

              <div className="text-muted small">{today?.datetime}</div>
            </div>

            <div className="right-scroll flex-fill">
              <div className="content-pad">
                {view === "today" ? (
                  <>
                    <div className="hourly-wrapper">
                      <Hourly day={today} />
                    </div>

                    <h5 className="mt-4 section-title">Today's Highlights</h5>
                    <Highlights day={today} current={current} />
                  </>
                ) : (
                  <>
                    <h5 className="section-title">Weekly Forecast</h5>
                    <Weekly days={days} />
                  </>
                )}

                <div className="app-credit mt-4 small text-muted">Weather Prediction App by <span className="brand">Manu Charan Reddy</span></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
