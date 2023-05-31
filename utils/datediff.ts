// Get difference between timestamp and current date
export default function dateDifference(timestamp: any) {
  const currentDate = Date.now();
  const timeDifference = currentDate - timestamp;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  const minutesDiff = Math.floor(timeDifference / minute);
  const hoursDiff = Math.floor(timeDifference / hour);
  const daysDiff = Math.floor(timeDifference / day);
  const weeksDiff = Math.floor(timeDifference / week);
  const monthsDiff = Math.floor(timeDifference / month);
  const yearsDiff = Math.floor(timeDifference / year);
  const secondsDiff = Math.floor(timeDifference / 1000);

  if (yearsDiff >= 2) {
    return `${yearsDiff} year ago`;
  } else if (monthsDiff >= 1) {
    return `${monthsDiff} month ago`;
  } else if (weeksDiff >= 1) {
    return `${weeksDiff} week ago`;
  } else if (daysDiff >= 1) {
    return `${daysDiff} day ago`;
  } else if (hoursDiff >= 1) {
    return `${hoursDiff} hour ago`;
  } else if (minutesDiff >= 1) {
    return `${minutesDiff} minute ago`;
  } else {
    return `${secondsDiff} second ago`;
  }
}
