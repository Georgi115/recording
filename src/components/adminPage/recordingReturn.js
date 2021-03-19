import React from "react";
import { connect } from "react-redux";

const RecordingReturn = (props) => {
  console.log(props);
  let block = null;
  props.recording.forEach((el) => {
    if (
      el.name === props.nameMaster &&
      el.time === props.time &&
      props.date.toString() === el.date
    ) {
      block = (
        <div
          className={el.admin ? "service green" : "service"}
          onClick={() =>
            props.clickRecording(el.name, el.time, el.date, el.nameUser)
          }
        >
          <div>{el.nameUser}</div>
          <div> {el.service}</div>
        </div>
      );
    }
  });
  return <React.Fragment>{block}</React.Fragment>;
};

function mapDispatchToProps(dispatch) {
  return {
    clickRecording: (name, time, date, user) => {
      dispatch({
        type: "ClickRecording",
        payload: {
          name,
          time,
          date,
          user,
        },
      });
    },
  };
}
export default connect(null, mapDispatchToProps)(RecordingReturn);
