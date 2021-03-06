export const parseDate = (d) => {
  const split = d.split("T")[0].split("-");
  const [year, month, day] = split;
  const monthMap = {
    "01": "January", "02": "February", "03": "March",
    "04": "April", "05": "May", "06": "June",
    "07": "July", "08": "August", "09": "September",
    "10": "October", "11": "November", "12": "December",
  }

  return `${monthMap[month]} ${day}, ${year}`
}

export const parseElapsedTime = (d) => {
  const date = new Date(d);
  const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()]
  const [hour, min, sec] = [date.getHours(), date.getMinutes(), date.getSeconds()]

  const now = new Date();
  const [getYear, getMonth, getDay] = [now.getFullYear(), now.getMonth(), now.getDate()]
  const [getHour, getMin, getSec] = [now.getHours(), now.getMinutes(), now.getSeconds()]

  if (getYear - year > 0) {
    return getYear - year === 1 ? `${getYear - year} year ago` : `${getYear - year} years ago`;
  } else if (getMonth - month > 0) {
    return getMonth - month === 1 ? `${getMonth - month} month ago` : `${getMonth - month} months ago`;
  } else if (getDay - day > 0) {
    return getDay - day === 1 ? `${getDay - day} day ago` : `${getDay - day} days ago`;
  } else if (getHour - hour > 0) {
    return getHour - hour === 1 ? `${getHour - hour} hour ago` : `${getHour - hour} hours ago`;
  } else if (getMin - min > 0) {
    return getMin - min === 1 ? `${getMin - min} min ago` : `${getMin - min} mins ago`;
  } else if (getSec - sec > 0) {
    return getSec - sec === 1 ? `${getSec - sec} sec ago` : `${getSec - sec} secs ago`;
  } else {
    return `now`
  }
}