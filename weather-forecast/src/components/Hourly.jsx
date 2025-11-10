
import { getIcon } from "../utils/Icons";

const formatHour = (hourString, dayDate) => {
  try {
    const hourNum = Number(hourString);
    const d = new Date(dayDate);
    d.setHours(isNaN(hourNum) ? d.getHours() : hourNum, 0, 0, 0);
    let hh = d.getHours();
    const ampm = hh >= 12 ? "PM" : "AM";
    hh = hh % 12;
    if (hh === 0) hh = 12;
    return `${hh}:00 ${ampm}`;
  } catch {
    return hourString;
  }
};

export const Hourly = ({ day }) => {
  const hours = day?.hours ?? [];

  return (
    <div className="row g-3">
      {hours.slice(0, 24).map((h, idx) => {
        const icon = getIcon(h.icon || day.icon);
        const hourLabel = h.datetime
          ? formatHour(h.datetime.split(":")[0], day.datetime)
          : formatHour(idx, day.datetime);

        return (
          <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={idx}>
            <div className="card h-100" style={{ borderRadius: 12 }}>
              <div className="card-body d-flex flex-column align-items-center text-center">
                <div className="text-muted" style={{ fontSize: 12 }}>
                  {hourLabel}
                </div>
                <img
                  src={icon}
                  alt="hour-icon"
                  style={{ width: 40, height: 40, margin: "8px 0" }}
                />
                <div style={{ fontWeight: 600 }}>{Math.round(h.temp)}°</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
