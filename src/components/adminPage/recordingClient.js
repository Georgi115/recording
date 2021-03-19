import React from "react";
import { connect } from "react-redux";
import RecordingReturn from "./recordingReturn";

const RecordingClient = (props) => {
  let data;
  if (props.choiceDateAdmin === null) {
    data = props.date;
  } else {
    data = props.choiceDateAdmin;
  }
  console.log(data);
  const arrayTime = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];
  return (
    <ul className="adminPage__barber">
      {props.master.map((master, id) => {
        return (
          <li key={id}>
            <span className="nameMasterPage">{master.name}</span>
            <div className="adminPage__recording">
              {arrayTime.map((time, id) => {
                return (
                  <div
                    onClick={(e) =>
                      props.openAddRecordingBlock(e.target, data, time ,master.name)
                    }
                    key={id}
                    className="num"
                  >
                    {time}
                    <RecordingReturn
                      recording={props.recording}
                      nameMaster={master.name}
                      time={time}
                      date={data}
                    ></RecordingReturn>
                  </div>
                );
              })}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

function mapStateToProps(state) {
  return {
    master: state.clientPageReducer.master,
    choiceDateAdmin: state.adminPageReducer.choiceDateAdmin,
    date: state.calendarReducer.date,
    recording: state.calendarReducer.recordingClient,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openAddRecordingBlock: (e, date, time,name) =>
      dispatch({ type: "openAddRecordingBlock", payload: { e, date, time,name } }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RecordingClient);
