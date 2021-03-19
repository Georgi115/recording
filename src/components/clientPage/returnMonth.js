const ReturnMonth = (props) => {
  switch (props) {
    case "January":
      return "Январь";
    case "February":
      return "Февраль";
    case "March":
      return "Март";
    case "April":
      return "Апрель";
    case "May":
      return "Май";
    case "June":
      return "Июнь";
    case "July":
      return "Июль";
    case "August":
      return "Август";
    case "September":
      return "Сентябрь";
    case "October":
      return "Октябрь";
    case "November":
      return "Ноябрь";
    case "December":
      return "Декабрь";
    default:
      return null;
  }
};

export default ReturnMonth;
