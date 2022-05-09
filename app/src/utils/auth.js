export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const strongPassRegex =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

export const getAge = (dob) => {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const now = new Date();

  let date = dob;

  if (date > now) {
    date = now + daysInMonth[dob.getMonth()];
    now.setMonth(now.getMonth() - 1);
  }

  if (date.getMonth() > now.getMonth()) {
    now.setFullYear(now.getFullYear() - 1);
    now.setMonth(now.getMonth + 12);
  }

  return now.getFullYear() - date.getFullYear();
};