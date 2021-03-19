import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import returnMonth from "./returnMonth";
import Time from "./time";
import { useEffect } from "react";
const Calendar = (props) => {
  useEffect(() => {
    let date = {};
    let recording = {};
    const day = moment().format("DD");
    const month = moment().format("MMMM");
    const year = moment().format("YYYY");
    const monthNumber = moment().format("MM");
    const dayInMonth = moment().daysInMonth();
    date = {
      day,
      month,
      year,
      monthNumber,
      recording,
    };
    for (let i = 1; i <= dayInMonth; i++) {
      date.recording[i] = [
        {
          time: "10:00",
          active: true,
          date: `${month} ${year}`,
        },
        {
          time: "11:00",
          active: true,
          date: `${month} ${year}`,
        },
        {
          time: "12:00",
          active: true,
          date: `${month} ${year}`,
        },
        {
          time: "13:00",
          active: true,
          date: `${month} ${year}`,
        },
        {
          time: "14:00",
          active: true,
          date: `${month} ${year}`,
        },
        {
          time: "15:00",
          active: true,
          date: `${month} ${year}`,
        },
        {
          time: "16:00",
          active: true,
          date: `${month} ${year}`,
        },
        {
          time: "17:00",
          active: true,
          date: `${month} ${year}`,
        },
        {
          time: "18:00",
          active: true,
          date: `${month} ${year}`,
        },
        {
          time: "19:00",
          active: true,
          date: `${month} ${year}`,
        },
        {
          time: "20:00",
          active: true,
          date: `${month} ${year}`,
        },
        {
          time: "21:00",
          active: true,
          date: `${month} ${year}`,
        },
      ];
    }
    props.installDate(date);
  }, []);
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
      <p class="text-white ">Выбирайте дату</p>
      <button
        onClick={() => props.backPage("GOTOMASTER")}
        type="button"
        className="btn btn-secondary btn-sm btn-backToMaster"
      >
        Вернутся к выбору мастера
      </button>
      <div className="calendar">
        <Time />
        <header className="calendar__header">
          <h2>
            {returnMonth(props.date.month)} {props.date.year}
          </h2>
        </header>

        <table>
          <thead>
            <tr className="calendar__title">
              {daysName.map((el) => {
                return <th>{el}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {calendar.map((el) => {
              return (
                <tr className="week">
                  {el.map((element) => {
                    return (
                      <th
                        onClick={() =>
                          props.choiceDate(
                            `${element} ${props.date.month} ${props.date.year}`
                          )
                        }
                        className={
                          props.date.day === element ? "day dayActive" : "day"
                        }
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
  };
}
function mapDispatchToProps(dispatch) {
  return {
    backPage: (str) => dispatch({ type: "BACKPAGE", payload: str }),
    installDate: (date) => dispatch({ type: "INSTALLDATE", payload: date }),
    choiceDate: (date) => dispatch({ type: "CHOICEDATE", payload: date }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
