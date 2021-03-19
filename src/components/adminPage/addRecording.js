import React from "react";
import { connect } from "react-redux";

const AddRecording = (props) => {
  console.log(props);
  let date;
  if (props.choiceDateAdmin === null) {
    date = props.date;
  } else {
    date = props.choiceDateAdmin;
  }
  return (
    <div
      onClick={(e) => props.closeAddRecordingBlock(e.target)}
      className={
        props.addRecordingBlock
          ? "addRecording"
          : "addRecording addRecording__noView"
      }
    >
      <div className="addRecording__block">
        <p className="title">
          Создать запись на {date.day} {date.month} {date.year}{" "}
          {props.addRecording.time}
        </p>
        <div className="addRecording__master">
          <p>Мастер: {props.addRecording.name}</p>
        </div>
        <div className="addRecording__service">
          <p>Услуга: {props.dangerBlock? <span className= 'dangerRec'>*</span>:null}</p>
          <div className="addRecording__elem">
            {props.services.map((el) => {
              return (
                <div
                  onClick={() => props.clickService(el.name)}
                  className={
                    props.addRecording.service === el.name
                      ? "addRecording__elementServices active_elem"
                      : "addRecording__elementServices"
                  }
                >
                  {el.name}
                </div>
              );
            })}
          </div>
          <div className="nameUser">
            <p>Введите имя клиента: {props.dangerBlock? <span className= 'dangerRec'>*</span>:null}</p>
            <input className = 'inputAddRecording' onChange={(e) => props.clickNameUser(e)}></input>
          </div>
          <div className="blocK__final">
            <button
              onClick={props.addRecordingClick}
              className="addRecording__finalBtn"
            >
              Создать запись
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    addRecordingBlock: state.calendarReducer.addRecordingBlock,
    date: state.calendarReducer.date,
    choiceDateAdmin: state.adminPageReducer.choiceDateAdmin,
    addRecording: state.calendarReducer.addRecording,
    services: state.clientPageReducer.services,
    dangerBlock: state.calendarReducer.dangerAddRecording
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeAddRecordingBlock: (e) =>
      dispatch({ type: "closeAddRecordingBlock", payload: e }),
    clickService: (ser) => dispatch({ type: "clickService", payload: ser }),
    clickNameUser: (e) =>
      dispatch({
        type: "changeNameUser",
        payload: e.target.value,
      }),
    addRecordingClick: () => dispatch({ type: "addRecordingClick" }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddRecording);
