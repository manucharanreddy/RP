

import { getIcon } from "../utils/Icons";

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleString();
};

export const Currentweather = ({ locationName, today }) => {
  const icon = getIcon(today?.icon);

  return (
    <>
      <div className="d-flex align-items-start">
        <img src={icon} alt="weather" style={{ width: 80, height: 80, objectFit: "contain" }} />
        <div className="ms-3">
          <div style={{ fontSize: "32px", fontWeight: 600 }}>
            {today ? Math.round(today.temp) : "--"}°C
          </div>
          <div className="text-muted" style={{ fontSize: "12px" }}>
            {today ? formatDate(today.datetime) : locationName}
          </div>
          <div className="mt-2" style={{ color: "#333", fontSize: "13px" }}>
            {today?.description || today?.conditions || ""}
          </div>
        </div>
      </div>

      <div className="mt-3 text-muted" style={{ fontSize: "14px" }}>
        <div>Precipitation: {Math.round(today?.precip ?? 0)}%</div>
        <div>Humidity: {Math.round(today?.humidity ?? 0)}%</div>
      </div>
    </>
  );
};
