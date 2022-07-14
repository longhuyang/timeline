export const getNewDate = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return {
    year,
    month,
    day,
  };
};

export const getDate = (year, month, day) => {
  return new Date(year, month, day);
};

export const formatDate = (date) => {
  date = Number(date);
  return date < 10 ? `0${date}` : date;
};

export const colorList = [
  {
    name: "优",
    value: "#74B925",
  },
  {
    name: "良",
    value: "#F5E31C",
  },
  {
    name: "轻度",
    value: "#F2AF33",
  },
  {
    name: "中度",
    value: "#DC3838",
  },
  {
    name: "重度",
    value: "#A649A0",
  },
  {
    name: "严重",
    value: "#6C0E01",
  },
];

export const handleAQIColor = (value) => {
  // value = +value;
  let grade = "优";
  switch (true) {
    case value >= 0 && value <= 50:
      grade = "优";
      break;
    case value >= 51 && value <= 100:
      grade = "良";
      break;
    case value >= 101 && value <= 150:
      grade = "轻度";
      break;
    case value >= 151 && value <= 200:
      grade = "中度";
      break;
    case value >= 201 && value <= 300:
      grade = "重度";
      break;
    case value >= 301 && value <= 500:
      grade = "严重";
      break;
    default:
      grade = "无";
      break;
  }
  return grade;
};
