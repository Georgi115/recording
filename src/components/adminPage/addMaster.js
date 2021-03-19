import React from "react";
import { connect } from "react-redux";
const AddMaster = (props) => {
  return (
    <div
      className={
        props.addMasterBlock ? "addMaster" : "addMaster addMaster__none"
      }
    >
      <div>
        {" "}
        <p>Добавить мастера</p>
        <input
          style={props.errorAddMaster ? { border: "1px solid red" } : null}
          value={props.newMasterName}
          onChange={(e) => props.onChangeAddMaster(e.target.value)}
          placeholder={props.errorAddMaster ? "Введите имя" : "Укажите имя"}
        ></input>
        <div className="addMaster__btn">
          {" "}
          <button onClick={() => props.addMaster(props.newMaster)}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    addMasterBlock: state.adminPageReducer.addMasterBlock,
    newMasterName: state.adminPageReducer.newMaster.name,
    newMaster: state.adminPageReducer.newMaster,
    errorAddMaster: state.adminPageReducer.errorAddMaster,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onChangeAddMaster: (name) =>
      dispatch({ type: "addMasterName", payload: name }),
    addMaster: (obj) => dispatch({ type: "addMaster", payload: obj }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddMaster);
