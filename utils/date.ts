export function validateDate(y: number, m: number, d: number) {
  if ([y, m, d].some((v) => isNaN(v))) return false;
  try {
    const dt = new Date(y, m - 1, d, 0, 0, 0, 0);
    const [yr, mon, day] = dateToObject(dt);
    return (yr == y && mon == m && day == d);
  }
  catch (e) {
    return false;
  }
}

export function isFuture(y: number, m: number, d: number) {
  const today = new Date();
  const date = new Date(y, m - 1, d);
  return date > today;
}

export function dateToObject(date: Date) {
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ]
}
