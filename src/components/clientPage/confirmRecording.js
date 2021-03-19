import React from "react";
import { connect } from "react-redux";

const ConfirmRecording = (props) => {
  console.log(props);
  if (props.choiceUser.time === null) {
    return <div className="confirmBlock"></div>;
  }
  return (
    <div
      className={
        props.viewConfirmBlock
          ? "confirmBlock confirmBlockView "
          : "confirmBlock"
      }
    >
      <div className="card cardConfirm">
        <div className="card-body cardConfirm-body">
          <input
            onChange={(e) => props.changeInputName(e)}
            value={props.choiceUser.name}
            placeholder="Введите ваше имя"
          ></input>
          {props.viewBlockConfirmDanger ? (
            <div className="dangerBlock">Введите имя</div>
          ) : null}
          <h5 className="card-title">
            Мастер {props.choiceUser.master.el.name}
          </h5>
          <p className="card-text">{props.choiceUser.sevice.name}</p>
          <p className="card-text">{props.choiceUser.sevice.price} рублей</p>
          <p className="card-text">{props.choiceUser.date} </p>
          <p className="card-text">{props.choiceUser.time}</p>
          <div>
            <button
              onClick={() => props.confirmRecording(props.choiceUser)}
              className="btn btn-success"
            >
              Подтвердить запись
            </button>
            <button onClick={props.closeBlock} className="btn btn-danger">
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    choiceUser: state.clientPageReducer.choiceUser,
    viewConfirmBlock: state.clientPageReducer.viewConfirmBlock,
    viewBlockConfirmDanger: state.clientPageReducer.viewBlockConfirmDanger,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeBlock: () => dispatch({ type: "closeBlockConfirm" }),
    changeInputName: (e) =>
      dispatch({ type: "changeInputName", payload: e.target.value }),
    confirmRecording: (el) =>
      dispatch({ type: "confirmRecording", payload: el }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmRecording);
