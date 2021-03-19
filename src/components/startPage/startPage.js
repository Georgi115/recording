import React from "react";
import "./startPage.css";
import { connect } from "react-redux";

const startPage = (props) => {
  let classClient = "card card-cli";
  let classAdmin = "card card-adm";
  if (props.user === "client") {
    classClient = "card card-client";
    classAdmin = " card card-none-admin";
  } else if (props.user === "admin") {
    classClient = " card card-none-client";
    classAdmin = " card card-admin";
  }

  return (
    <div
      className={props.choice ? "startPage startPage-none" : "startPage"}
      style={{
        background:
          "url(https://factymira.ru/wp-content/uploads/2020/05/%D0%B1%D0%B0%D1%80%D0%B1%D0%B5%D1%80%D1%88%D0%BE%D0%BF.jpg)  no-repeat",
        height: "100vh",
        backgroundSize: "100% 100%",
      }}
    >
      <div
        onClick={() => props.onClickUser("client")}
        className={classClient}
        style={{ width: "18rem" }}
      >
        <img
          src="https://mobileclips.net/images/speasyimagegallery/albums/1/images/p8.jpg"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <button
            onClick={() => props.choiceUser("client")}
            className="btn btn-dark"
          >
            Зайти как клинет
          </button>
        </div>
      </div>
      <div
        onClick={() => props.onClickUser("admin")}
        className={classAdmin}
        style={{ width: "18rem" }}
      >
        <img
          src="https://bobr.by/data/image1_64905.jpg"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <button
            onClick={() => props.choiceUser("admin")}
            className="btn btn-dark"
          >
            Зайти как администратор
          </button>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.reducerHomePage.user,
    choice: state.reducerHomePage.choiceUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClickUser: (user) => dispatch({ type: "CLICKSTARTPAGE", payload: user }),
    choiceUser: (choice) => dispatch({ type: "CHOICEUSER", payload: choice }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(startPage);
