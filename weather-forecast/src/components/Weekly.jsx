

import React from "react";
import { getIcon } from "../utils/Icons";



export const Weekly = ({ days }) => {
  if (!days || days.length === 0) {
    return <div className="text-muted">No weekly data available.</div>;
  }

  return (
    <div className="row g-3">
      {days.map((d, idx) => {
        const iconUrl = getIcon(d.icon);
        const date = new Date(d.datetime);
        const weekday = date.toLocaleDateString(undefined, { weekday: "short" }); 
        const dayNum = date.toLocaleDateString(undefined, { month: "short", day: "numeric" }); 

        return (
          <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={idx}>
            <div className="card h-100 text-center" style={{ borderRadius: 12 }}>
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <div className="text-muted" style={{ fontSize: 12 }}>{weekday}</div>
                <div className="text-muted" style={{ fontSize: 12 }}>{dayNum}</div>

                <img src={iconUrl} alt="day-icon" style={{ width: 48, height: 48, margin: "8px 0" }} />

                <div style={{ fontWeight: 700, fontSize: 16 }}>
                  {Math.round(d.temp ?? d.tempmax ?? 0)}°
                </div>

                <div className="text-muted" style={{ fontSize: 12 }}>
                  <span>{Math.round(d.tempmin ?? 0)}°</span>
                  <span className="mx-2">/</span>
                  <span>{Math.round(d.tempmax ?? 0)}°</span>
                </div>

                <div className="mt-2 text-muted" style={{ fontSize: 12 }}>
                  {d.conditions ?? ""}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
