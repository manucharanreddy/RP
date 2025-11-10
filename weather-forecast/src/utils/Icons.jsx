export const ICONS = {
  "partly-cloudy-day": "https://i.ibb.co/PZQXH8V/27.png",
  "partly-cloudy-night": "https://i.ibb.co/Kzkk59k/15.png",
  rain: "https://i.ibb.co/kBd2NTS/39.png",
  "clear-day": "https://i.ibb.co/rb4rrJL/26.png",
  "clear-night": "https://i.ibb.co/1nxNGHL/10.png",
  default: "https://i.ibb.co/rb4rrJL/26.png",
};

export const getIcon = (cond) => {
  if (!cond) return ICONS.default;
  return ICONS[cond] || ICONS.default;
};