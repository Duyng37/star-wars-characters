export const getColors = (count) => {
  const colors = {};
  const letters = "0123456789ABCDEF";

  for (let i = 1; i <= count; i++) {
    let color = "#";
    for (let j = 0; j < 6; j++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    colors[i] = color;
  }

  return colors;
};
