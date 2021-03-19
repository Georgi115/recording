import React from "react";
import { connect } from "react-redux";
import moment from "moment";

const Time = (props) => {
  if (!props.choiceUser.date)
    return (
      <div className={props.viewTimeBlock ? "tive time-view" : "time"}>
        <div
          className={
            props.viewTimeBlock ? "time__block time__block-view" : "time__block"
          }
        ></div>
      </div>
    );
  const hour = moment().hour();
  const date = moment().date();

  const dateUser = props.choiceUser.date.slice(0, 2).trim();
  const arrayRecording = props.date.recording[dateUser].slice();
  arrayRecording.forEach((element) => {
    element.active = true;
  });
  const recordingClient = props.recordingClient.slice();
  console.log(arrayRecording);
  arrayRecording.forEach((el) => {
    recordingClient.forEach((elem) => {
      if (
        elem.date.slice(0, 2).trim() === dateUser &&
        el.time.slice(0, 2).trim() === elem.time.slice(0, 2).trim() &&
        props.choiceUser.master.el.name === elem.name
      ) {
        el.active = false;
      } else if (+el.time.slice(0, 2).trim() < hour && date === +dateUser) {
        el.active = false;
      }
    });
  });
  return (
    <div
      onClick={(e) => props.closeTime(e.target)}
      className={props.viewTimeBlock ? "time time-view" : "time"}
    >
      <div
        className={
          props.viewTimeBlock ? "time__block time__block-view" : "time__block"
        }
      >
        <div className="time__title">
          <h2>Время для записи</h2>
        </div>
        <div className="time__body">
          {+props.choiceUser.date.slice(0, 2).trim() < +props.day.trim() ? (
            <div>Выбранная вами дата уже прошла</div>
          ) : (
            arrayRecording.map((el, id) => {
              return (
                <div
                  onClick={() => props.choiceTime(el.time, el.active)}
                  key={id}
                  className={
                    el.active
                      ? "time__number"
                      : "time__number time__number-none"
                  }
                >
                  {el.time}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    choiceUser: state.clientPageReducer.choiceUser,
    date: state.calendarReducer.date,
    viewTimeBlock: state.clientPageReducer.viewTimeBlock,
    recordingClient: state.calendarReducer.recordingClient,
    day: state.calendarReducer.date.day,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    closeTime: (e) => dispatch({ type: "closeTime", payload: e }),
    choiceTime: (time, active) =>
      dispatch({ type: "choiceTime", payload: { time, active } }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Time);
