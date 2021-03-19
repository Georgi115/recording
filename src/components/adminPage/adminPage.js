import React from "react";
import "./adminPage.css";
import AddMaster from "./addMaster";
import RecordingClient from "./recordingClient";
import CalendarAdmin from "./calendarAdmin";
import { connect } from "react-redux";
import DetailsRecording from "./detailsRecording";
import AddRecording from "./addRecording";

const AdminPage = (props) => {
  let data;
  if (props.choiceDateAdmin === null) {
    data = props.date;
  } else {
    data = props.choiceDateAdmin;
  }

  return (
    <div className="adminPage">
      <div
        className={
          !props.viewBigBlock
            ? "adminPage__config"
            : "adminPage__config adminPage__config_noViews"
        }
      >
        <div className="adminPage__date">
          <CalendarAdmin />
        </div>

        <ul>
          <li className="button_li">
            {" "}
            <button
              onClick={props.backToHome}
              type="button"
              viewMainBlock
              className="btn btn-dark"
            >
              Вернутся на главную страницу
            </button>
          </li>
        </ul>
      </div>
      <div
        className={
          !props.viewBigBlock
            ? "adminPage__mainBlock"
            : "adminPage__mainBlock adminPage__mainBlock_views"
        }
      >
        <div className="adminPage__configuration">
          <button
            onClick={props.viewMainBlock}
            className="fa fa-navicon "
          ></button>
          <button
            onClick={props.viewAddMasterBlock}
            className="fa fa-user-plus"
          ></button>
          <button onClick={props.backToday} className="adminPage__button">
            Сегодня
          </button>
          <AddMaster></AddMaster>
        </div>

        <RecordingClient />
      </div>
      <DetailsRecording></DetailsRecording>
      <AddRecording></AddRecording>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    date: state.calendarReducer.date,
    choiceDateAdmin: state.adminPageReducer.choiceDateAdmin,
    viewBigBlock: state.adminPageReducer.viewBigBlock,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    backToday: () => dispatch({ type: "backToday" }),
    backToHome: () => dispatch({ type: "BACKHOMEPAGE", payload: null }),
    viewMainBlock: () => dispatch({ type: "ViewMainBlock" }),
    viewAddMasterBlock: () => dispatch({ type: "viewAddMasterBlock" }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
