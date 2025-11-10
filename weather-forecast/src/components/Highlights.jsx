

const StatCard = ({ title, value, sub }) => (
  <div className="card h-100" style={{ borderRadius: 12 }}>
    <div className="card-body">
      <div className="text-muted" style={{ fontSize: 12 }}>
        {title}
      </div>
      <div style={{ fontSize: 20, fontWeight: 700 }}>{value}</div>
      {sub && (
        <div className="text-muted" style={{ fontSize: 12, marginTop: 6 }}>
          {sub}
        </div>
      )}
    </div>
  </div>
);

export const Highlights = ({ day, current }) => {
  return (
    <div className="row g-3 mt-2">
      <div className="col-12 col-md-4">
        <StatCard title="UV Index" value={day?.uvindex ?? "--"} />
      </div>
      <div className="col-12 col-md-4">
        <StatCard
          title="Wind Status"
          value={`${Math.round(day?.windspeed ?? current?.windspeed ?? 0)} km/h`}
        />
      </div>
      <div className="col-12 col-md-4">
        <StatCard
          title="Sunrise & Sunset"
          value={`${day?.sunrise ?? "--"} / ${day?.sunset ?? "--"}`}
        />
      </div>

      <div className="col-12 col-md-4">
        <StatCard title="Humidity" value={`${Math.round(day?.humidity ?? 0)}%`} />
      </div>
      <div className="col-12 col-md-4">
        <StatCard
          title="Visibility"
          value={day?.visibility ?? current?.visibility ?? "--"}
        />
      </div>
      <div className="col-12 col-md-4">
        <StatCard
          title="Air Quality"
          value={Math.round(current?.aqi ?? 0)}
          sub="Approx."
        />
      </div>
    </div>
  );
};
