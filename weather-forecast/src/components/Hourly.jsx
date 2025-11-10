import React from "react";
import { getIcon } from "../utils/Icons";


export const Hourly = ({ day = {} }) => {
  const hours = day.hours ?? [];

  const formatHour = (hString, idx) => {
    let hourNum = Number(hString?.split?.(":")?.[0]);
    if (Number.isNaN(hourNum)) hourNum = Number(hString);
    if (Number.isNaN(hourNum)) hourNum = idx;
    let hh = hourNum % 24;
    const ampm = hh >= 12 ? "PM" : "AM";
    hh = hh % 12;
    if (hh === 0) hh = 12;
    return `${hh}:00 ${ampm}`;
  };

  return (
    <div className="hourly-grid">
      {hours.slice(0, 24).map((h, idx) => {
        const icon = getIcon(h.icon || day.icon);
        const hourLabel = h.datetime ? formatHour(h.datetime, idx) : formatHour(idx, idx);

        return (
          <div key={idx} className="hourly-card">
            <div className="hourly-time">{hourLabel}</div>
            <img src={icon} alt="icon" className="hourly-icon" />
            <div className="hourly-temp">{Math.round(h.temp)}°</div>
          </div>
        );
      })}
    </div>
  );
};
