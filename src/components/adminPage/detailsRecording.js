import React from "react";
import { connect } from "react-redux";

const DetailsRecording = (props) => {
  if (props.detailsRecording === null) {
    return <div className="detailsRecording detailsRecording__noView"></div>;
  }
  return (
    <div
      onClick={(e) => props.closeDetails(e.target)}
      className={
        props.detailsRecording === null
          ? "detailsRecording detailsRecording__noView"
          : "detailsRecording"
      }
    >
      <div className="detailsRecording__block">
        <div className="detailsRecording__description">
          <p>Запись: {props.detailsRecording.date}</p>
          <p>Клиент: {props.detailsRecording.user}</p>
          <p>Мастер: {props.detailsRecording.name}</p>
          <p>Время: {props.detailsRecording.time}</p>
          <button
            onClick={() => {
              props.deleteRecording(
                props.detailsRecording.date,
                props.detailsRecording.name,
                props.detailsRecording.time,
                props.detailsRecording.user
              );
            }}
          >
            Удалить запись
          </button>
        </div>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    detailsRecording: state.adminPageReducer.clickDetailsRecording,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeDetails: (e) => {
      dispatch({ type: "closeDetails", payload: e });
    },
    deleteRecording: (date, name, time, nameUser) =>
      dispatch({
        type: "deleteRecording",
        payload: { date, name, time, nameUser },
      }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailsRecording);
