const toStringAndPad = (value: number) => {
  return value.toString().padStart(2, '0');
};

const getTime = () => {
  const date = new Date();

  const seconds = toStringAndPad(date.getSeconds());
  const minutes = toStringAndPad(date.getMinutes());
  const hours = toStringAndPad(date.getHours());
  const day = toStringAndPad(date.getDate());
  const month = toStringAndPad(date.getMonth() + 1);
  const year = date.getFullYear().toString();

  return `${day}.${month}.${year} - ${hours}.${minutes}.${seconds}`;
};

export default getTime;
