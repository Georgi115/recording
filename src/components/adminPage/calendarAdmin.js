import React from "react";
import moment from "moment";
import returnMonth from "../clientPage/returnMonth";
import { connect } from "react-redux";

const CalendarAdmin = (props) => {
  let data;
  if (props.dateAdminChoice === null) {
    data = props.date;
  } else {
    data = props.dateAdminChoice;
  }
  console.log(data);
  const daysName = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const daysInPrevMonth = moment(`${props.date.monthNumber - 1}`).daysInMonth();
  const daysInMonth = moment(
    `${props.date.month} ${props.date.year}`
  ).daysInMonth();
  let firstDayWeek = moment(`1 ${props.date.month} ${props.date.year}`)
    .isoWeekday(1)
    .format("D");
  let day = 1;

  const calendar = [];

  for (let i = 0; i < daysInMonth / 7 + 1; i++) {
    calendar[i] = [];
    for (let j = 0; j < 7; j++) {
      if (
        daysInPrevMonth - firstDayWeek >= j &&
        i === 0 &&
        +firstDayWeek !== 1
      ) {
        calendar[i].push(null);
      } else {
        if (day > daysInMonth) {
          calendar[i].push(null);
          continue;
        }
        calendar[i].push(
          moment(`${day}  ${props.date.month} ${props.date.year}`).format("D")
        );
        day++;
      }
    }
  }

  return (
    <React.Fragment>
      <div className="calendarAdmin">
        <header className="calendar__header calendar__header_admin">
          <h2>
            {returnMonth(data.month)} {data.year}
          </h2>
        </header>

        <table>
          <thead>
            <tr className="calendar__title calendar__title_admin">
              {daysName.map((el) => {
                return <th>{el}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {calendar.map((el) => {
              return (
                <tr className="week week_admin">
                  {el.map((element) => {
                    let a;
                    if (data.day === element) {
                      a = "day dayActive";
                    } else if (element === null) {
                      a = "day dayNone";
                    } else {
                      a = "day";
                    }
                    let obj = {
                      day: element,
                      month: props.date.month,
                      year: props.date.year,
                    
                    };
                    return (
                      <th
                        onClick={() => props.adminDateChoiceClick(obj)}
                        className={a}
                      >
                        {element}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    date: state.calendarReducer.date,
    dateAdminChoice: state.adminPageReducer.choiceDateAdmin,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    adminDateChoiceClick: (el) =>
      dispatch({ type: "clickAdminChoice", payload: el }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarAdmin);
