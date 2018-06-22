  export function timeOptions(givenTime) {
    const options = { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit"}
    const time = Date.parse(givenTime).toLocaleString('en-US', options);
    return time;
  }
